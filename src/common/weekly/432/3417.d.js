/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var zigzagTraversal = function (grid) {
  let ok = true;
  let res = [];
  for (let i = 0; i < grid.length; i++) {
    let row = grid[i];
    if (i & 1) {
      row.reverse();
    }
    for (let x of row) {
      if (ok) {
        res.push(x);
      }
      ok = !ok;
    }
  }
  return res;
};
