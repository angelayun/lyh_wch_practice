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
  while (c2 > c1) {
    // 多出来1  让放到num1的最低位的0上  这样异或和最小
    num1 |= num1 + 1;
    c2--;
  }
  while (c1 > c2) {
    // 少了1  那就应该匹配高位的1  这样异或和最小  那低位的1匹配不了了 就只能去掉了
    num1 &= num1 - 1;
    c1--;
  }
  return num1;
};
