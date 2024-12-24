/**
 * @param {number[]} nums
 * @return {number}
 */
var getLargestOutlier = function (nums) {
  // x+2y=total
  let cnt = new Map();
  let total = 0;
  for (let x of nums) {
    total += x;
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  let res = -Infinity;
  for (let y of nums) {
    cnt.set(y, (cnt.get(y) || 0) - 1);
    let x = total - 2 * y;
    if (cnt.get(x)) {
      res = Math.max(res, cnt.get(x));
    }
    cnt.set(y, (cnt.get(y) || 0) + 1);
  }
  return res;
};
