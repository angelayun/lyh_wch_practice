/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxResult = function (nums, k) {
  const n = nums.length
  let queue = new Array(n)
  let f = new Array(n).fill(0)
  let rear = 0, tail = 0;
  f[0] = nums[0]
  queue[tail++] = 0
  for (let i = 1; i < n; i++) {
    while (queue[rear] < i - k) {
      rear++
    }
    f[i] = f[queue[rear]] + nums[i]
    while (rear < tail && f[queue[tail - 1]] < f[i]) {
      tail--
    }
    queue[tail++] = i
  }
  return f[n - 1]
};


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxResult = function (nums, k) {
  const n = nums.length
  let queue = new Array(n)
  let rear = 0, tail = 0;
  queue[tail++] = 0
  for (let i = 1; i < n; i++) {
    while (queue[rear] < i - k) {
      rear++
    }
    nums[i] += f[queue[rear]]
    while (rear < tail && nums[queue[tail - 1]] < nums[i]) {
      tail--
    }
    queue[tail++] = i
  }
  return nums[n - 1]
};