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
    if (root == null) return false;
    if (root.val == target) return true;
    path.push('L');
    if (dfs(root.left, target)) return true;
    path.pop();
    path.push('R');
    if (dfs(root.right, target)) return true;
    path.pop();
    return false;
  };
  dfs(root, startValue);
  let startPath = path.slice();
  path = [];
  dfs(root, destValue);
  let destPath = path.slice();
  let k = 0;
  while (
    k < startPath.length &&
    k < destPath.length &&
    startPath[k] == destPath[k]
  ) {
    k++;
  }
  // console.log(destPath.join(),k,destPath.slice(k))
  // console.log(k, startPath, destPath)
  return 'U'.repeat(startPath.length - k) + destPath.slice(k).join('');
};
