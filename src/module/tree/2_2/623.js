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
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}
 */
var addOneRow = function (root, val, depth) {
  if (depth == 1) {
    return new TreeNode(val, root, null);
  }
  const dfs = (root, curDepth) => {
    if (root == null) return;
    curDepth++;
    if (curDepth == depth - 1) {
      let newLeftNode = new TreeNode(val, root.left, null);
      let newRightNode = new TreeNode(val, null, root.right);
      root.left = newLeftNode;
      root.right = newRightNode;
    }
    dfs(root.left, curDepth);
    dfs(root.right, curDepth);
  };
  dfs(root, 0);
  return root;
};
//

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
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}
 */
var addOneRow = function (root, val, depth) {
  if (depth == 1) {
    return new TreeNode(val, root);
  }
  let curDepth = 0;
  let queue = [];
  if (root) queue.push(root);
  while (queue.length) {
    curDepth++;
    let nextQueue = [];
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      if (curDepth == depth - 1) {
        let newLeftNode = new TreeNode(val, node.left, null);
        let newRightNode = new TreeNode(val, null, node.right);
        node.left = newLeftNode;
        node.right = newRightNode;
      } else {
        if (node.left) nextQueue.push(node.left);
        if (node.right) nextQueue.push(node.right);
      }
    }
    queue = nextQueue;
  }
  return root;
};
