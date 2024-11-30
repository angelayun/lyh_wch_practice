/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root, max = Infinity, min = -Infinity) {
  if (root == null) return true;
  if (root.val >= max || root.val <= min) return false;
  return (
    isValidBST(root.left, root.val, min) &&
    isValidBST(root.right, max, root.val)
  );
};
// 这是我自己写的中序遍历的思路
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  let ans = true;
  let pre;
  const dfs = (root) => {
    if (root == null || ans == false) return;
    dfs(root.left);
    if (root.val <= pre) {
      ans = false;
    }
    pre = root.val;
    dfs(root.right);
  };
  dfs(root);
  return ans;
};
// 这是灵神的中序遍历的思路代码
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  let pre = -Infinity;
  const dfs = (root) => {
    if (root == null) return true;
    if (!dfs(root.left)) {
      return false;
    }
    if (root.val <= pre) {
      return false;
    }
    pre = root.val;
    return dfs(root.right);
  };
  return dfs(root);
};
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  const dfs = (root) => {
    // 空节点返回一个不影响后续取min max的值
    if (root == null) return [-Infinity, Infinity];
    let [lMax, lMin] = dfs(root.left);
    let [rMax, rMin] = dfs(root.right);
    // 返回一个不合法的值
    if (root.val <= lMax || root.val >= rMin) return [Infinity, -Infinity];
    return [Math.max(root.val, rMax), Math.min(lMin, root.val)];
  };
  return dfs(root)[0] != Infinity;
};
