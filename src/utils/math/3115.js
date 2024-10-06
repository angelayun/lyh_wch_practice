const isPrime = (target) => {
  for (let i = 2; i * i <= target; i++) {
    if (target % i == 0) return false
  }
  // 这里得>=2
  return target >= 2
}
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumPrimeDifference = function (nums) {
  // 求的是下标的最大距离
  let i = 0
  while (i < nums.length) {
    if (!isPrime(nums[i])) i++
    else break
  }
  let j = nums.length - 1
  while (j >= 0) {
    if (!isPrime(nums[j])) j--
    else {
      return j - i
    }
  }
  return 0
};