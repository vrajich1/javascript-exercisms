//
// This is only a SKELETON file for the 'High-Scores' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class HighScores {
  constructor(input) {
    this.input = input
  }

  get scores() {
    console.log(this.input)
    return this.input
  }

  get latest() {
    const newArray1 = this.input
    return newArray1[newArray1.length -1]
  }

  get personalBest() {
    const newArray2 = this.input
    return Math.max(...newArray2)
  }

  get personalTopThree() {
    const newArray3 = this.input
    return newArray3.sort((a,b) => b-a).slice(0,3)
  }
}



