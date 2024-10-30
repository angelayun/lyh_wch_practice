/**
 * @param {number} n
 * @return {string[]}
 */
var validStrings = function (n) {
  let ans = [];
  let mask = (1 << n) - 1;
  for (let x = 0; x < 1 << n; x++) {
    if (((x >> 1) & x) == 0) {
      ans.push((x ^ mask).toString(2).padStart(n, '0'));
    }
  }
  return ans;
};

/**
 * @param {number} n
 * @return {string[]}
 */
var validStrings = function (n) {
  let ans = [];
  let path = new Array(n);
  const dfs = (i) => {
    if (i == n) {
      return ans.push(path.join(''));
    }
    path[i] = '1';
    dfs(i + 1);
    if (i == 0 || path[i - 1] == '1') {
      path[i] = '0';
      dfs(i + 1);
    }
  };
  dfs(0);
  return ans;
};
