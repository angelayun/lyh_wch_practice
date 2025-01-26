/**
 * @param {number[][]} grid
 * @return {number}
 */
var equalPairs = function (grid) {
  const n = grid.length;
  let set = new Map();
  for (let i = 0; i < n; i++) {
    let rows = [];
    for (let j = 0; j < n; j++) {
      rows.push(grid[i][j]);
    }
    let rowKey = rows.join(',');
    // set.add();
    set.set(rowKey, (set.get(rowKey) || 0) + 1);
  }
  let cnt = 0;
  for (let i = 0; i < n; i++) {
    let rows = [];
    for (let j = 0; j < n; j++) {
      rows.push(grid[j][i]);
    }
    let setKey = rows.join(',');
    if (set.has(setKey)) cnt += set.get(setKey);
  }
  return cnt;
};
export default equalPairs;
