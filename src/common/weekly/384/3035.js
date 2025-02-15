/**
 * @param {string[]} words
 * @return {number}
 */
var maxPalindromesAfterOperations = function (words) {
  let cnt = new Array(26).fill(0);
  for (let w of words) {
    for (let x of w) {
      cnt[x.charCodeAt() - 'a'.charCodeAt()]++;
    }
  }
  // 只需统计一侧可用字母个数
  let left = 0;
  for (let c of cnt) {
    left += c >> 1;
  }
  // 按照字符串长度  从小到大填入字母
  let ans = 0;
  words.sort((a, b) => a.length - b.length);
  for (let w of words) {
    let m = w.length >> 1;
    if (left < m) break;
    // 从left中拿m个字母放到左半  右半会自动放入m个
    left -= m;
    ans++;
  }
  return ans;
};
