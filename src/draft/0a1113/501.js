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
  let maxCnt = 0,
    cnt = 0;
  let res = [];
  let pre;
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.left);
    if (pre && root.val != pre.val) {
      cnt = 1;
    } else {
      cnt++;
    }
    if (cnt > maxCnt) {
      res = [root.val];
      maxCnt = cnt;
    } else if (cnt == maxCnt) {
      res.push(root.val);
    }
    pre = root;
    dfs(root.right);
  };
  dfs(root);
  return res;
};
