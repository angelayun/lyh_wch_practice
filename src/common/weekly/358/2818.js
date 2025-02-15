const MOD = Math.pow(10, 9) + 7;
const MX = Math.pow(10, 5) + 1;
// 初始化 omega 数组
let omega = new Array(MX).fill(0);

// 预处理 omega
for (let i = 2; i < MX; i++) {
  // 如果 omega[i] 为 0，说明 i 是质数
  if (omega[i] === 0) {
    // 遍历 i 的倍数
    for (let j = i; j < MX; j += i) {
      // i 是 j 的一个质因子，omega[j] 加 1
      omega[j]++;
    }
  }
}
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumScore = function (nums, k) {
  // 获取 nums 数组的长度
  let n = nums.length;
  // 初始化 left 数组，用于存储质数分数 >= omega[nums[i]] 的左侧最近元素下标
  let left = new Array(n).fill(-1);
  // 初始化 right 数组，用于存储质数分数 >  omega[nums[i]] 的右侧最近元素下标
  let right = new Array(n).fill(n);
  // 初始化栈，用于辅助计算 left 和 right 数组
  let st = [];

  // 遍历 nums 数组
  for (let i = 0; i < n; i++) {
    let v = nums[i];
    // 当栈不为空且栈顶元素对应的 nums 值的质数分数小于当前元素的质数分数时
    while (st.length > 0 && omega[nums[st[st.length - 1]]] < omega[v]) {
      // 弹出栈顶元素，并更新其右侧最近元素下标
      right[st.pop()] = i;
    }
    // 如果栈不为空，更新当前元素的左侧最近元素下标
    if (st.length > 0) left[i] = st[st.length - 1];
    // 将当前元素的下标压入栈中
    st.push(i);
  }

  // 初始化最终结果为 1
  let ans = 1;
  // 对 (索引, 值, 左侧最近元素下标, 右侧最近元素下标) 组成的数组进行排序，按值从大到小排序
  let combined = [];
  for (let i = 0; i < n; i++) {
    combined.push([i, nums[i], left[i], right[i]]);
  }
  combined.sort((a, b) => b[1] - a[1]);

  // 遍历排序后的数组
  for (let [i, v, l, r] of combined) {
    // 计算当前元素可以进行操作的总次数
    let tot = (i - l) * (r - i);
    // 如果总操作次数大于等于剩余操作次数 k
    if (tot >= k) {
      // 计算 v 的 k 次幂对 MOD 取模的结果，并更新最终结果
      ans = ((ans * Math.pow(v, k)) % MOD) % MOD;
      break;
    }
    // 计算 v 的 tot 次幂对 MOD 取模的结果，并更新最终结果
    ans = ((ans * Math.pow(v, tot)) % MOD) % MOD;
    // 更新剩余操作次数
    k -= tot;
  }
  // 返回最终结果
  return ans;
};
