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
 * @param {number[]} voyage
 * @return {number[]}
 */
var flipMatchVoyage = function (root, voyage) {
  let ans = [];
  const dfs = (root1, root2) => {
    if (root1 == null || root2 == null) return root1 == root2;
    if (root1.val != root2.val) return false;
    // 不翻转
    let cur = dfs(root1.left, root2.left) && dfs(root1.right, root2.right);
    if (cur) return true;
    // 翻转
    cur = dfs(root1.left, root2.right) || dfs(root1.right, root2.left);
    if (cur) {
      ans.push(root.val);
    }
    return cur;
  };
  let res = dfs(root, voyage);
  if (!res) return [-1];
  return ans;
};
// 这个是错的，题目都没看清楚