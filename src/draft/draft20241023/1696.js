var maxResult = function (nums, k) {
  const n = nums.length;
  const f = Array(n);
  f[0] = nums[0];
  const queue = Array(n);
  let rear = 0, tail = 0;
  // [rear,tail) 左闭右开区间
  queue[tail++] = 0;
  for (let i = 1; i < n; i++) {
    // 1. 出  最多能跳到i-k(也就是最多能跳k步)  不在这个范围内的就出队首
    if (queue[rear] < i - k) {
      rear++;
    }
    // 2. 转移
    f[i] = f[queue[rear]] + nums[i];
    // 3. 入  当前值比除尾部的值还要大  队尾值就没有存在的必要了  头大尾小 单调递减的队列
    while (rear < tail && f[i] >= f[queue[tail - 1]]) {
      tail--;
    }
    // 入队列的是索引
    queue[tail++] = i;
  }
  return f[n - 1];
};