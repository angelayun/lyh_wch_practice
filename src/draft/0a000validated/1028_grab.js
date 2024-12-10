/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {string} traversal
 * @return {TreeNode}
 */
var recoverFromPreorder = function (traversal) {
  let ans = new Map();
  ans.set(-1, new TreeNode(0));
  const addTree = (v, p) => {
    // p是层级  v是节点的值
    ans.set(p, new TreeNode(parseInt(v)));
    let rootNode = ans.get(p - 1);
    if (rootNode.left == null) {
      rootNode.left = ans.get(p);
    } else {
      rootNode.right = ans.get(p);
    }
  };
  let dep = 0,
    val = '';
  for (let c of traversal) {
    if (c != '-') {
      val += c;
    } else if (val) {
      addTree(val, dep);
      dep = 1;
      val = '';
    } else {
      dep++;
    }
  }
  addTree(val, dep);
  return ans.get(0);
};
