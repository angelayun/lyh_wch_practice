const gcd = (a, b) => {
  // b大  a小
  while (a) {
    [a, b] = [b % a, a]
  }
  return b
}
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarrayGCD = function (nums, k) {
  const n = nums.length
  let ans = 0
  for (let i = 0; i < n; i++) {
    if (nums[i] % k) continue
    // 从i开始往后扩展子数组
    let g = 0
    for (let j = i; j < n; j++) {
      g = gcd(g, nums[j])
      if (g == k) {
        ans++
      }
    }
  }
  return ans
};