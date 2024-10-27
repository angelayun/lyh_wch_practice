/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxResult = function (nums, k) {
  let rear = 0, tail = 0
  const n = nums.length
  let queue = new Array(n)
  let f = new Array(n).fill(0)
  f[0] = nums[0]
  queue[tail++] = 0
  for (let i = 1; i < n; i++) {
    // 队首元素出队列
    if (queue[rear] < i - k) {
      rear++
    }
    f[i] = f[queue[rear]] + nums[i]
    while (rear < tail && f[queue[tail - 1]] < f[i]) {
      tail--
    }
    // 入队列
    queue[tail++] = i
  }
  return f[n - 1]
};