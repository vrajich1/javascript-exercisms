
export const reverseString = (word) => {
    const arr = word.split('')
    const reversedArr = []
    for (let i = 0; i <= arr.lenth; i++) {
        reversedArr.unshift(arr[i])
    }

const newStr = reversedArr.join('')
return newStr
}
