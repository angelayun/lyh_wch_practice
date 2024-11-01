/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let ans = [];
  for (let i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i - 1] == nums[i]) continue; // 去重
    if (nums[i] + nums[i + 1] + nums[i + 2] > 0) break;
    if (nums[i] + nums[n - 1] + nums[n - 2] < 0) continue;
    let x = nums[i];
    let left = i + 1,
      right = n - 1;
    while (left < right) {
      let sum = x + nums[left] + nums[right];
      if (sum == 0) {
        ans.push([x, nums[left], nums[right]]);
        // 只需要在这里去重
        left++;
        while (left < right && nums[left - 1] == nums[left]) left++;
        right--;
        while (left < right && nums[right + 1] == nums[right]) right--;
      } else if (sum > 0) {
        right--;
      } else {
        left++;
      }
    }
  }
  return ans;
};
