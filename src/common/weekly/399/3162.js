/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, k) {
  let cnt = new Map();
  for (let x of nums1) {
    // 统计x中的因子出现的次数
    for (let d = 1; d <= Math.sqrt(x); d++) {
      if (x % d) continue;
      cnt.set(d, (cnt.get(d) || 0) + 1);
      if (d * d < x) {
        cnt.set(x / d, (cnt.get(x / d) || 0) + 1);
      }
    }
  }
  let ans = 0;
  for (let x of nums2) {
    let key = x * k;
    ans += cnt.get(key) ?? 0;
  }
  return ans;
};

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, k) {
  let cnt = new Map();
  for (let x of nums1) {
    if (x % k) continue;
    x /= k;
    // 统计x中的因子出现的次数
    for (let d = 1; d <= Math.sqrt(x); d++) {
      if (x % d) continue;
      cnt.set(d, (cnt.get(d) || 0) + 1);
      if (d * d < x) {
        cnt.set(x / d, (cnt.get(x / d) || 0) + 1);
      }
    }
  }
  let ans = 0;
  for (let x of nums2) {
    ans += cnt.get(x) ?? 0;
  }
  return ans;
};

// 站在nums2的视角上去解决问题
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, k) {
  let cnt1 = new Map();
  for (let x of nums1) {
    if (x % k) continue;
    cnt1.set(x / k, (cnt1.get(x / k) || 0) + 1);
  }
  if (cnt1.size == 0) return 0;
  let ans = 0;
  let cnt2 = new Map();
  for (let x of nums2) {
    cnt2.set(x, (cnt2.get(x) || 0) + 1);
  }
  let max = Math.max(...cnt1.keys());
  for (let [i, c] of cnt2) {
    let s = 0;
    for (let j = i; j <= max; j += i) s += cnt1.get(j) ?? 0;
    ans += s * c;
  }
  return ans;
};
