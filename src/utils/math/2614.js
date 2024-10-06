const isPrime = (n) => {
  for (let i = 2; i * i <= n; i++) {
    if (n % i == 0) return false
  }
  return n > 1
}
/**
 * @param {number[][]} nums
 * @return {number}
 */
var diagonalPrime = function (nums) {
  let rows = nums.length, cols = nums[0].length
  let max = Number.MIN_SAFE_INTEGER
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i == j || (j == rows - i - 1)) {
        if (isPrime(nums[i][j])) {
          max = Math.max(max, nums[i][j])
        }
      }
    }
  }
  return max == Number.MIN_SAFE_INTEGER ? 0 : max
};