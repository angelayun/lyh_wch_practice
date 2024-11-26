/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
  const onPath = new Array(n).fill(false);
  const diag1 = new Array(n * 2).fill(false);
  const diag2 = new Array(n * 2).fill(false);
  let ans = 0;
  const dfs = (r) => {
    if (r == n) {
      ans++;
      return;
    }
    for (let c = 0; c < n; c++) {
      let d = r - c + n;
      if (!onPath[r] && !diag1[r + c] && !diag2[d]) {
        onPath[r] = diag1[r + c] = diag2[d] = true;
        dfs(r + 1);
        onPath[r] = diag1[r + c] = diag2[d] = true;
      }
    }
  };
  dfs(0);
  return ans;
};
