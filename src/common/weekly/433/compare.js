/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minMaxSubarraySum = function (nums, k) {
  // 计算最小值的贡献
  const sumSubArrayMins = (nums, k) => {
    const n = nums.length;
    // 左边界 left[i] 为左侧严格小于 nums[i] 的最近元素位置（不存在时为 -1）
    const left = new Array(n).fill(-1);
    // 右边界 right[i] 为右侧小于等于 nums[i] 的最近元素位置（不存在时为 n）
    const right = new Array(n).fill(n);
    const st = [-1];
    for (let i = 0; i < n; i++) {
      while (st.length > 1 && nums[i] <= nums[st[st.length - 1]]) {
        right[st.pop()] = i;
      }
      // if (st.length) {
      left[i] = st[st.length - 1];
      // }
      st.push(i);
    }
    let res = 0;
    for (let i = 0; i < n; i++) {
      const x = nums[i];
      let l = left[i];
      let r = right[i];
      if (r - l - 1 <= k) {
        const cnt = (i - l) * (r - i);
        res += x * cnt;
      } else {
        l = Math.max(l, i - k);
        r = Math.max(r, i + k);
        const cnt = (r - i) * (i - (r - k));
        const cnt2 = ((l + r + k - i * 2 + 1) * (r - l - k)) >> 1;
        res += x * (cnt2 + cnt);
      }
    }
    return res;
  };
  let res = sumSubArrayMins(nums, k);
  // 所有元素取反，就可以复用同一份代码求最大值的贡献了
  nums = nums.map((v) => -v);
  console.log(nums);
  res -= sumSubArrayMins(nums, k);
  return res;
};
