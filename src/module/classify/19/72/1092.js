/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var shortestCommonSupersequence = function (s, t) {
  // 如果s是空串  返回剩余的t
  if (s == '') return t;
  // 如果t是空串  返回剩余的s
  if (t == '') return s;
  let s1 = s.slice(0, s.length - 1),
    t1 = t.slice(0, t.length - 1);
  if (s[s.length - 1] == t[t.length - 1])
    // 最短公共超序列一定包含最后一个字母
    return shortestCommonSupersequence(s1, t1) + s[s.length - 1];
  let ans1 = shortestCommonSupersequence(s1, t);
  let ans2 = shortestCommonSupersequence(s, t1);
  if (ans1.length < ans2.length) return ans1 + s[s.length - 1];
  return ans2 + t[t.length - 1];
};
// 上面的会超时  只是展示思路
/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var shortestCommonSupersequence = function (str1, str2) {
  let s = str1,
    t = str2;
  let memo = Array.from({ length: s.length }, () => new Array(t.length));
  const dfs = (i, j) => {
    if (i < 0) return t.substring(0, j + 1);
    if (j < 0) return s.substring(0, i + 1);
    if (memo[i][j] != null) return memo[i][j];
    if (s[i] == t[j]) return (memo[i][j] = dfs(i - 1, j - 1) + s[i]);
    let ans1 = dfs(i - 1, j);
    let ans2 = dfs(i, j - 1);
    if (ans1.length < ans2.length) {
      return (memo[i][j] = ans1 + s[i]);
    }
    return (memo[i][j] = ans2 + t[j]);
  };
  return dfs(s.length - 1, t.length - 1);
};
