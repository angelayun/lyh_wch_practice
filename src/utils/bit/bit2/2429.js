/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var minimizeXor = function (num1, num2) {
  let countBit = (n) => {
    let count = 0
    while (n) {
      n &= n - 1
      count++
    }
    return count
  }
  let num1Len = num1.toString(2).length
  let c1 = countBit(num1), c2 = countBit(num2)
  if (c2 >= num1Len) return (1 << c2) - 1
  while (c1 > c2) {
    // 等价于去掉nums1最低位的c1-c2个1
    num1 -= num1 & -num1
    // num1 &= num1 - 1
    c2++
  }
  while (c2 > c1) {
    // 等价于去掉num1最低位的c2-c1个0
    let y = -num1
    num1 -= y & -y
    // num1 |= num1 + 1
    c2--
  }
  return num1
};