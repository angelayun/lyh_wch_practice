/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
  let res = [];
  const n = s.length;
  const dfs = (i, path) => {
    if (i == n) {
      return res.push(path);
    }
    if (s[i] >= 0 && s[i] <= 9) {
      dfs(i + 1, path + s[i]);
    } else {
      dfs(i + 1, path + s[i].toLowerCase());
      dfs(i + 1, path + s[i].toUpperCase());
    }
  };
  dfs(0, '');
  return res;
};
