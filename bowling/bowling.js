// all error checking is done in this function
function checkForErrors(rolls, fromScore) {

  const maxFrameScore = 10
  const lastFrame = 9
  const bonusFrame = 10
  let startOfFrame = true
  let firstRoll = 0
  let secondRoll = 0
  let game = []
  let frame = []

  // check to see if we have any rolls
  if (fromScore == true && rolls.length == 0) {
      throw 'Score cannot be taken until the end of the game'
  }

  // divide the rolls into frames
  for (let roll = 0; roll < rolls.length; roll++) {

      // check for bad rolls as we go through

      // is the roll negative
      if (fromScore == false && rolls[roll] < 0) {
          throw 'Negative roll is invalid'
      }

      // is the roll too large
      if (fromScore == false && rolls[roll] > 10) {
          throw 'Pin count exceeds pins on the lane'
      }

      if (startOfFrame === true) {

          firstRoll = rolls[roll]
          frame = [firstRoll]
          startOfFrame = false

          // we finish out the frame if it is a strike or the last roll in array
          if (firstRoll === maxFrameScore || roll == rolls.length - 1) {

              // add second roll to frame
              secondRoll = null
              frame.push(secondRoll)

              // add frame to game
              game.push(frame)
              startOfFrame = true
          }

      } else {

          // add second roll to frame
          secondRoll = rolls[roll]
          frame.push(secondRoll)

          // add frame to game
          game.push(frame)
          startOfFrame = true
      }

  } // end of for build game

  // check for frame errors
  if (fromScore == false) {

      for (let frame = 0; frame < game.length; frame++) {

          // two rolls in a frame must be <= 10
          [firstRoll, secondRoll] = game[frame]

          if (firstRoll + secondRoll > 10) {
              throw 'Pin count exceeds pins on the lane'
          }
      }

  } // end of check for frame errors for

  // Are we trying to roll another ball after we have 10 frames with no strike or spare in frame 10
  if (fromScore == false && game.length > 10) {
      //console.log(game)
      //console.log(`Frame ${lastFrame} Last Frame Roll 1 ${game[lastFrame][0]} Last Frame Roll 2 ${game[lastFrame][1]}`)
      if (game[lastFrame][0] + game[lastFrame][1] < 10) {
          throw 'Cannot roll after game is over'
      }
  }

  // do we have less than 10 frames
  if (fromScore == true && game.length < 10) {

      throw 'Score cannot be taken until the end of the game'

  }

  // do we have 10 frames with a strike or a spare in the last frame
  if (fromScore == true && game.length == 10) {

      if (game[lastFrame][0] + game[lastFrame][1] == maxFrameScore) {
          throw 'Score cannot be taken until the end of the game'
      }
  }

  // do we have 11 frames but not enough bonus rolls
  if (fromScore == true && game.length == 11) {

      // strike requires 2 bonus rolls
      if (game[lastFrame][0] == maxFrameScore && (game[bonusFrame][0] == null || game[bonusFrame][1] == null)) {
          throw 'Score cannot be taken until the end of the game'
      }

      // spare requires 1 bonus roll
      if ((game[lastFrame][0] + game[lastFrame][1]) == maxFrameScore && game[bonusFrame[0] == null]) {
          throw 'Score cannot be taken until the end of the game'
      }

  }

  // check if spare has 2 bonus rolls
  if (fromScore == false && game.length == 11) {

      if ((game[lastFrame][0] + game[lastFrame][1] == maxFrameScore) && game[lastFrame][1] != null && game[bonusFrame][1] != null) {
          throw 'Cannot roll after game is over'
      }

  }

  // check if we tried to roll more bonus rolls then we should after a strike
  if (fromScore == false && game.length > 10) {

      if (game[lastFrame][0] == maxFrameScore) {

          // they got 3 strikes in a row starting at frame 10 each strike is in its own frame
          if (game.length == 13) {
              throw 'Cannot roll after game is over'
          }

          if (game.length == 12) {

              if (game[10][0] != maxFrameScore) {
                  throw 'Cannot roll after game is over'
              }
          }
      }

  }

  // check to see if we have enough frames
  if (fromScore == true && game.length < 10) {
      throw 'Score cannot be taken until the end of the game'
  }
}

export class Bowling {
  constructor() {

      this.rolls = [];
      this.frameStart = true;
      this.currentScore = 0;
      this.length = 20;

  }

  roll(pins) {

      let tempArray = Array.from(this.rolls)
      tempArray.push(pins)
      try {
          checkForErrors(tempArray, false)
          this.rolls.push(pins)
      }
      catch (err) {
          //console.log("ERROR", err)
          throw err
      }

  }

  score() {

      const strike = 10
      const spare = 10

      try {
          checkForErrors(this.rolls, true)
      }
      catch (err) {
          //console.log("ERROR", err)
          throw err
      }

      for (let roll = 0; roll < this.length; roll++) {

          if (this.frameStart == true) {

              if (this.rolls[roll] == strike) {

                  this.currentScore += (strike + this.rolls[roll + 1] + this.rolls[roll + 2])
                  this.length--

              } else {

                  this.currentScore += this.rolls[roll]
                  this.frameStart = false
              }

          } else {

              // we are at the end of a frame, do we have a spare
              if (this.rolls[roll] + this.rolls[roll - 1] == spare) {

                  // spare so add this roll + next roll
                  // we don't add 10 because the first ball was already added at the frame start
                  this.currentScore += this.rolls[roll] + this.rolls[roll + 1]

              } else {

                  this.currentScore += this.rolls[roll]

              }

              this.frameStart = true;

          } // endif framesart

      } // end of for

      return this.currentScore
  }
}