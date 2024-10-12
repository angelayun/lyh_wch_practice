/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var minimizeXor = function (num1, num2) {
  const bitLen = (n) => {
    let count = 0
    while (n) {
      n &= n - 1
      count++
    }
    return count
  }
  // 1^1=0 相当于把c1上的1都消掉，这样能保证值最小
  let c1 = bitLen(num1), c2 = bitLen(num2)
  // 如果c1比c2大  把c1最低位的1变成0
  while (c1 > c2) {
    num1 &= num1 - 1
    c2++
  }
  // 如果c2比c1大  把c1最低位的0变成1
  while (c2 > c1) {
    num1 |= num1 + 1
    c2--
  }
  return num1
};