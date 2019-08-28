const defineIsEven = n => {
  if (n % 2 == 0) {
    return true;
  } else {
    return false;
  }
};

const isDivisibleByTen = n => {
  if (n % 10 == 0) {
    return true;
  } else {
    return false;
  }
};
const checkDoubleDigit = y => {
  if (y > 9) {
    return y - 9;
  }
  return y;
};

export class Luhn {
  constructor(luhn) {
    this.luhn = luhn;
  }

  get valid() {
    const string = this.luhn;
    const array1 = string
      .replace(/\s/g, "")
      .split("")
      .reverse();
    console.log(array1); // this works

    let iteration = 1;

    const doubleEveryOther = x => {
      x = parseInt(x);
      console.log("Number of Iteration", iteration);
      if (defineIsEven(iteration)) {
        iteration++;
        console.log("Even Value:", x);
        return x * 2;
      }
      iteration++;
      return x;
    };

    if (array1.length > 1) {
      const result = array1
        .map(doubleEveryOther)
        .map(checkDoubleDigit)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      console.log(result);
      return isDivisibleByTen(result);
    } else {
      return false;
    }
  }
}
