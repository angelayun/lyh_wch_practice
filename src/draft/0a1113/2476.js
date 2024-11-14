/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
// 返回大于等于target的最左边的索引位置
const lowerBound = (nums, target) => {
  let left = 0,
    right = nums.length;
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
  const nums = [];
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.left);
    nums.push(root.val);
    dfs(root.right);
  };
  dfs(root);
  const n = nums.length;
  let ans = [];
  for (let target of queries) {
    let j = lowerBound(nums, target);
    // 如果j在有效范围内的话 所指向的值一定是大于等于target的最小值
    let max = j < n ? nums[j] : -1;
    // 如果j走到最末尾  代表前面的是是小于target的  或者当前 nums[j]是大于  那得向前移一格  刚好是小于target的
    if (j == n && nums[j] != target) {
      j--;
    }
    let min = j > 0 ? nums[j] : -1;
    ans.push([min, max]);
  }
  return ans;
};
