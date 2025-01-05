/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
  const n = nums.length;
  let maxVal = Math.max(...nums);
  let winCnt = 0;
  let ans = 0;
  for (let left = 0, right = 0; right < n; right++) {
    winCnt += nums[right] == maxVal ? 1 : 0;
    while (winCnt > k) {
      winCnt -= nums[left++] == maxVal ? 1 : 0;
    }
    ans += left;
  }
  return ans;
};
