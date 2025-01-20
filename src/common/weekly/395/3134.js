var medianOfUniquenessArray = function (nums) {
  const n = nums.length;
  const k = Math.floor(((n * (n + 1)) / 2 + 1) / 2);

  function check(upper) {
    const freq = new Map();
    let cnt = 0,
      l = 0;
    for (let r = 0; r < n; r++) {
      freq.set(nums[r], (freq.get(nums[r]) ?? 0) + 1); // 移入右端点
      while (freq.size > upper) {
        // 窗口内元素过多
        const out = nums[l++];
        const f = freq.get(out) - 1;
        if (f === 0) {
          freq.delete(out); // 移出左端点
        } else {
          freq.set(out, f);
        }
      }
      cnt += r - l + 1; // 右端点固定为 r 时，有 r-l+1 个合法左端点
      if (cnt >= k) {
        return true;
      }
    }
    return false;
  }

  let left = 0,
    right = n;
  while (left + 1 < right) {
    const mid = Math.floor((left + right) / 2);
    if (check(mid)) {
      right = mid;
    } else {
      left = mid;
    }
  }
  return right;
};
