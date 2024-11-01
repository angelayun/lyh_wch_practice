/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let ans = [];
  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i - 1] == nums[i]) continue; // 去重
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
    if (nums[i] + nums[n - 1] + nums[n - 2] + nums[n - 3] < target) continue;
    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j - 1] == nums[j]) continue;
      if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) break;
      if (nums[i] + nums[j] + nums[n - 2] + nums[n - 1] < target) continue;
      let left = j + 1,
        right = n - 1;
      while (left < right) {
        let sum = nums[i] + nums[j] + nums[left] + nums[right];
        if (sum == target) {
          ans.push([nums[i], nums[j], nums[left], nums[right]]);
          left++;
          while (left < right && nums[left - 1] == nums[left]) left++;
          right--;
          while (left < right && nums[right + 1] == nums[right]) right--;
        } else if (sum < target) {
          left++;
        } else {
          right--;
        }
      }
    }
  }
  return ans;
};
