const lowerBound = (nums, target) => {
  let left = 0,
    right = nums.length;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (nums[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
};
/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
var answerQueries = function (nums, queries) {
  const n = nums.length;
  const m = queries.length;
  // 从小到大排序
  nums.sort((a, b) => a - b);
  for (let i = 1; i < n; i++) {
    nums[i] += nums[i - 1];
  }
  const res = []
  for (let i = 0; i < m; i++) {
    res.push(lowerBound(nums, queries[i]));
  }
  return res;
};
