/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
const lowerBound = (nums, target) => {
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
  // mini 是树中小于等于 queries[i] 的 最大值
  // maxi 是树中大于等于 queries[i] 的 最小值
  let arr = [];
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.left);
    arr.push(root.val);
    dfs(root.right);
  };
  dfs(root);
  const n = arr.length;
  let ans = [];
  for (let x of queries) {
    let j = lowerBound(arr, x);
    let max = j < n ? arr[j] : -1;
    if (j == n || arr[j] != x) {
      j--;
    }
    let min = j >= 0 ? arr[j] : -1;
    ans.push([min, max]);
  }
  return;
};
