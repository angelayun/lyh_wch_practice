/**
 * @param {number[]} nums
 * @return {number}
 */
var minDifference = function (nums) {
  let ans = 0;
  let n = nums.length;
  // 和空位相邻的最小数字 minL 和最大数字 maxR
  let minL = Number.MAX_SAFE_INTEGER;
  let maxR = 0;
  for (let i = 0; i < n; i++) {
    if (
      nums[i] != -1 &&
      ((i > 0 && nums[i - 1] == -1) || (i < n - 1 && nums[i + 1] == -1))
    ) {
      minL = Math.min(minL, nums[i]);
      maxR = Math.max(maxR, nums[i]);
    }
  }
  const updateAns = (l, r, big, minL, maxR) => {
    let d = (Math.min(r - minL, maxR - l) + 1) >> 1;
    if (big) {
      d = Math.min(d, ~~((maxR - minL + 2) / 3)); // d 不能超过上界
    }
    ans = Math.max(ans, d);
  };
  let preI = -1;
  for (let i = 0; i < n; i++) {
    if (nums[i] == -1) {
      continue;
    }
    if (preI >= 0) {
      if (i - preI == 1) {
        ans = Math.max(ans, Math.abs(nums[i] - nums[preI]));
      } else {
        updateAns(
          Math.min(nums[preI], nums[i]),
          Math.max(nums[preI], nums[i]),
          i - preI > 2,
          minL,
          maxR
        );
      }
    } else if (i > 0) {
      updateAns(nums[i], nums[i], false, minL, maxR);
    }
    preI = i;
  }
  if (0 <= preI && preI < n - 1) {
    updateAns(nums[preI], nums[preI], false, minL, maxR);
  }
  return ans;
};
