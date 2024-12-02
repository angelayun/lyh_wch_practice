/**
 * @param {TreeNode} root
 * @param {number[]} voyage
 * @return {number[]}
 */
var flipMatchVoyage = function (root, voyage) {
  let i = 0;
  let res = [];
  const dfs = (root) => {
    if (root == null) return true;
    if (i >= voyage.length) return false;
    if (voyage[i] != root.val) return false;
    i++
    if (dfs(root.left) && dfs(root.right)) return true;
    if (dfs(root.right) && dfs(root.left)) {
      res.push(root.val);
      return true;
    }
  };
  if (dfs(root)) {
    return res;
  }
  return [-1];
};
