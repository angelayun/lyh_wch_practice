/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarrayGCD = function (nums, k) {
  const gcd = (a, b) => {
    // b大  a小
    while (a) {
      [a, b] = [b % a, a]
    }
    return b
  }
  let ans = 0
  let a = [] // GCD 相同GCD区间的右端点
  let i0 = -1
  for (let [i, x] of nums.entries()) {
    if (x % k) {
      a = []
      i0 = i
      continue
    }
    a.push([x, i])
    // 原地去重，因为相同的GCD都相邻在一起
    j = 0
    for (let p of a) {
      p[0] = gcd(p[0], x)
      if (a[j][0] != p[0]) {
        j++
        a[j] = p
      } else {
        a[j][1] = p[1]
      }
    }
    a.length = j + 1
    if (a[0][0] == k) {
      ans += a[0][1] - i0
    }
  }
  return ans
};