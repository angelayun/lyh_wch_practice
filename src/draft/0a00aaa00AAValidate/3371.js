/**
 * @param {number[]} nums
 * @return {number}
 */
var getLargestOutlier = function (nums) {
  // x+2y=total
  const cnt = new Map();
  let total = 0;
  for (let x of nums) {
    cnt.set(x, (cnt.get(x) || 0) + 1);
    total += x;
  }
  let ans = -Infinity;
  for (let y of nums) {
    cnt.set(y, cnt.get(y) - 1);
    let x = total - 2 * y;
    if (cnt.get(x) > 0) {
      ans = Math.max(ans, x);
    }
    cnt.set(y, cnt.get(y) + 1);
  }
  return ans;
};
