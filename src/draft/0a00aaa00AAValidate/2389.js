let lowerBound = (nums, target) => {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (nums[mid] <= target) left = mid + 1;
    else right = mid - 1;
  }
  return left;
};
/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
var answerQueries = function (nums, queries) {
  nums.sort((a, b) => a - b);
  for (let i = 1; i < nums.length; i++) {
    nums[i] += nums[i - 1];
  }
  let res = [];
  for (let x of queries) {
    res.push(lowerBound(nums, x));
  }
  return res;
};
