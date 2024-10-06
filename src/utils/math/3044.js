const isPrime = (n) => {
  for (let i = 2; i * i <= n; i++) {
    if (n % i == 0) return false
  }
  return n > 1
}
/**
 * @param {number[][]} mat
 * @return {number}
 */
var mostFrequentPrime = function (mat) {
  let directions = [
    [1, 0],
    [1, 1],
    [1, -1]
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, 1],
    [0, -1],
  ]
  let m = mat.length, n = mat[0].length
  let cnt = new Map()
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      for (let d of directions) {
        let x = i + d[0];
        let y = j + d[1];
        let val = mat[i][j];
        while (x >= 0 && x < m && y >= 0 && y < n) {
          val = val * 10 + mat[x][y];
          if (cnt.has(val) || isPrime(val)) {
            cnt.set(val, (cnt.get(val) || 0) + 1)
          }
          x += d[0];
          y += d[1];
        }
      }
    }
  }
  console.log(cnt)
  let maxFreq = 0, maxVal = -1
  for (let [key, freq] of cnt.entries()) {
    if (freq > maxFreq || (freq == maxFreq && key > maxVal)) {
      maxFreq = freq
      maxVal = key
    }
    console.log(key, freq, maxFreq, maxVal)
  }
  return maxVal
};