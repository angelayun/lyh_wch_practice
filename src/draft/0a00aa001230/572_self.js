/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
const isSameTree = (root1, root2) => {
  if (root1 == null || root2 == null) return root1 == root2;
  if (root1.val != root2.val) return false;
  return (
    isSameTree(root1.left, root2.left) && isSameTree(root1.right, root2.right)
  );
};
const getHeight = (root) => {
  if (root == null) return 0;
  return Math.max(getHeight(root.left), getHeight(root.right)) + 1;
};
/**
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
  let subHeight = getHeight(subRoot);
  const dfs = (root) => {
    if (root == null) return [0, false];
    let [lHeight, leftFound] = dfs(root.left);
    let [rHeight, rightFound] = dfs(root.right);
    if (leftFound || rightFound) {
      return [0, true];
    }
    let nodeHeight = Math.max(lHeight, rHeight) + 1;
    return [nodeHeight, nodeHeight == subHeight && isSameTree(root, subRoot)];
  };
  return dfs(root)[1];
};
