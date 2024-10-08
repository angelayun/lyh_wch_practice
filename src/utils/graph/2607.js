const gcd = (a, b) => {
  while (b != 0) {
    [a, b] = [b, a % b]
  }
  return a
}
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var makeSubKSumEqual = function (arr, k) {
  let n = arr.length
  let k = gcd(k, n)
  let ans = 0n
  for (let i = 0; i < k; i++) {
    let b = []
    for (let j = i; j < n; j += k) {
      b.push(a[j])
    }
    b.sort((a1, b1) => a1 - b1)
    let mid = b[Math.floor(b.length / 2)]
    for (let x of b) {
      ans += BigInt(Math.abs(x - mid))
    }
  }
  return ans
};