/**
 * @param {number[]} nums
 * @return {number}
 */
var subarraySum = function (nums) {
  const n = nums.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    let start = Math.max(0, i - nums[i]);
    let sum = 0;
    for (let j = start; j <= i; j++) {
      sum += nums[j];
    }
    ans += sum;
  }
  return ans;
};
