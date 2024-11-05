/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var shortestSubarray = function (nums, k) {
  const n = nums.length;
  const preSum = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    preSum[i + 1] = preSum[i] + nums[i];
  }
  let queue = [];
  let ans = n + 1;
  for (let i = 0; i <= n; i++) {
    while (queue.length && preSum[i] - preSum[queue[0]] >= k) {
      ans = Math.min(ans, i - queue.shift());
    }
    while (queue.length && preSum[i] < preSum[queue[queue.length - 1]]) {
      queue.pop();
    }
    queue.push(i);
  }
  return ans > n ? -1 : ans;
};
