var increasingBST = function (root) {
  let dummyNode = new TreeNode(-1);
  let p = dummyNode;
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.left);
    p.right = root;
    p = p.right;
    root.left = null
    dfs(root.right);
  };
  dfs(root);
  return dummyNode.right;
};