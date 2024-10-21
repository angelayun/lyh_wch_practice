var smallestRangeI = function (nums, k) {
  const mn = Math.min(...nums);
  const mx = Math.max(...nums);
  // 把最大的数-k 最小的数+k  
  // [mn + k, mx - k]    mx-k - mn-k
  return Math.max(mx - mn - 2 * k, 0);
};