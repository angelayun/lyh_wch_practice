/**
 * @param {number[]} nums
 * @return {number}
 */
var continuousSubarrays = function (nums) {
  let ans = 0;
  let cnt = new Map();
  const n = nums.length;
  for (let left = 0, right = 0; right < n; right++) {
    cnt.set(nums[right], (cnt.get(nums[right]) || 0) + 1);
    while (left < right && true) {
      let mx = nums[right],
        mn = nums[right];
      for (let k of cnt.keys()) {
        mx = Math.max(k, mx);
        mn = Math.min(k, mn);
      }
      if (mx - mn <= 2) {
        break;
      }
      let y = nums[left++];
      cnt.set(y, cnt.get(y) - 1);
      if (cnt.get(y) == 0) cnt.delete(y);
    }
    ans += right - left + 1;
  }
  return ans;
};
export default continuousSubarrays