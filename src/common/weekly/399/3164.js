/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, k) {
  let cnt = new Map()
  for (let x of nums1) {
    // 枚举x的因子d
    for (let d = 1; d * d <= x; d++) {
      // d不是x的因子
      if (x % d) {
        continue
      }
      cnt.set(d, (cnt.get(d) || 0) + 1)
      if (d * d < x) {
        cnt.set(x / d, (cnt.get(x / d) || 0) + 1)
      }
    }
  }
  let ans = 0
  for (let x of nums2) {
    // 如果 nums1[i] 可以被 nums2[j] * k 整除  说明 要求nums2[j] * k的因子有多少个
    ans += cnt.get(x * k) || 0
  }
  return ans
};
// 方法1的优化
var numberOfPairs = function (nums1, nums2, k) {
  let cnt = new Map()
  for (let x of nums1) {
    // x不是k的倍数
    if (x % k) continue
    x /= k
    // 枚举x的因子d
    for (let d = 1; d * d <= x; d++) {
      // d不是x的因子
      if (x % d) {
        continue
      }
      cnt.set(d, (cnt.get(d) || 0) + 1)
      if (d * d < x) {
        cnt.set(x / d, (cnt.get(x / d) || 0) + 1)
      }
    }
  }
  let ans = 0
  for (let x of nums2) {
    // 如果 nums1[i] 可以被 nums2[j] * k 整除  说明 要求nums2[j] * k的因子有多少个
    ans += cnt.get(x) || 0
  }
  return ans
};
// 方法二  站在num2的视角去看问题
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, k) {
  let cnt1 = new Map()
  for (let x of nums1) {
    if (x % k == 0) {
      cnt1.set(x / k, (cnt1.get(x / k) || 0) + 1)
    }
  }
  if (cnt1.size == 0) return 0
  let ans = 0
  let cnt2 = new Map()
  for (let x of nums2) {
    cnt2.set(x, (cnt2.get(x) || 0) + 1)
  }
  let max = Math.max(...Array.from(cnt1.keys()))
  for (let [i, c] of cnt2.entries()) {
    let s = 0
    for (let j = i; j < max + 1; j += i) {
      s += cnt1.get(j) || 0
    }
    ans += s * c
  }
  return ans
};