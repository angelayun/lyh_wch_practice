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
 */
var FindElements = function (root) {
  let arr = [];
  const dfs = (root, val) => {
    if (root == null) return;
    arr.push(val);
    dfs(root.left, val * 2);
    dfs(root.right, val * 2 + 1);
  };
  dfs(root, 1);
  // console.log(arr)
  this.arr = arr;
};

/**
 * @param {number} target
 * @return {boolean}
 */
FindElements.prototype.find = function (target) {
  return this.arr.includes(target + 1);
};

/**
 * Your FindElements object will be instantiated and called as such:
 * var obj = new FindElements(root)
 * var param_1 = obj.find(target)
 */
