/**
 * @param {number} lowLimit
 * @param {number} highLimit
 * @return {number}
 */
var countBalls = function (lowLimit, highLimit) {
  let cnt = new Map();
  let maxCount = 0;
  for (let i = lowLimit; i <= highLimit; i++) {
    let sum = 0,
      x = i;
    while (x) {
      sum += x % 10;
      x = ~~(x / 10);
    }
    // console.log(i, sum)
    cnt.set(sum, (cnt.get(sum) || 0) + 1);
    maxCount = Math.max(maxCount, cnt.get(sum) ?? 0);
  }
  // console.log(cnt)
  // console.log(maxCount)
  return maxCount;
  // return 0
};
