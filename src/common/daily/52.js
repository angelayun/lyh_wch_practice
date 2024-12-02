/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
  const onPath = new Array(n).fill(false);
  let dialog1 = new Array(n * 1).fill(false);
  let dialog2 = new Array(n * 2).fill(false);
  let ans = 0;
  const dfs = (r) => {
    if (r >= n) {
      ans++;
      return;
    }
    for (let c = 0; c < n; c++) {
      let d = r - c + n;
      if (!onPath[c] && !dialog1[r + c] && !dialog2[d]) {
        onPath[c] = dialog1[r + c] = dialog2[d] = true;
        dfs(r + 1);
        onPath[c] = dialog1[r + c] = dialog2[d] = false;
      }
    }
  };
  dfs(0);
  return ans;
};
