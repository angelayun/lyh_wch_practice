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
 * @return {number}
 */
var minCameraCover = function (root) {
  const dfs = (root) => {
    if (root == null) return [Infinity, 0, 0];
    let [lChoose, lByFather, lByChildren] = dfs(root.left);
    let [rChoose, rByFather, rByChildren] = dfs(root.right);
    let choose =
      1 +
      Math.min(lChoose, lByFather, lByChildren) +
      Math.min(rChoose, rByFather, rByChildren);
    let byFather =
      Math.min(lByChildren, lChoose) + Math.min(rByChildren, rChoose);
    let byChildren = Math.min(
      lChoose + rChoose,
      lChoose + rByChildren,
      rChoose + lByChildren
    );
    return [choose, byFather, byChildren];
  };
  let [choose, _, byChildren] = dfs(root);
  return Math.min(choose, byChildren);
};
