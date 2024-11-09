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
  let cnt = 1,
    maxCnt = 1;
  let ans = root.val;
  let res = [ans];
  let pre = null;
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.left);
    if (pre != null) {
      if (pre == root.val) {
        cnt++;
        if (cnt >= maxCnt) {
          if (cnt > maxCnt) {
            ans = root.val;
            res = [];
          }
          res.push(root.val);
          maxCnt = cnt;
        }
      } else {
        cnt = 1;
      }
    }
    pre = root.val;
    dfs(root.right);
  };
  dfs(root);
  return ans;
};
