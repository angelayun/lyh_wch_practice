/**
 * @param {string[]} array
 * @return {string[]}
 */
var findLongestSubarray = function (array) {
  let n = array.length;

  let s = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    // 判断是不是字母  数字  (array[i].charCodeAt() >> 6) & 1  二进制从低到高第 6 位（设二进制最低位是第 0 位）是 0 还是 1 来判断：如果是 1 就是小写/大写英文字母字符，如果是 0 就是数字字符。
    s[i + 1] = s[i] + ((array[i].charCodeAt() >> 6) & 1) * 2 - 1;
    // ×2−1 的操作，把 1 转换成 1，0 转换成 −1。
  }
  let begin = 0,
    end = 0;
  let first = new Map();
  for (let i = 0; i <= n; i++) {
    let j = first.get(s[i]) ?? -1;
    if (j < 0) {
      first.set(s[i], i);
    } else if (i - j > end - begin) {
      begin = j;
      end = i;
    }
  }
  return array.slice(begin, end);
};
