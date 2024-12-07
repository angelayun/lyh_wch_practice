/**
 * @param {_Node|null} root
 * @return {number[]}
 */
var preorder = function (root) {
  let ans = [];
  const dfs = (root) => {
    if (root == null) return;
    ans.push(root.val);
    if (root.children) {
      for (let node of root.children) {
        dfs(node);
      }
    }
  };
  dfs(root)
  return ans;
};