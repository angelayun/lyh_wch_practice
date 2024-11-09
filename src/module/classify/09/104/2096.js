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
  // 这个dfs必须是要有返回值的
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
  let pathStart = path.slice();
  console.log(pathStart);
  path = [];
  dfs(root, destValue);
  let pathDest = path.slice();
  console.log(pathDest);

  let k = 0;
  for (
    let i = 0, j = 0;
    i < pathStart.length && j < pathDest.length && pathStart[i] == pathDest[j];
    i++, j++
  ) {
    k++;
  }
  // 前k个都不要了 只要后面部分 左子树的后面部分都是向上  右子树的后面部分是L就是L 是R就是R
  return 'U'.repeat(pathStart.length - k) + pathDest.slice(k).join('');
};
