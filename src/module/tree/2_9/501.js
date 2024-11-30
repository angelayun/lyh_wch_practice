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
  let pre;
  let cnt = 0;
  let maxCnt = 0;
  let ans = [];
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.left);
    if (pre == null || pre != root.val) {
      cnt = 1;
    } else {
      cnt++;
    }
    if (cnt > maxCnt) {
      maxCnt = cnt;
      ans = [root.val];
    } else if (cnt == maxCnt) {
      ans.push(root.val);
    }
    pre = root.val;
    dfs(root.right);
  };
  dfs(root);
  return ans;
};
