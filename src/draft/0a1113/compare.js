var totalNQueens = function (n) {
  const onPath = Array(n).fill(false);
  const diag1 = Array(n * 2).fill(false);
  const diag2 = Array(n * 2).fill(false);
  let ans = 0;

  function dfs(r) {
    if (r === n) {
      ans++; // 找到一个合法方案
      return;
    }
    for (let c = 0; c < n; c++) {
      const rc = r - c + n;
      if (!onPath[c] && !diag1[r + c] && !diag2[rc]) {
        onPath[c] = diag1[r + c] = diag2[rc] = true;
        dfs(r + 1);
        onPath[c] = diag1[r + c] = diag2[rc] = false; // 恢复现场
      }
    }
  }

  dfs(0);
  return ans;
};
