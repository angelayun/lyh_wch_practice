/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  const dfs = (left, right) => {
    if (left > right) return null;
    let mid = left + ((right - left) >> 1);
    let leftNode = dfs(left, mid - 1);
    let rightNode = dfs(mid + 1, right);
    return new TreeNode(nums[mid], leftNode, rightNode);
  };
  return dfs(0, nums.length - 1);
};
