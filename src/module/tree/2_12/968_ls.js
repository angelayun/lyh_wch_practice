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
    if (root == null) {
      return [Infinity, 0, 0];
    }
    let [lChoose, lByFa, lByChildren] = dfs(root.left);
    let [rChoose, rByFa, rByChildren] = dfs(root.right);
    // 如果当前节点选择  那左右子树随便  它们可以3个选择中选择任意最小花销的
    let choose =
      Math.min(lChoose, lByFa, lByChildren) +
      Math.min(rChoose, rByFa, rByChildren) +
      1;
    // 如果当前节点被父节点罩着的话   子节点可以选择或者被其子节点罩着
    let byFa = Math.min(lChoose, lByChildren) + Math.min(rChoose, rByChildren);
    // 如果被子节点罩着的话  要不就是右节点被罩  要不就是左节点被罩着 或者都选择不需要被罩着
    let byChildren = Math.min(
      lChoose + rChoose,
      lChoose + rByChildren,
      rChoose + lByChildren
    );
    return [choose, byFa, byChildren];
  };
  let [choose, _, byChildren] = dfs(root);
  return Math.min(choose, byChildren);
};
