const { Bowling } = require("./Bowling");

let strikeFrame = {
  roll1: 10,
  roll2: 0
};
let spareFrame = {
  roll1: 5,
  roll2: 5
};
let randomroll = Math.floor(Math.random() * 11);
let randomFrame = {
  roll1: randomroll,
  roll2: 10 - randomroll
};

test("rolling one frame adds to scoreboard", () => {
  let newGame = new Bowling();
  newGame.rollFrame = randomFrame;
  expect(newGame.score).toEqual([randomFrame]);
});

test("rolling multiple frames adds all to scoreboard", () => {
  let newGame = new Bowling();
  newGame.rollFrame = randomFrame;
  newGame.rollFrame = spareFrame;
  newGame.rollFrame = strikeFrame;
  expect(newGame.score).toEqual([randomFrame, spareFrame, strikeFrame]);
});

test("open frame scores should add to the sum of all rolls", () => {
  let newGame = new Bowling();
  newGame.rollFrame = { roll1: 4, roll2: 5 };
  newGame.rollFrame = { roll1: 6, roll2: 2 };
  newGame.rollFrame = { roll1: 1, roll2: 0 };
  expect(newGame.ScoreByFrame(3)).toEqual(18);
});
test("full game of open frames should add correctly", () => {
  let newGame = new Bowling();
  newGame.rollFrame = { roll1: 4, roll2: 5 };
  newGame.rollFrame = { roll1: 6, roll2: 2 };
  newGame.rollFrame = { roll1: 1, roll2: 0 };
  newGame.rollFrame = { roll1: 4, roll2: 5 };
  newGame.rollFrame = { roll1: 6, roll2: 2 };
  newGame.rollFrame = { roll1: 1, roll2: 0 };
  newGame.rollFrame = { roll1: 4, roll2: 5 };
  newGame.rollFrame = { roll1: 6, roll2: 2 };
  newGame.rollFrame = { roll1: 1, roll2: 0 };
  newGame.rollFrame = { roll1: 4, roll2: 5 };
  newGame.rollFrame = { roll1: 6, roll2: 2 };
  newGame.rollFrame = { roll1: 1, roll2: 0 };
  expect(newGame.ScoreByFrame(12)).toEqual(72);
});

test("A strike should add the next two rolls to the sum", () => {
  let newGame = new Bowling();

  newGame.rollFrame = { roll1: 10, roll2: 0 };
  newGame.rollFrame = { roll1: 6, roll2: 2 };
  newGame.rollFrame = { roll1: 1, roll2: 0 };
  expect(newGame.ScoreByFrame(3)).toEqual(27);
});
test("A strike should add the next two rolls to the sum in the middle of a game", () => {
  let newGame = new Bowling();

  newGame.rollFrame = { roll1: 10, roll2: 0 };
  newGame.rollFrame = { roll1: 6, roll2: 2 };
  newGame.rollFrame = { roll1: 1, roll2: 0 };
  newGame.rollFrame = { roll1: 10, roll2: 0 };
  newGame.rollFrame = { roll1: 6, roll2: 2 };
  newGame.rollFrame = { roll1: 1, roll2: 0 };
  expect(newGame.ScoreByFrame(6)).toEqual(54);
});
test("A spare should add the next roll to the sum", () => {
  let newGame = new Bowling();
  newGame.rollFrame = { roll1: 1, roll2: 9 };
  newGame.rollFrame = { roll1: 6, roll2: 2 };
  newGame.rollFrame = { roll1: 1, roll2: 0 };
  expect(newGame.ScoreByFrame(3)).toEqual(25);
});

test('a full game of strikes and spares should add correctly', () => {
    let newGame = new Bowling();
    newGame.rollFrame = { roll1: 4, roll2: 6 };
    newGame.rollFrame = { roll1: 6, roll2: 2 };
    newGame.rollFrame = { roll1: 10, roll2: 0 };
    newGame.rollFrame = { roll1: 4, roll2: 5 };
    newGame.rollFrame = { roll1: 6, roll2: 2 };
    newGame.rollFrame = { roll1: 10, roll2: 0 };
    newGame.rollFrame = { roll1: 2, roll2: 5 };
    newGame.rollFrame = { roll1: 8, roll2: 2 };
    newGame.rollFrame = { roll1: 1, roll2: 6 };
    newGame.rollFrame = { roll1: 4, roll2: 5 };
    expect(newGame.ScoreByFrame(10)).toEqual(111)
})
test('a closed 10 th frame should include an extra roll', () => {
      let newGame = new Bowling();
      newGame.rollFrame = { roll1: 4, roll2: 6 };
      newGame.rollFrame = { roll1: 6, roll2: 2 };
      newGame.rollFrame = { roll1: 10, roll2: 0 };
      newGame.rollFrame = { roll1: 4, roll2: 5 };
      newGame.rollFrame = { roll1: 6, roll2: 2 };
      newGame.rollFrame = { roll1: 10, roll2: 0 };
      newGame.rollFrame = { roll1: 2, roll2: 5 };
      newGame.rollFrame = { roll1: 8, roll2: 2 };
      newGame.rollFrame = { roll1: 1, roll2: 6 };
      newGame.rollFrame = { roll1: 4, roll2: 6 };
      newGame.rollFrame = { roll1: 7, roll2: 0 };
      expect(newGame.ScoreByFrame(10)).toEqual(119);
})
test("a perfect game should add to 300", () => {
  let newGame = new Bowling();
  for(let i=0; i < 10; i++){
    newGame.rollFrame={roll1:10,roll2:0}
  }
  expect(newGame.ScoreByFrame(10)).toEqual(300);
});
