/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function (n) {
  let count = 0;
  while (n) {
    n &= n - 1;
    count++;
  }
  return count;
};
/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var minimizeXor = function (num1, num2) {
  let c1 = hammingWeight(num1);
  let c2 = hammingWeight(num2);
  // 如果
  while (c2 > c1) {
    // 把c1最低位的0变成1
    num1 |= num1 + 1;
    c2--;
  }
  while (c1 > c2) {
    // 把c2最低位的1变成0
    num1 &= num1 - 1;
    c1--;
  }
  return num1;
};
