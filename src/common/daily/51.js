/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const onPath = new Array(n).fill(false);
  let dialog1 = new Array(n * 1).fill(false);
  let dialog2 = new Array(n * 2).fill(false);
  let ans = [];
  let cols = new Array(n).fill(false);
  const dfs = (r) => {
    if (r >= n) {
      ans.push(
        cols.map((item) => '.'.repeat(item) + 'Q' + '.'.repeat(n - item - 1))
      );
      return;
    }
    for (let c = 0; c < n; c++) {
      let d = r - c + n;
      if (!onPath[c] && !dialog1[r + c] && !dialog2[d]) {
        onPath[c] = dialog1[r + c] = dialog2[d] = true;
        cols[r] = c;
        dfs(r + 1);
        onPath[c] = dialog1[r + c] = dialog2[d] = false;
      }
    }
  };
  dfs(0);
  return ans;
};
