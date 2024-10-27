var invertTree = function (root) {
  if (root === null) {
    return null;
  }
  const left = invertTree(root.left); // 翻转左子树
  const right = invertTree(root.right); // 翻转右子树
  root.left = right; // 交换左右儿子
  root.right = left;
  return root;
};

var invertTree = function (root) {
  if (root === null) {
    return null;
  }
  [root.left, root.right] = [root.right, root.left]; // 交换左右儿子
  invertTree(root.left); // 翻转左子树
  invertTree(root.right); // 翻转右子树
  return root;
};
