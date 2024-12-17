/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  if (root == null) return '#';
  let left = serialize(root.left);
  let right = serialize(root.right);
  return [left, right, root.val].join(',');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  let list = data.split(',');
  const dfs = () => {
    let cur = list.pop();
    if (cur == '#') return null;
    return new TreeNode(parseInt(cur), dfs(), dfs());
  };
  return dfs();
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
