/**
 * @param {number[][]} frame
 * @return {number}
 */
var jewelleryValue = function (frame) {
  let rows = frame.length
  if (rows <= 0) return 0
  let cols = frame[0].length
  for (let i = 1; i < rows; i++) {
    frame[i][0] += frame[i - 1][0]
  }
  for (let j = 1; j < cols; j++) {
    frame[0][j] += frame[0][j - 1]
  }
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      frame[i][j] += Math.max(frame[i - 1][j], frame[i][j - 1])
    }
  }
  return frame[rows - 1][cols - 1]
};