let lowerBound = (nums, target) => {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
};
/**
 * @param {TreeNode} root
 * @param {number[]} queries
 * @return {number[][]}
 */
var closestNodes = function (root, queries) {
  let nums = [];
  const dfs = (root) => {
    if (root == null) return null;
    dfs(root.left);
    nums.push(root.val);
    dfs(root.right);
  };
  dfs(root);
  let res = [];
  const n = nums.length;
  for (let x of queries) {
    let j = lowerBound(nums, x);
    let max = j < n ? nums[j] : -1;
    if (j == n || nums[j] != x) {
      j--;
    }
    let min = j >= 0 ? nums[j] : -1;
    res.push([min, max]);
  }
  return res;
};
