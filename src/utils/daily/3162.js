var numberOfPairs = function (nums1, nums2, k) {
  const cnt = new Map();
  for (let x of nums1) {
    if (x % k) {
      continue;
    }
    x /= k;
    for (let d = 1; d * d <= x; d++) { // 枚举因子
      if (x % d) {
        continue;
      }
      cnt.set(d, (cnt.get(d) || 0) + 1); // 统计因子
      if (d * d < x) {
        cnt.set(x / d, (cnt.get(x / d) ?? 0) + 1); // 因子总是成对出现
      }
    }
  }

  let ans = 0;
  for (const x of nums2) {
    ans += cnt.get(x) ?? 0;
  }
  return ans;
};
// 上面是灵神的第一种实现方式 
const numberOfPairs = function (nums1, nums2, k) {
  const cnt1 = new Map();
  let u = 0;
  for (const x of nums1) {
    if (x % k === 0) {
      u = Math.max(u, x / k);
      cnt1.set(x / k, (cnt1.get(x / k) ?? 0) + 1);
    }
  }
  if (u === 0) {
    return 0;
  }

  const cnt2 = new Map();
  for (const x of nums2) {
    cnt2.set(x, (cnt2.get(x) ?? 0) + 1);
  }

  let ans = 0;
  for (const [x, cnt] of cnt2.entries()) {
    let s = 0;
    for (let y = x; y <= u; y += x) { // 枚举 x 的倍数
      s += cnt1.get(y) ?? 0;
    }
    ans += s * cnt;
  }
  return ans;
}
// 这是灵神的第二种实现方式