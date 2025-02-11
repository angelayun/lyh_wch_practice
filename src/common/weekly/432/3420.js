/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countNonDecreasingSubarrays = function (nums, k) {
  const n = nums.length;
  // 初始化一个数组 g，数组的每个元素是一个空数组
  const g = new Array(n).fill(null).map(() => []);
  // 初始化 posR 数组，默认值为 n
  const posR = new Array(n).fill(n);
  // 模拟栈
  const st = [];
  for (let i = 0; i < n; i++) {
    const x = nums[i];
    // 当栈不为空且当前元素大于等于栈顶元素时
    while (st.length > 0 && x >= nums[st[st.length - 1]]) {
      posR[st.pop()] = i;
    }
    // 如果栈不为空，将当前元素的索引添加到栈顶元素对应的列表中
    if (st.length > 0) {
      g[st[st.length - 1]].push(i);
    }
    st.push(i);
  }
  let ans = 0;
  let cnt = 0;
  let l = 0; // 窗口左端点
  // 模拟单调队列
  const q = [];
  // 遍历数组，r 为窗口右端点
  for (let r = 0; r < n; r++) {
    const x = nums[r];
    // 当队列不为空且队列尾部元素小于等于当前元素时
    while (q.length > 0 && nums[q[q.length - 1]] <= x) {
      q.pop(); // 维护队列的单调性
    }
    q.push(r);
    // 由于队首到队尾单调递减，所以窗口最大值就是队首
    cnt += nums[q[0]] - x;
    // 操作次数太多，缩小窗口
    while (cnt > k) {
      const out = nums[l]; // 离开窗口的元素
      for (const i of g[l]) {
        if (i > r) {
          break;
        }
        cnt -= (out - nums[i]) * (Math.min(posR[i], r + 1) - i);
      }
      l++;
      // 队首已经离开窗口了
      if (q.length > 0 && q[0] < l) {
        q.shift();
      }
    }
    ans += r - l + 1;
  }
  return ans;
};
// TODO 到时候看下是否会有大数溢出的情况