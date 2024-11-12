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
 * @param {number} startValue
 * @param {number} destValue
 * @return {string}
 */
var getDirections = function (root, startValue, destValue) {
  let path = [];
  const dfs = (root, target) => {
    if (root == null) {
      return false;
    }
    if (root.val == target) {
      return true;
    }
    path.push('L');
    if (dfs(root.left, target)) return true;
    path.pop();
    path.push('R');
    if (dfs(root.right, target)) return true;
    path.pop();
  };
  dfs(root, startValue);
  let startPath = path.slice();
  path = [];
  dfs(root, destValue);
  let destPath = path.slice();
  // console.log(startPath, destPath);
  let k = 0;
  for (
    ;
    k < startPath.length && k < destPath.length && startPath[k] == destPath[k];
    k++
  ) {}
  return 'U'.repeat(startPath.length - k) + destPath.slice(k);
};
