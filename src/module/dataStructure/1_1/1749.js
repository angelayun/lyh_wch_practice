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
  for (const x of nums) {
    s += x;
    mx = Math.max(mx, s);
    mn = Math.min(mn, s);
  }
  return mx - mn;
};
