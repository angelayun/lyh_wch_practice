/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var modifiedMatrix = function (matrix) {
  let cols = matrix[0].length;
  let rows = matrix.length;
  let maxCols = new Array(cols).fill(-1);
  for (let j = 0; j < cols; j++) {
    maxCols[j] = matrix[0][j];
    for (let i = 1; i < rows; i++) {
      maxCols[j] = Math.max(maxCols[j], matrix[i][j]);
    }
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] == -1) {
        matrix[i][j] = maxCols[j];
      }
    }
  }
  return matrix;
};

/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var modifiedMatrix = function (matrix) {
  let cols = matrix[0].length;
  let rows = matrix.length;
  for (let j = 0; j < cols; j++) {
    let max = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < rows; i++) {
      max = Math.max(max, matrix[i][j]);
    }
    for (let i = 0; i < rows; i++) {
      if (matrix[i][j] == -1) {
        matrix[i][j] = max;
      }
    }
  }
  return matrix;
};
