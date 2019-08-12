//without using webpack or browserify i have to just copy my other class over
//not elegant, but hey i've only got 3 hours and I don't want to use any libraries
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
    // if (this.scoreBoard[frame - 1]) {
    //   if (this.scoreBoard[frame - 1].strike || this.scoreBoard[frame - 1].spare) {
    //     if (frame !== 10) {
    //       return "calculating";
    //     }
    //   }
    // }
    let sum = 0;
    let virtualBoard = this.scoreBoard.slice(0, this.scoreBoard.length);
    virtualBoard.forEach((frame, index) => {
      sum += frame.roll1;
      sum += frame.roll2;
      if (virtualBoard[index + 1]) {
        if (frame.spare && index !== 9) {
          sum += virtualBoard[index + 1].roll1;
        } else if (frame.strike && index < 8) {
          sum += virtualBoard[index + 1].roll1;
          //check for consec. strikes
          if (virtualBoard[index + 1].strike) {
            sum += virtualBoard[index + 2].roll1;
          } else {
            sum += virtualBoard[index + 1].roll2;
          }
        }
        if (frame.strike && index === 8) {
          sum += virtualBoard[index + 1].roll1;
          if (virtualBoard[index + 1].strike) {
            //got ANOTHER strike on the next frame add it
            sum += 10;
          }
        }
        if (frame.strike && index === 9) {
          sum += virtualBoard[index].roll1;
          sum += 10; //for this roll
        }
        //finally, if they got one final roll
        if (frame.roll3) {
          sum += frame.roll3;
        }
      }
    });
    return sum;
  }
}
$(document).ready(() => {
  let thisGame = null;
  let currentFrame = 0;
  $(".start").on("click", () => {
    thisGame = new Bowling();
    currentFrame = 0;
    $("#currentFrame").text(currentFrame);
    $(".score").html("0");
  });
  $(".roll").on("click", () => {
    if(currentFrame > 9){
      alert('Game has ended, please start a new game!')
      return
    }
    if (!thisGame) {
      alert("Please Start a game first");
      return;
    }
    let roll1 = Math.floor(Math.random() * 11);
    let roll2 = Math.floor(Math.random() * (11 - roll1));

    thisGame.rollFrame = { roll1, roll2 };    
    let thisFrame = $(".scorecard").find('.frame')[currentFrame]
    $(thisFrame).find('.score').text(thisGame.ScoreByFrame(currentFrame))
    currentFrame++;
    $("#currentFrame").text(currentFrame + 1);
    if(roll1 === 10){roll1 = "STRIKE!"}
        $("#roll1").text(roll1);
        $("#roll2").text(roll2);
  });
});
