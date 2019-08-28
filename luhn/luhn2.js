//
// This is only a SKELETON file for the 'Luhn' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

let iteration = 1;

const defineIsEven = (n) => {
  if ((n % 2) == 0) {
    return true;
  } else {
    return false;
  }
}

const isDivisibleByTen = (n) => {
  if ((n % 10) == 0) {
    return true;
  } else {
    return false;
  }
}

const doubleEveryOther = (x) =>{
  x = parseInt(x)
  console.log('Number of Iteration', iteration);
  if (defineIsEven(iteration)) {
    iteration++;
    console.log('Even Value:', x);
    return (x * 2);
  }
  iteration++;
  return x;
}

const checkDoubleDigit = y => {
  if (y > 9) {
    return y - 9;
  }
  return y;
}



export class Luhn {
  constructor(luhn) {
    this.luhn = luhn
    
  }


  get valid() {
    const array1 = this.luhn
    const array2 = array1.split("").reverse()
    console.log(array2) // this works

    if (array2.length > 1) {
      const result = array2
      .map(doubleEveryOther)
      .map(checkDoubleDigit)
      // .map((value) => {
      //   iteration++;
      //   console.log('value', iteration)
      //   return value;
      // })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      console.log(result);
      return isDivisibleByTen(result);
    } else {
      return false;
    }
  }
}


// 
// for (var i = 1; i < array2.length; i += 2) {
//   array2[i] *= 2;
//   if (array2[i] > 9) {
//     return i - 9