/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
  let onPath = new Array(n).fill(false);
  let diag1 = new Array(2 * n).fill(false);
  let diag2 = new Array(2 * n).fill(false);
  let ans = 0;
  const dfs = (r) => {
    if (r == n) {
      ans++;
      return;
    }
    for (let c = 0; c < n; c++) {
      let d = r - c + n;
      if (!onPath[c] && !diag1[r + c] && !diag2[d]) {
        onPath[c] = diag1[r + c] = diag2[d] = true;
        dfs(r + 1);
        onPath[c] = diag1[r + c] = diag2[d] = false;
      }
    }
  };
  dfs(0);
  return ans;
};
