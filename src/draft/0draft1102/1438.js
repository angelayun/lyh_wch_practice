/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var longestSubarray = function (nums, limit) {
  const n = nums.length;
  let ans = [];
  let queueMax = [],
    queueMin = [];
  for (let left = 0, right = 0; right < n; right++) {
    // queueMax 是一个单调递减的队列  队首是最大值
    while (queueMax.length && queueMax[queueMax.length - 1] < nums[right]) {
      queueMax.pop();
    }
    // 队首是最小值
    while (queueMin.length && queueMin[queueMin.length - 1] > nums[right]) {
      queueMin.pop();
    }
    queueMax.push(nums[right]);
    queueMin.push(nums[right]);
    while (
      queueMax.length &&
      queueMin.length &&
      queueMax[0] - queueMin[0] > limit
    ) {
      if (queueMax[0] == nums[left]) {
        queueMax.shift();
      }
      if (queueMin[0] == nums[left]) {
        queueMin.shift();
      }
      left++;
    }
    ans = Math.max(ans, right - left + 1);
  }
  return ans;
};
