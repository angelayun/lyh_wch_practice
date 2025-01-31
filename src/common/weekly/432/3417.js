/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var zigzagTraversal = function (grid) {
  let ans = [];
  let ok = true;
  for (let i = 0; i < grid.length; i++) {
    let row = grid[i];
    if (i & 1) {
      row.reverse();
    }
    for (let x of row) {
      if (ok) ans.push(x);
      ok = !ok;
    }
  }
  return ans;
};
