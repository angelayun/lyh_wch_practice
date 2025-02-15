const isPrime = (n) => {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) return false;
  }
  return true;
};
/**
 * @param {number[][]} mat
 * @return {number}
 */
var mostFrequentPrime = function (mat) {
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];
  const n = mat.length,
    m = mat[0].length;
  let cnt = new Map();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      for (let [dx, dy] of directions) {
        let x = i + dx,
          y = j + dy;
        let val = mat[i][j];
        while (x >= 0 && y >= 0 && x < n && y < m) {
          val = val * 10 + mat[x][y];
          if (cnt.has(val) || isPrime(val)) {
            cnt.set(val, (cnt.get(val) || 0) + 1);
          }
          x += dx;
          y += dy;
        }
      }
    }
  }
  console.log(cnt);
  let maxVal = 0,
    maxFreq = 0;
  for (let [val, feq] of cnt) {
    if (feq > maxFreq || (feq == maxFreq && val > maxVal)) {
      maxVal = val;
      maxFreq = feq;
    }
  }
  return maxFreq;
};
