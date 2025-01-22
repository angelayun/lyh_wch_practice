/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxFrequencyScore = function (nums, k) {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  let preSum = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    preSum[i + 1] += preSum[i] + nums[i];
  }
  const distanceSum = (left, right) => {
    // mid在右边的起始点
    let mid = left + ((right - left) >> 1);
    let leftSum = nums[mid] * (mid - left) - (preSum[mid] - preSum[left]);
    let rightSum =
      preSum[right + 1] - preSum[mid + 1] - nums[mid] * (right - mid);
    return leftSum + rightSum;
  };
  let ans = 0;
  for (let left = 0, right = 0; right < n; right++) {
    while (distanceSum(left, right) > k) {
      left++;
    }
    ans = Math.max(ans, right - left + 1);
  }
  return ans;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxFrequencyScore = function (nums, k) {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  let ans = 0;
  let s = 0;
  for (let left = 0, right = 0; right < n; right++) {
    s += nums[right] - nums[left + ((right - left) >> 1)];
    while (s > k) {
      s += nums[left] - nums[(left + right + 1) >> 1];
      left++;
    }
    ans = Math.max(ans, right - left + 1);
  }
  return ans;
};
