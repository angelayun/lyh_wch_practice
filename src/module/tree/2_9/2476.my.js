// 返回第一个大于等于target的索引
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
  let arr = [];
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.left);
    arr.push(root.val);
    dfs(root.right);
  };
  dfs(root);
  let ans = [];
  const n = arr.length;
  for (let x of queries) {
    let j = lowerBound(arr, x);
    // max是大于等于x的最小值
    let max = j < n ? arr[j] : -1;
    if (j == n || arr[j] != x) {
      // 比方说上一个数是大于x 
      j--;
    }
    // min是小于等于x的最大值
    let min = j >= 0 ? arr[j] : -1;
    ans.push([min, max]);
  }
  return ans;
};
