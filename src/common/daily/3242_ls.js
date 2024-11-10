let directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],

  [1, 1],
  [-1, 1],
  [-1, -1],
  [1, -1],
];
/**
 * @param {number[][]} grid
 */
var NeighborSum = function (grid) {
  const n = grid.length;
  let sum = Array.from({ length: n * n }, () => [0, 0]);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let v = grid[i][j];
      for (let k = 0; k < directions.length; k++) {
        let [dx, dy] = directions[k];
        let x = i + dx,
          y = j + dy;
        // if (0 <= x < n && 0 <= y < n) {
        if (x >= 0 && x < n && y >= 0 && y < n) {
          debugger;
          sum[v][~~(k / 4)] += grid[x][y];
        }
      }
    }
  }
  this.sum = sum;
};

/**
 * @param {number} value
 * @return {number}
 */
NeighborSum.prototype.adjacentSum = function (value) {
  return this.sum[value][0];
};

/**
 * @param {number} value
 * @return {number}
 */
NeighborSum.prototype.diagonalSum = function (value) {
  return this.sum[value][1];
};

/**
 * Your NeighborSum object will be instantiated and called as such:
 * var obj = new NeighborSum(grid)
 * var param_1 = obj.adjacentSum(value)
 * var param_2 = obj.diagonalSum(value)
 */
export default NeighborSum;
