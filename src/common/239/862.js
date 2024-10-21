/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var shortestSubarray = function (nums, k) {
  let n = nums.length;
  let ans = n + 1;
  let sum = new Array(n + 1).fill(0n)
  for (let i = 0; i < n; i++) {
    sum[i + 1] = sum[i] + BigInt(nums[i])
  }
  let queue = []
  for (let i = 0; i <= n; i++) {
    let curS = sum[i]
    while (queue.length && curS - sum[queue[0]] >= k) {
      ans = Math.min(ans, i - queue.shift())
    }
    while (queue.length && sum[queue[queue.length - 1]] >= curS) {
      queue.pop()
    }
    queue.push(i)
  }
  return ans > n ? -1 : ans
};