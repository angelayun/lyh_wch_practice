let lowerBound = (nums, target) => {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = left + right;
    // TODO
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
};
