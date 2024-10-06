const MX = 10 ** 6 + 1
let isPrime = new Array(MX).fill(true)
// 质数列表
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
  if (isPrime[i]) {
    primes.push(i)
  }
  for (let p of primes) {
    if (i * p >= MX) break
    isPrime[i * p] = false
    // 第一个质因数
    if (i % p == 0) break
  }
}
// 为了防止越界
primes.push(Infinity)  // 这里只需要加一个就ok了

const lowerBound = (nums, target) => {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    if (nums[mid] < target) left = mid + 1
    else right = mid - 1;
  }
  return left
}
/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var closestPrimes = function (left, right) {
  let p = (q = -1);
  let i = lowerBound(primes, left);
  while (primes[i + 1] <= right) {
    if (p < 0 || primes[i + 1] - primes[i] < q - p) {
      p = primes[i];
      q = primes[i + 1];
    }
    i++;
  }
  return [p, q];
};