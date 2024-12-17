/* const getReverse = (row, label) => {
  let start = 1 << (row - 1);
  let end = 1 << (row - 1);
  return start + end - label;
}; */
const getReverse = (label, row) => {
  // row这一层最左边节点索引(1 << (row - 1))  最右边节点索引(1 << row) - 1)
  return (1 << (row - 1)) + (1 << row) - 1 - label;
};
/**
 * @param {number} label
 * @return {number[]}
 */
var pathInZigZagTree = function (label) {
  let row = 1,
    rowStart = 1;
  // 下一行的起始位置比label小  放心的加
  while (rowStart * 2 < label) {
    row++;
    rowStart >>= 1;
  }
  if (row % 2 == 0) {
    label = getReverse(label);
  }
  const path = [];
  while (row > 0) {
    if (row % 2 == 0) {
      path.push(getReverse(row, label));
    } else {
      path.push(label);
    }
    row--;
    label >>= 1;
  }
  path.reverse();
  return path;
};
