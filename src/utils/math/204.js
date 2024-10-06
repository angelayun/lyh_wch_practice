/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
  const MX = n + 1
  let isPrime = new Array(MX).fill(true)
  let prime = []
  for (let i = 2; i < n; i++) {
    if (isPrime[i]) {
      prime.push(i)
    }
    for (let p of prime) {
      if (i * p >= MX) break
      isPrime[i * p] = false
      if (i % p == 0) break
    }
  }
  return prime.length
};