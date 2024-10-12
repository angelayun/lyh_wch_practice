/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, k) {
  let cnt = new Map()
  // 统计 num1中的因子
  for (let x of nums1) {
    if (x % k) continue
    x /= k
    for (let d = 1; d * d <= x; d++) {
      if (x % d) continue
      cnt.set(d, (cnt.get(d) || 0) + 1)
      if (d * d < x) {
        cnt.set(x / d, (cnt.get(x / d) || 0) + 1)
      }
    }
  }
  let ans = 0
  for (let x of nums2) {
    ans += cnt.get(x) || 0
  }
  return ans
};

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, k) {
  let cnt = new Map()
  // 统计 num1中的因子
  for (let x of nums1) {
    if (x % k) continue
    x /= k
    for (let d = 1; d * d <= x; d++) {
      if (x % d) continue
      cnt.set(d, (cnt.get(d) || 0) + 1)
      if (d * d < x) {
        cnt.set(x / d, (cnt.get(x / d) || 0) + 1)
      }
    }
  }
  let ans = 0
  for (let x of nums2) {
    ans += cnt.get(x) || 0
  }
  return ans
};

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, k) {
  let cnt1 = new Map()
  for (let x of nums1) {
    if (x % k) continue
    cnt1.set(x / k, (cnt1.get(x / k) || 0) + 1)
  }
  let cnt2 = new Map()
  for (let x of nums2) {
    cnt2.set(x, (cnt2.get(x) || 0) + 1)
  }
  let max = Math.max(...Array.from(cnt1.keys()))
  let ans = 0
  for (let [i, c] of cnt2.entries()) {
    let s = 0;
    for (let j = i; j <= max; j += i) {
      s += cnt1.get(j) || 0
    }
    ans += s * c
  }
  return ans
};