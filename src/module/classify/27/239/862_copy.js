/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var shortestSubarray = function (nums, k) {
  // 首页 nums中的数据有正有负
  const n = nums.length;
  let preSum = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    preSum[i + 1] += preSum[i] + nums[i];
  }
  let queue = [];
  let ans = n + 1;
  for (let i = 0; i <= n; i++) {
    // i是右端点  队首是左端点  满足条件了就统计（如果preSum[i+1]比preSum[i]大 最短的依旧是i-队首  如果preSum[i+1]比preSum[i]小 可能就不满足条件了  及时去掉无用数据）
    while (queue.length && preSum[i] - preSum[queue[0]] >= k) {
      ans = Math.min(ans, i - queue.shift());
    }
    // 入队列前  preSum[i]比preSum[queue[queue.length - 1]]小  如果后续x能和preSum[queue[queue.length - 1]]组成一个符合条件的  那么肯定也能和preSum[i]组成符合条件的且更短
    while (queue.length && preSum[i] < preSum[queue[queue.length - 1]]) {
      queue.pop();
    }
    queue.push(i);
  }
  return ans > n ? -1 : ans;
};