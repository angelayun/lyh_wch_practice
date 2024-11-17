/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
  let ans = [];
  const n = s.length;
  const dfs = (i, path) => {
    if (i >= n) {
      ans.push(path);
      return;
    }
    if ((s[i] >= 'a' && s[i] <= 'z') || (s[i] >= 'A' && s[i] <= 'Z')) {
      dfs(i + 1, path + s[i].toLowerCase());
      dfs(i + 1, path + s[i].toUpperCase());
    } else {
      dfs(i + 1, path + s[i]);
    }
  };
  dfs(0, '');
  return ans;
};
