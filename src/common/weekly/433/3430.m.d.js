/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minMaxSubarraySum = function (nums, k) {
  const sumSubarrayMins = (nums, k) => {
    const n = nums.length;
    // 左边界 left[i] 为左侧严格小于 nums[i] 的最近元素位置（不存在时为 -1）
    const left = new Array(n).fill(-1);
    // 右边界 right[i] 为右侧小于等于 nums[i] 的最近元素位置（不存在时为 n）
    const right = new Array(n).fill(n);
    const st = [-1]; // 哨兵，方便赋值 left
    for (let i = 0; i < n; i++) {
      while (st.length > 1 && nums[i] <= nums[st[st.length - 1]]) {
        right[st.pop()] = i; // i 是栈顶的右边界
      }
      left[i] = st[st.length - 1];
      st.push(i);
    }
    let res = 0;
    for (let i = 0; i < n; i++) {
      const x = nums[i];
      let l = left[i];
      let r = right[i];
      if (r - l - 1 <= k) {
        const cnt = (i - l) * (r - i);
        res += x * cnt; // 累加贡献
      } else {
        l = Math.max(l, i - k);
        r = Math.min(r, i + k);
        // 左端点 > r-k 的子数组个数
        const cnt = (r - i) * (i - (r - k));
        // 左端点 <= r-k 的子数组个数
        const cnt2 = ((l + r + k - i * 2 + 1) * (r - l - k)) / 2;
        res += x * (cnt + cnt2); // 累加贡献
      }
    }
    return res;
  };
  let ans = sumSubarrayMins(nums.slice(), k);
  // 所有元素取反，就可以复用同一份代码求最大值的贡献了
  for (let i = 0; i < nums.length; i++) {
    nums[i] = -nums[i];
  }
  ans -= sumSubarrayMins(nums, k);
  return ans;
};
