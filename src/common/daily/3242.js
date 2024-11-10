/**
 * @param {number[][]} grid
 */
var NeighborSum = function (grid) {
  this.grid = grid;
};

/**
 * @param {number} value
 * @return {number}
 */
NeighborSum.prototype.adjacentSum = function (value) {
  const n = this.grid.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (this.grid[i][j] == value) {
        let sum = 0;
        // 上
        if (i > 0) sum += this.grid[i - 1][j];
        // 左
        if (j > 0) sum += this.grid[i][j - 1];
        // 下
        if (i < n - 1) sum += this.grid[i + 1][j];
        // 右
        if (j < n - 1) sum += this.grid[i][j + 1];
        // debugger;
        // console.log(value, 'adjacentSum', sum);
        return sum;
      }
    }
  }
};

/**
 * @param {number} value
 * @return {number}
 */
NeighborSum.prototype.diagonalSum = function (value) {
  const n = this.grid.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (this.grid[i][j] == value) {
        let sum = 0;
        // 左上
        if (i > 0 && j > 0) sum += this.grid[i - 1][j - 1];
        // 右上
        if (i > 0 && j < n - 1) sum += this.grid[i - 1][j + 1];
        // 左下
        if (i < n - 1 && j > 0) sum += this.grid[i + 1][j - 1];
        // 右下
        if (i < n - 1 && j < n - 1) sum += this.grid[i + 1][j + 1];
        // debugger;
        // console.log(value, 'diagonalSum', sum);

        return sum;
      }
    }
  }
};

/**
 * Your NeighborSum object will be instantiated and called as such:
 * var obj = new NeighborSum(grid)
 * var param_1 = obj.adjacentSum(value)
 * var param_2 = obj.diagonalSum(value)
 */
export default NeighborSum;
