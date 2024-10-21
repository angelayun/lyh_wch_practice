var maxResult = function (nums, k) {
  const n = nums.length;
  const f = Array(n);
  f[0] = nums[0];
  const q = Array(n);
  let rear = 0, tail = 0;
  q[tail++] = 0;
  for (let i = 1; i < n; i++) {
    // 1. 出
    if (q[rear] < i - k) {
      rear++;
    }
    // 2. 转移
    f[i] = f[q[rear]] + nums[i];
    // 3. 入
    while (rear < tail && f[i] >= f[q[tail - 1]]) {
      tail--;
    }
    q[tail++] = i;
  }
  return f[n - 1];
};







var maxResult = function (nums, k) {
  const n = nums.length;
  const q = Array(n); // 为方便起见，仍然用一个大小为 n 的数组（空间 O(k) 需要实现环形队列）
  let rear = 0, tail = 0;
  q[tail++] = 0;
  for (let i = 1; i < n; i++) {
    // 1. 出
    if (q[rear] < i - k) {
      rear++;
    }
    // 2. 转移
    nums[i] += nums[q[rear]];
    // 3. 入
    while (rear < tail && nums[i] >= nums[q[tail - 1]]) {
      tail--;
    }
    q[tail++] = i;
  }
  return nums[n - 1];
};