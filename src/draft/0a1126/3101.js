/**
 * @param {number[]} nums
 * @return {number}
 */
var countAlternatingSubarrays = function (nums) {
  let ans = 0;
  let cnt = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    if (i > 0 && nums[i - 1] == nums[i]) {
      cnt = 0;
    }
    cnt++;
    ans += cnt;
  }
  return ans;
};
