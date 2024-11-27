var invertTree = function (root) {
  if (root == null) return root;
  let left = invertTree(root.left);
  let right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
};
// 这俩写到一起看  真舒服
var invertTree = function (root) {
  if (root == null) return root;
  [root.left, root.right] = [root.right, root.left];
  invertTree(root.left);
  invertTree(root.right);
  return root;
};
