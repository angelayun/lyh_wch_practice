/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const onPath = new Array(n).fill(false);
  const diag1 = new Array(n * 2).fill(false);
  const diag2 = new Array(n * 2).fill(false);
  let ans = [];
  let cols = new Array(n).fill(0);
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
