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
  // 为了让异或和尽量小，这些 1 应当从高位到低位匹配 num1中的 1；如果匹配完了还有多余的 1，那么就从低位到高位把 0 改成 1。
  let c1 = hammingWeight(num1);
  let c2 = hammingWeight(num2);
  // 置位跟c2一样 异或值最小
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
