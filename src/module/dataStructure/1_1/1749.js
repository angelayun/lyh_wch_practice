var maxAbsoluteSum = function (nums) {
  let ans = 0,
    fMax = 0,
    fMin = 0;
  // 这是用dp的思路
  for (const x of nums) {
    fMax = Math.max(fMax, 0) + x;
    fMin = Math.min(fMin, 0) + x;
    ans = Math.max(ans, fMax, -fMin);
  }
  return ans;
};
// 下面是用前缀和的思路
var maxAbsoluteSum = function (nums) {
  let s = 0,
    mx = 0,
    mn = 0;
  /* 由于子数组和等于两个前缀和的差，那么取前缀和中的最大值与最小值，它俩的差就是答案。

    如果最大值在最小值右边，那么算的是最大子数组和。
    
    如果最大值在最小值左边，那么算的是最小子数组和的绝对值（相反数）。 */
  for (const x of nums) {
    s += x;
    mx = Math.max(mx, s);
    mn = Math.min(mn, s);
  }
  return mx - mn;
};
