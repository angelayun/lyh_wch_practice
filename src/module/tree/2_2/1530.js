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
 * @param {number} distance
 * @return {number}
 */
var countPairs = function (root, distance) {
  let pairs = 0;
  const getDistances = (node) => {
    let res = new Array();
    if (node == null) return res;
    if (node.left == node.right) {
      res.push(0);
      return res;
    }
    let leftRes = getDistances(node.left);
    let rightRes = getDistances(node.right);
    let leftSize = leftRes.length;
    let rightSize = rightRes.length;
    for (let i = 0; i < leftSize; i++) {
      let leftDist = leftRes[i] + 1;
      leftRes[i] = leftDist;
      if (leftDist <= distance) {
        res.push(leftDist);
      }
    }
  };
  return pairs;
};
// TODO 待做
