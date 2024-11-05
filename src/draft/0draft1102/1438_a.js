/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var longestSubarray = function (nums, limit) {
  const n = nums.length;
  let maxQueue = [];
  let minQueue = [];
  let ans = 0;
  // 大的前提是我在一个滑动窗口内
  for (let left = 0, right = 0; right < n; right++) {
    // 这是头大尾小的队列  放的是元素值
    while (maxQueue.length && maxQueue[maxQueue.length - 1] < nums[right]) {
      maxQueue.pop();
    }
    // 这是头小尾大的队列  放的也是元素值
    while (minQueue.length && minQueue[minQueue.length - 1] > nums[right]) {
      minQueue.pop();
    }
    maxQueue.push(nums[right]);
    minQueue.push(nums[right]);
    // 这样就方便我任一时刻比较的都是俩队列的第一个元素  一个是放的是这一时刻的最大值  一个放的是这一时刻的最小值
    while (
      maxQueue.length &&
      minQueue.length &&
      maxQueue[0] - minQueue[0] > limit
    ) {
      // 缩小窗口
      if (maxQueue[0] == nums[left]) {
        maxQueue.shift();
      }
      if (minQueue[0] == nums[left]) {
        minQueue.shift();
      }
      left++;
    }
    ans = Math.max(ans, right - left + 1);
  }
  return ans;
};
