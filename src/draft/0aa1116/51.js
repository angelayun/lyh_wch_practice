/**
 * @param {number} n
 * @return {number}
 */
var solveNQueens = function (n) {
  let onPath = new Array(n).fill(false);
  let diag1 = new Array(2 * n).fill(false);
  let diag2 = new Array(2 * n).fill(false);
  let cols = new Array(n).fill(0);
  let ans = [];
  const dfs = (r) => {
    if (r == n) {
      ans.push(cols.map((c) => '.'.repeat(c) + 'Q' + '.'.repeat(n - 1 - c)));
      return;
    }
    for (let c = 0; c < n; c++) {
      let d = r - c + n;
      if (!onPath[c] && !diag1[r + c] && !diag2[d]) {
        cols[r] = c;
        onPath[c] = diag1[r + c] = diag2[d] = true;
        dfs(r + 1);
        onPath[c] = diag1[r + c] = diag2[d] = false;
      }
    }
  };
  dfs(0);
  return ans;
};
