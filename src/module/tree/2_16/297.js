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
  return [root.val, left, right].join(',');
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
    let val = list.shift();
    if (val == '#') return null;
    return new TreeNode(parseInt(val), dfs(), dfs());
  };
  return dfs();
};


// 下面是后序遍历的代码
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
  return [right, left, root.val].join(',');
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