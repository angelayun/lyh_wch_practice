/**
 * @param {string} s
 * @return {string}
 */
var getSmallestString = function (s) {
  // 这个题目有个贪心的思路在里面
  // 前面相同的情况下 越长 字典序越小
  s = s.split('');
  const n = s.length;
  for (let i = 1; i < n; i++) {
    // 题目要求奇偶性相同 s[i] < s[i - 1] 当前数字比前一个数字小才交换 这样字典序才会小
    if (s[i] % 2 == s[i - 1] % 2 && s[i] < s[i - 1]) {
      // 只有交换了 就是字典序最小的 贪心
      [s[i], s[i - 1]] = [s[i - 1], s[i]];
      break;
    }
  }
  return s.join('');
};
