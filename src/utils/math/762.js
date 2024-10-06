const isPrime = (n) => {
  for (let i = 2; i * i <= n; i++) {
    if (n % i == 0) return false
  }
  return n > 1
}
const bitCount = (n) => {
  let count = 0
  while (n) {
    n &= n - 1
    count++
  }
  return count
}
/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var countPrimeSetBits = function (left, right) {
  let res = 0
  for (let i = left; i <= right; i++) {
    let bit = bitCount(i)
    if (isPrime(bit)) {
      res++
    }
  }
  return res
};