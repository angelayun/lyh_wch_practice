/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {number[]}
 */
var getAllElements = function (root1, root2) {
  // 陈易的写法
  let allElements = new Array();
  let stack1 = [],
    stack2 = [];
  let node1 = root1,
    node2 = root2;
  while ((stack1.length || node1 != null) && (stack2.length || node2 != null)) {
    while (node1 != null) {
      stack1.push(node1);
      node1 = node1.left;
    }
    while (node2 != null) {
      stack2.push(node2);
      node2 = node2.left;
    }
    let next1 = stack1[stack1.length - 1],
      next2 = stack2[stack2.length - 1];
    if (next1.val <= next2.val) {
      allElements.push(next1.val);
      stack1.pop();
      node1 = node1.right;
    } else {
      allElements.push(next2.val);
      stack2.pop();
      node2 = next2.right;
    }
  }
};
