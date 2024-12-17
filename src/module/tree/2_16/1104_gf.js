var pathInZigZagTree = function (label) {
  // 当前所在的行
  let row = 1,
    // 这一行开始的节点索引
    rowStart = 1;
  while (rowStart * 2 <= label) {
    row++;
    rowStart *= 2; // 看图就知道是1 2 4 8
  }
  // row为label在第几行
  if (row % 2 === 0) {
    // 如果是偶数行  则需要反转  比方说示例1的14 就变成了9
    label = getReverse(label, row);
  }
  const path = [];
  while (row > 0) {
    if (row % 2 === 0) {
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

const getReverse = (label, row) => {
  // row这一层最左边节点索引(1 << (row - 1))  最右边节点索引(1 << row) - 1)
  return (1 << (row - 1)) + (1 << row) - 1 - label;
};
