const gcd = (a, b) => {
  while (b != 0) {
    [a, b] = [b, a % b]
  }
  return a
}
const lcm = (a, b) => {
  return a * b / gcd(a, b)
}
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarrayLCM = function (nums, k) {
  let n = nums.length
  let ans = 0
  for (let i = 0; i < n; i++) {
    let mult = 1
    for (let j = i; j < n && k % mult == 0; j++) {
      mult = lcm(mult, nums[j])
      if (mult == k) ans++
    }
  }
  return ans
};