const MX = 10 ** 6 + 1
let isPrime = new Array(MX).fill(true)
let primes = []
/* for (let i = 2; i < MX; i++) {
  if (isPrime[i]) {
    primes.push(i)
    for (let j = i * i; j < MX; j += i) {
      isPrime[j] = false
    }
  }
} */
for (let i = 2; i < MX; i++) {
  if (isPrime[i]) primes.push(i)
  for (let p of primes) {
    if (i * p >= MX) break
    isPrime[i * p] = false
    if (i % p == 0) break
  }
}
primes.push(Infinity)
const lowerBound = (nums, target) => {
  let left = 0, right = nums.length - 1
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    if (nums[mid] < target) left = mid + 1
    else right = mid - 1
  }
  return left
}
/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var closestPrimes = function (left, right) {
  let i = lowerBound(primes, left)
  let p = -1, q = -1
  while (primes[i + 1] <= right) {
    if (q < 0 || (primes[i + 1] - primes[i] < q - p)) {
      p = primes[i]
      q = primes[i + 1]
    }
    i++
  }
  return [p, q]
};