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
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
var delNodes = function (root, to_delete) {
  let ans = [];
  let set = new Set(to_delete);
  const dfs = (node) => {
    if (node == null) return null;
    node.left = dfs(node.left);
    node.right = dfs(node.right);
    // 后序遍历  如果当前节点值不在删除列表中  就直接返回了  这样它的子树就不会被加入答案中了
    if (!set.has(node.val)) return node;
    // 只有当前节点值在删除列表中  它的子树才有机会被加入答案中
    if (node.left) ans.push(node.left);
    if (node.right) ans.push(node.right);
    // 如果当前节点被删除了 返回null
    return null;
  };
  if (dfs(root)) {
    // 根节点灿有被删了也要加入结果中
    ans.push(root);
  }
  return ans;
};
// 这个题目坑点也挺多的
