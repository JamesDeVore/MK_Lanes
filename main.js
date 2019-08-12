//First, I will need to create the scoring functions for this bowling simulator.

// a simple pure function that takes in number of pins hit, roll number (1/2), and if the prev roll was a strike
//which means I may need to pass around a scoring object that hold the score and if there was just a spare / strike
//strike = next 2 rolls added to score
//spare = next 1 roll
/*=====================================================
let frame = {
  roll1:0,
  roll2:0,
  strike:false,
  spare:false
}
let game = [{score} * 12] array of 12 scores
=====================================================*/

class Bowling  {
  //just constructing the board, scoring will happen later
  constructor(){
    
    this.scoreBoard = []
  }
  get score() {
    return this.scoreBoard
  }
  set rollFrame (frameObj) {
    frameObj.strike = (frameObj.roll1 === 10)
    if(!frameObj.strike){
      frameObj.spare = (frameObj.roll1 + frameObj.roll2 === 10)
    }
    this.scoreBoard.push(frameObj)
  }
  getScoreByFrame(frame){
    if(frame  > this.scoreBoard.length){
      return 'hasnt happened'
    }
    //need to handle strikes and spares
    if(this.scoreBoard[frame].strike ||this.scoreBoard[frame].spare){
      return 'calculating'
    }
    let sum = 0
    let virtualBoard = this.scoreBoard.slice(0,this.scoreBoard.length)
    virtualBoard.forEach((frame, index) => {
      sum += frame.roll1;
      sum += frame.roll2;
      if (frame.spare) {
        sum += virtualBoard[index + 1].roll1
      } else if(frame.strike){
        sum += virtualBoard[index + 1].roll1;
        //check for consec. strikes
        if(virtualBoard[index + 1].strike){
          sum += virtualBoard[index + 2].roll1;
        } else {
          sum += virtualBoard[index + 1].roll2;
        }
      }
    });
    return sum;
  }
  
}
let newGame = new Bowling()

console.log(newGame.score)
console.log(newGame.getScoreByFrame(2))


/*=====================================================

  constructor(){
    this._board = []
    
  }
  get board(){
    return this._board
  }
  set addRoll(nextScore){
    this._board.push(nextScore)
  }
  
  rollFrame(rollNum,pins){
    if(rollNum === 1){
      this.addRoll = 'X'
    } else {
      if(pins < 12){
        this.addRoll = pins
      } else {
        this.addRoll = '/'
      }
    }
  }
  getScoreByFrame(frameNum){
    //will get weird thanks to strike / spares
    var virtualBoard = this._board.slice(0,frameNum);

    if(this._board.length < frameNum){
      return null
    }
    if(virtualBoard.find(val => val === 'X' || val === '/')){

      return 'calcuating...'
    }
    let sum = 0;
    for(let i=0; i < frameNum; i++){
      sum += this._board[i]
    }
    console.log(sum)
    return sum
  }
  

=====================================================*/



