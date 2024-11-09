var rangeSumBST = function (root, low, high) {
  if (root === null) {
    return 0;
  }
  const x = root.val;
  if (x > high) {
    // 右子树没有节点在范围内，只需递归左子树
    return rangeSumBST(root.left, low, high);
  }
  if (x < low) {
    // 左子树没有节点在范围内，只需递归右子树
    return rangeSumBST(root.right, low, high);
  }
  return (
    x + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high)
  );
};
var rangeSumBST = function (root, low, high) {
  if (root === null) {
    return 0;
  }
  const x = root.val;
  let sum = low <= x && x <= high ? x : 0;
  if (x > low) {
    // 左子树可能有节点值在范围内
    sum += rangeSumBST(root.left, low, high);
  }
  if (x < high) {
    // 右子树可能有节点值在范围内
    sum += rangeSumBST(root.right, low, high);
  }
  return sum;
};
// 灵神的代码确实很简洁呀