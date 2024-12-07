/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val === undefined ? null : val;
 *    this.children = children === undefined ? null : children;
 * };
 */

/**
 * @param {_Node|null} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (root == null) return 0;
  let curDepth = 0;

  for (let node of root.children) {
    curDepth = Math.max(curDepth, maxDepth(node));
  }
  return curDepth + 1;
};
