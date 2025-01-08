/**
 * @param {number[]} nums
 * @return {number}
 */
var continuousSubarrays = function (nums) {
  let ans = 0;
  const n = nums.length;
  let preMin = new Array(n + 1).fill(Infinity);
  let preMax = new Array(n + 1).fill(-Infinity);
  for (let i = 0; i < n; i++) {
    preMin[i + 1] = Math.min(preMin[i], nums[i]);
    preMax[i + 1] = Math.max(preMax[i], nums[i]);
  }
  for (let left = 0, right = 0; right < n; right++) {
    while (left < right && Math.abs(preMax[right] - preMin[left]) > 2) {
      left++;
    }
    console.log(left, right, 1)
    ans += right - left + 1;
  }
  return ans;
};
