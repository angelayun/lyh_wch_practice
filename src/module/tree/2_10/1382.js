/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var balanceBST = function (root) {
  let nums = [];
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.left);
    nums.push(root.val);
    dfs(root.right);
  };
  dfs(root);
  const build = (left, right) => {
    if (left > right) return null;
    let mid = left + ((right - left) >> 1);
    let leftNode = build(left, mid - 1);
    let rightNode = build(mid + 1, right);
    return new TreeNode(nums[mid], leftNode, rightNode);
  };
  return build(0, nums.length - 1);
};
