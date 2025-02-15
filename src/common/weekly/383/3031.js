/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var minimumTimeToInitialState = function (word, k) {
  const n = word.length;
  let i = 1;
  while (i * k < n) {
    if (word.slice(i * k) == word.slice(0, n - i * k)) return i;
    i++;
  }
  return i;
  // 这种方式超时
};
/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var minimumTimeToInitialState = function (s, k) {
  let i = 1;
  while (true) {
    if (s.startsWith(s.slice(k * i))) return i;
    i++;
  }
  // 也超时
};
// TODO 到时候再看一下这个暴力匹配是否能通过
// z函数 每个后续它可以和开头匹配多长
/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var minimumTimeToInitialState = function (s, k) {
  const n = s.length;
  let z = new Array(n).fill(0);
  let i = 1;
  // Z box的左右边界
  let left = 0,
    right = 0;
  while (i < n) {
    if (i <= right) {
      // i在z box内
      z[i] = Math.min(z[i - left], right - i + 1);
    }
    while (i + z[i] < n && s[z[i]] == s[i + z[i]]) {
      left = i;
      right = i + z[i];
      z[i]++;
    }
    if (i % k == 0 && z[i] >= n - i) return i / k;
    i++;
  }
  return Math.floor(n / k);
};
