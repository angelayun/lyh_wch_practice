var pathInZigZagTree = function (label) {
  let row = 1,
    rowStart = 1;
  while (rowStart << 1 <= label) {
    rowStart <<= 1;
    row++;
  }
  if (row % 2 == 0) {
    label = getReverse(label, row);
  }
  let path = [];
  while (row > 0) {
    if (row % 2 == 0) {
      path.push(getReverse(label, row));
    } else {
      path.push(label);
    }
    label >>= 1;
    row--;
  }
  path.reverse()
  return path
};

const getReverse = (label, row) => {
  let start = 1 << (row - 1);
  let end = (1 << row) - 1;
  return start + end - label;
};
