/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  // 灵神的头插法
  let head = null;
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.right);
    dfs(root.left);
    root.left = null;
    root.right = head;
    head = root;
  };
  dfs(root);
};
