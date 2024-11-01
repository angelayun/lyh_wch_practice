/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let minDiff = Number.MAX_SAFE_INTEGER,
    ans = 0;
  for (let i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i - 1] == nums[i]) continue; // 去重
    let sum = nums[i] + nums[i + 1] + nums[i + 2];
    if (sum > target) {
      if (sum - target < minDiff) {
        return sum;
      }
      break;
    }
    sum = nums[i] + nums[n - 1] + nums[n - 2];
    if (sum < target) {
      if (target - sum < minDiff) {
        minDiff = target - sum;
        ans = sum;
      }
      continue;
    }
    let x = nums[i];
    let left = i + 1,
      right = n - 1;
    while (left < right) {
      let sum = x + nums[left] + nums[right];
      if (sum == target) {
        return sum;
      } else if (sum > target) {
        if (sum - target < minDiff) {
          minDiff = sum - target;
          ans = sum;
        }
        right--;
        while (left < right && nums[right + 1] == nums[right]) right--;
      } else {
        if (target - sum < minDiff) {
          minDiff = target - sum;
          ans = sum;
        }
        left++;
        while (left < right && nums[left - 1] == nums[left]) left++;
      }
    }
  }
  return ans;
};
