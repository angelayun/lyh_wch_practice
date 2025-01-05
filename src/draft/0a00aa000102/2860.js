/**
 * @param {number[]} nums
 * @return {number}
 */
var countWays = function (nums) {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  let ans = nums[0] > 0 ? 1 : 0;
  for (let i = 0; i < n; i++) {
    let count = i + 1;
    if (count > nums[i] && count < nums[i + 1]) ans++;
  }
  return ans + 1;
};
