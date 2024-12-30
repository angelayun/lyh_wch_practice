/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumUniqueSubarray = function (nums) {
  let set = new Set();
  let maxSum = 0;
  const n = nums.length;
  let winSum = 0;
  for (let left = 0, right = 0; right < n; right++) {
    while (set.has(nums[right])) {
      winSum -= nums[left];
      set.delete(nums[left]);
      left++;
    }
    winSum += nums[right];
    set.add(nums[right]);
    maxSum = Math.max(maxSum,winSum)
  }
  return maxSum
};
