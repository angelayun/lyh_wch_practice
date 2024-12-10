var flatten = function (root) {
  let head = null;
  const dfs = (node) => {
    if (node == null) return;
    dfs(node.right);
    dfs(node.left);
    node.left = null;
    node.right = head;
    head = node;
  };
  dfs(root);
};

var flatten = function (root) {
  if (root == null) return root;
  let leftTail = flatten(root.left);
  let rightTail = flatten(root.right);
  if (leftTail) {
    leftTail.right = root.right;
    root.right = root.left;
    root.left = null;
  }
  return rightTail || leftTail || root;
};
