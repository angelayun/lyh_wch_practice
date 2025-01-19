/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function (word) {
  let n = word.length;
  let ans = 0;
  let push = 1;
  while (n > 0) {
    ans += Math.min(n, 8) * push;
    n -= 8;
    push++;
  }
  return ans;
};
/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function (word) {
  let n = word.length;
  let k = ~~(n / 8);
  // 等差数列求和
  // (1+k)*k /2*8
  return (1 + k) * k * 4 + (n % 8) * (k + 1);
};
