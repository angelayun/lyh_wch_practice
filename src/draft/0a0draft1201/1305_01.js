/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {number[]}
 */
var getAllElements = function (root1, root2) {
  let stack1 = [],
    stack2 = [];
  let res = [];
  while (root1 || stack1.length || root2 || stack2.length) {
    while (root1) {
      stack1.push(root1);
      root1 = root1.left;
    }
    while (root2) {
      stack2.push(root2);
      root2 = root2.left;
    }
    if (stack2.length == 0) {
      // 弹出statck1
      root1 = stack1.pop();
      res.push(root1.val);
      root1 = root1.right;
    } else if (stack1.length == 0) {
      // 弹出stack2
      root2 = stack2.pop();
      res.push(root2.val);
      root2 = root2.right;
    } else if (stack1[stack1.length - 1].val < stack2[stack2.length - 1].val) {
      // 弹出statck1
      root1 = stack1.pop();
      res.push(root1.val);
      root1 = root1.right;
    } else {
      // 弹出statck2
      root2 = stack2.pop();
      res.push(root2.val);
      root2 = root2.right;
    }
  }
  return res;
};
