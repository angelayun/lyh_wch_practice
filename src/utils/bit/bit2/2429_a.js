/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var minimizeXor = function (num1, num2) {
  const countBit = (n) => {
    let count = 0
    while (n) {
      n &= n - 1
      count++
    }
    return count
  }
  let c1 = countBit(num1), c2 = countBit(num2)
  while (c1 > c2) {
    // 把num1最低的1变成0
    num1 &= num1 - 1
    c2++
  }
  while (c2 > c1) {
    // 把num最低的0变成1
    num1 |= num1 + 1
    c2--
  }
  return num1
};