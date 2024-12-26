const lowerBound = (nums, target) => {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (nums[mid] >= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
    return left;
  }
};
/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
var answerQueries = function (nums, queries) {
  const n = nums.length;
  const m = queries.length;
  nums.sort((a, b) => a - b);
  for (let i = 1; i < n; i++) {
    nums[i] += nums[i - 1];
  }
  let ans = [];
  for (let target of queries) {
    ans.push(lowerBound(nums, target));
  }
  return ans;
};
