const MX = 1000
// 这个是哨兵节点  为了下面-1的时候不会越界
let primes = [0]
let isPrime = new Array(MX).fill(true)
for (let i = 2; i < MX; i++) {
  if (isPrime[i]) {
    primes.push(i)
    for (let j = i * i; j < MX; j += i) {
      isPrime[j] = false
    }
  }
}
let lowerBound = (nums, target) => {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    if (nums[mid] < target) left = mid + 1
    else right = mid - 1
  }
  return left
}
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var primeSubOperation = function (nums) {
  let j = lowerBound(primes, nums[0]) - 1
  // 贪心的减去比它小的最大质数
  let pre = nums[0] - primes[j]
  for (let i = 1; i < nums.length; i++) {
    let x = nums[i]
    // 当前数比已经贪心减去后的值还小 
    if (x <= pre) return false
    // x-p>pre 也就是说p<x-pre
    j = lowerBound(primes, x - pre) - 1
    pre = x - primes[j]
  }
  return true
};