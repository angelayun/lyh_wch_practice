/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var shortestSubarray = function (nums, k) {
  let n = nums.length;
  let ans = n + 1;
  // 前缀和
  let sum = new Array(n + 1).fill(0n)
  for (let i = 0; i < n; i++) {
    sum[i + 1] = sum[i] + BigInt(nums[i])
  }
  let queue = []
  for (let i = 0; i <= n; i++) {
    let curS = sum[i]
    // curS是右边的前缀和  sum[queue[0]]是左边的前缀和  如果已经满足  那就已经不能找到一个更短的  就可以弹出了
    while (queue.length && curS - sum[queue[0]] >= k) {
      ans = Math.min(ans, i - queue.shift())
    }
    // 当前前缀和比栈顶的要小  如果后续有数字x能各栈顶组成满足条件的子数组也一定能和curS组成满足条件的
    while (queue.length && sum[queue[queue.length - 1]] >= curS) {
      queue.pop()
    }
    queue.push(i)
  }
  return ans > n ? -1 : ans
};