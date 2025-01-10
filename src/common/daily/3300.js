/**
 * @param {number[]} nums
 * @return {number}
 */
var minElement = function (nums) {
  let minVal = Number.MAX_SAFE_INTEGER;
  for (let x of nums) {
    let cnt = 0;
    while (x) {
      cnt += x % 10;
      x = Math.floor(x / 10);
    }
    minVal = Math.min(cnt, minVal);
  }
  return minVal;
};
