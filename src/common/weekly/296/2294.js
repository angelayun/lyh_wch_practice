/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var partitionArray = function (nums, k) {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  let ans = 1,
    min = nums[0];
  for (let [i, num] of nums.entries()) {
    if (num - min > k) {
      ans++;
      min = num;
    }
  }
  return ans;
};
