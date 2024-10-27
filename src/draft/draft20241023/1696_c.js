/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxResult = function (nums, k) {
  const n = nums.length
  let queue = new Array(n)
  // let f = new Array(n).fill(0)
  let rear = 0, tail = 0;
  // f[0] = nums[0]
  // 放0放到队列当中
  queue[tail++] = 0
  for (let i = 1; i < n; i++) {
    // 队首出队列
    while (queue[rear] < i - k) {
      rear++
    }
    // f[i] = f[queue[rear]] + nums[i]
    nums[i] += nums[queue[rear]]
    // while (tail > rear && f[queue[tail - 1]] <= f[i]) {
    while (tail > rear && nums[queue[tail - 1]] <= nums[i]) {
      tail--
    }
    queue[tail++] = i
  }
  // return f[n - 1]
  return nums[n - 1]
};