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
var pseudoPalindromicPaths = function (root) {
  let ans = 0;
  let path = new Array(10).fill(0);
  const dfs = (root) => {
    if (root == null) return;
    path[root.val]++;
    if (root.left == root.right) {
      let count = 0;
      for (let v of path) {
        if (v & 1) count++;
      }
      ans += count <= 1;
    }
    dfs(root.left);
    dfs(root.right);
    path[root.val]--;
  };
  dfs(root);
  return ans;
};

var pseudoPalindromicPaths = function (root) {
  let ans = 0;
  let path = new Array(10).fill(0);
  const dfs = (root) => {
    if (root == null) return;
    path[root.val] ^= 1;
    if (root.left == root.right) {
      ans += path.filter((v) => v == 1).length <= 1;
    }
    dfs(root.left);
    dfs(root.right);
    path[root.val] ^= 1;
  };
  dfs(root);
  return ans;
};
// 待验证
