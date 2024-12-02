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
 * @return {number}
 */
var findSecondMinimumValue = function (root) {
  let minVal = root.val;
  let ans = -1;
  const dfs = (root) => {
    if (root == null) return;
    // 已经找到一个比minVal稍微大一点的  而当前节点比ans还要大  它的子节点比ans就更大了 就没有递归的必要了
    if (ans != -1 && root.val > ans) return;
    
    if (root.val > minVal) {
      ans = root.val;
    }
    dfs(root.left);
    dfs(root.right);
  };
  dfs(root);
  return ans;
};
