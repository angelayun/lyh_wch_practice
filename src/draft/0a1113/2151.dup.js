/**
 * @param {number[][]} statements
 * @return {number}
 */
var maximumGood = function (statements) {
  const n = statements.length;
  const check = (subset) => {
    let cnt = 0;
    for (let j = 0; j < n; j++) {
      if ((subset >> j) & 1) {
        let row = statements[j];
        for (let k = 0; k < n; k++) {
          if (row[k] < 2 && row[k] != ((subset >> k) & 1)) {
            return 0;
          }
        }
        cnt++;
      }
    }
    return cnt;
  };
  let maxCnt = 0;
  for (let subset = 1; subset < 1 << n; subset++) {
    maxCnt = Math.max(maxCnt, check(subset));
  }
  return maxCnt;
};
