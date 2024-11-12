/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countFairPairs = function (nums, lower, upper) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let cnt = 0;
  let left = n,
    right = n;
  for (let j = 0; j < n; j++) {
    let y = nums[j];
    while (right > 0 && nums[right - 1] > upper - y) {
      right--;
    }
    while (left > 0 && nums[left - 1] >= lower - y) {
      left--;
    }
    // 所以这里的(left,right]
    cnt += Math.min(right, j - 1) - Math.min(left, j - 1);
  }
  return cnt;
};
