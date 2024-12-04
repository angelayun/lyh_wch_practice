/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function (nums) {
  const dfs = (left, right) => {
    if (left > right) return null;
    let maxIndex = left;
    for (let j = left + 1; j <= right; j++) {
      if (nums[j] > nums[maxIndex]) {
        maxIndex = j;
      }
    }
    // let maxIndex = Math.max(...nums.slice(left, right + 1));
    let leftNode = dfs(left, maxIndex - 1);
    let rightNode = dfs(maxIndex + 1, right);
    return new TreeNode(nums[maxIndex], leftNode, rightNode);
  };
  return dfs(0, nums.length - 1);
};
