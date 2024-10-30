const check = (s, i, j) => {
  let x = 0;
  if (i == j && s[i] == '0') return true;
  for (let k = i; k <= j; k++) {
    if (x == 0 && s[k] == 0) return false;
    x = x * 10 + Number(s[k]);
  }
  console.log(s, i, j, x);
  return x <= 255;
};
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const n = s.length;
  const ans = [];
  const path = [];
  const dfs = (i, start) => {
    if (i == n) {
      if (path.length == 4) {
        ans.push(path.join('.'));
      }
      return;
    }
    // i和i+1之间的逗号
    if (i < n - 1) {
      dfs(i + 1, start);
    }
    if (check(s, start, i)) {
      path.push(s.substring(start, i + 1));
      dfs(i + 1, i + 1);
      path.pop();
    }
  };
  dfs(0, 0);
  return ans;
};
