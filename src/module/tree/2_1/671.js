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
  // 每个节点的子节点数量只能为 2 或 0。如果一个节点有两个子节点的话，那么该节点的值等于两个子节点中较小的一个。
  let minVal = root.val;
  // 树的根节点是整个树中的最小值
  let ans = -1;
  const dfs = (node) => {
    if (node == null) return;
    // 说明根节点是左右俩节点中小的值  如果ans已经找到比最小值稍微大一点的  而当前值比第二小的还要大  它的左右子树就更大了  不需要递归了
    if (ans != -1 && node.val > ans) {
      return;
    }
    if (node.val > minVal) {
      ans = node.val;
    }
    dfs(node.left);
    dfs(node.right);
  };
  dfs(root);
  return ans;
};
