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
 * @return {number[]}
 */
var findMode = function (root) {
  let maxCnt = 0;
  let cnt = 0;
  let pre = null;
  let res = [];
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.left);
    if (pre && pre.val == root.val) {
      cnt++;
    } else {
      cnt = 1;
    }
    if (cnt == maxCnt) {
      res.push(root.val);
    } else if (cnt > maxCnt) {
      res = [root.val];
      maxCnt = cnt;
    }
    pre = root;
    dfs(root.right);
  };
  dfs(root);
  return res;
};
