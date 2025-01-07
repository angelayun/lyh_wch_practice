/**
 * @param {number[]} nums
 * @return {number}
 */
var countCompleteSubarrays = function (nums) {
  const n = nums.length;
  let set = new Set(nums);
  let cnt = new Map();
  let ans = 0;
  for (let left = 0, right = 0; right < n; right++) {
    cnt.set(nums[right], (cnt.get(nums[right]) || 0) + 1);
    while (cnt.size >= set.size) {
      let x = nums[left];
      cnt.set(x, cnt.get(x) - 1);
      if (cnt.get(x) == 0) {
        cnt.delete(x);
      }
      left++;
    }
    ans += left;
  }
  return ans;
};
