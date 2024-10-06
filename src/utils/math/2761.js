/**
 * @param {number} n
 * @return {number[][]}
 */
var findPrimePairs = function (n) {
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
  let res = []
  for (let x of prime) {
    let y = n - x
    if (y < x) break
    if (isPrime[y]) {
      res.push([x, y])
    }
  }
  return res
};