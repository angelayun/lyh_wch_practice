/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {_Node|null} root
 * @return {number[]}
 */
var postorder = function(root) {
  let ans = [];
  const dfs = (root) => {
    if (root == null) return;
    if (root.children) {
      for (let node of root.children) {
        dfs(node);
      }
    }
    ans.push(root.val);
  };
  dfs(root)
  return ans;
};