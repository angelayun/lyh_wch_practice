const getReverse = (label, row) => {
  // 这一层的起始编号
  let start = 1 << (row - 1);
  // 这一层的结束编号
  let end = (1 << row) - 1;
  // 对应编号
  return start + end - label;
};
/**
 * @param {number} label
 * @return {number[]}
 */
var pathInZigZagTree = function (label) {
  let row = 1,
    rowStart = 1;
  // 下一行的起始位置比label小  放心的加
  while (rowStart * 2 <= label) {
    row++;
    rowStart <<= 1;
  }
  // 统一都弄成正序的好找
  if (row % 2 == 0) {
    label = getReverse(label, row);
  }
  const path = [];
  while (row > 0) {
    if (row % 2 == 0) {
      path.push(getReverse(label, row));
    } else {
      path.push(label);
    }
    row--;
    label >>= 1;
  }
  path.reverse();
  return path;
};
