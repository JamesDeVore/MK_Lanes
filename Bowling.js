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

class Bowling {
  //just constructing the board, scoring will happen later
  constructor() {
    this.scoreBoard = [];
  }
  get score() {
    return this.scoreBoard;
  }
  set rollFrame(frameObj) {
    if (this.scoreBoard.length == 10) {
      if (this.scoreBoard[9].strike || this.scoreBoard[9].spare) {
        //if the last frame has a strike or spare
        this.scoreBoard[9].roll3 = frameObj.roll1;
        return;
      }
    }
    frameObj.strike = frameObj.roll1 === 10;
    if (!frameObj.strike) {
      frameObj.spare = frameObj.roll1 + frameObj.roll2 === 10;
    }
    this.scoreBoard.push(frameObj);
  }
  ScoreByFrame(frame) {
    if (frame > this.scoreBoard.length) {
      return "hasnt happened";
    }
    //need to handle strikes and spares
    if (this.scoreBoard[frame - 1].strike || this.scoreBoard[frame - 1].spare) {
      if (frame !== 10) {
        return "calculating";
      }
    }
    let sum = 0;
    let virtualBoard = this.scoreBoard.slice(0, this.scoreBoard.length);
    virtualBoard.forEach((frame, index) => {
      sum += frame.roll1;
      sum += frame.roll2;
      if (frame.spare && index !==9 ) {
        sum += virtualBoard[index + 1].roll1;
      } else if (frame.strike  && index < 8) {
        sum += virtualBoard[index + 1].roll1;
        //check for consec. strikes
        if (virtualBoard[index + 1].strike) {
          sum += virtualBoard[index + 2].roll1;
        } else {
          sum += virtualBoard[index + 1].roll2;
        }
      }
      if(frame.strike && index === 8){
        sum += virtualBoard[index + 1].roll1;
        if(virtualBoard[index + 1].strike){
          //got ANOTHER strike on the next frame add it
          sum += 10
        }
      }
      if (frame.strike && index === 9) {
        sum += virtualBoard[index].roll1;
        sum+= 10 //for this roll
        
      }
        //finally, if they got one final roll
        if (frame.roll3) {
          sum += frame.roll3;
        }
    });
    return sum;
  }
}
let newGame = new Bowling();

newGame.rollFrame = { roll1: 4, roll2: 5 };

module.exports = { Bowling };

