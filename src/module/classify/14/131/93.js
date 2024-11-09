/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const n = s.length;
  let ans = [];
  let path = [];
  const check = (s, i, j) => {
    let x = 0;
    if (i == j && s[i] == '0') return true;
    for (let k = i; k <= j; k++) {
      if (x == 0 && s[k] == 0) return false;
      x = x * 10 + Number(s[k]);
    }
    return x <= 255;
  };
  const dfs = (i) => {
    if (i == n) {
      if (path.length == 4) {
        ans.push(path.join('.'));
      }
      return;
    }
    for (let j = i; j < n; j++) {
      if (check(s, i, j)) {
        path.push(s.substring(i, j + 1));
        dfs(j + 1);
        path.pop();
      }
    }
  };
  dfs(0);
  return ans;
};
