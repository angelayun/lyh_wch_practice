var solveNQueens = function (n) {
  const ans = [];
  // 比方说示例1的第一个图就是[1,3,0,2]  示例2的第二个图[2,0,3,1]
  const col = Array(n).fill(0);
  // 是否已经选中这一列了
  const onPath = Array(n).fill(false);
  // 左右斜对角线
  const diag1 = Array(n * 2 - 1).fill(false);
  const diag2 = Array(n * 2 - 1).fill(false);
  function dfs(r) {
    if (r === n) {
      ans.push(col.map(c => '.'.repeat(c) + 'Q' + '.'.repeat(n - 1 - c)));
      return;
    }
    for (let c = 0; c < n; c++) {
      if (!onPath[c] && !diag1[r + c] && !diag2[r - c]) {
        col[r] = c;
        onPath[c] = diag1[r + c] = diag2[r - c] = true;
        dfs(r + 1);
        onPath[c] = diag1[r + c] = diag2[r - c] = false; // 恢复现场
      }
    }
  }
  dfs(0);
  return ans;
};