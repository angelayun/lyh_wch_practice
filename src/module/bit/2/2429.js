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
  if (c2 > num1.toString().length) return Math.pow(2, c2) - 1;
  if (c1 == c2) return num1;
  if (c2 < c1) {
    // 把最低位的1换成0
  } else {
    // 把高位的1换成0
  }
};
