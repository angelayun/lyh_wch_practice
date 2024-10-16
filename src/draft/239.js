var maxSlidingWindow = function (nums, k) {
  const n = nums.length;
  let ans = []
  let queue = []
  for (let i = 0; i < n; i++) {
    while (queue.length && nums[queue[queue.length - 1]] <= nums[i]) {
      queue.pop()
    }
    queue.push(i)
    if (i - queue[0] >= k) {
      queue.shift()
    }
    if (i >= k - 1) {
      ans.push(nums[queue[0]])
    }
  }
  return ans

};
// 在入队时  如果队首有比自己小的 就直接弹出  保证了是一个单调递减的 队首是最大的元素
// 保证窗口范围只有k个元素  如果有多于k个元素 则把队首移除
// 记录答案