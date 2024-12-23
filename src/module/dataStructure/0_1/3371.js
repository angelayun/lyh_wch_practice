/**
 * @param {number[]} nums
 * @return {number}
 */
var getLargestOutlier = function (nums) {
  let cnt = new Map();
  let total = 0;
  for (let x of nums) {
    cnt.set(x, (cnt.get(x) || 0) + 1);
    total += x;
  }
  let ans = -Infinity;
  for (let s of nums) {
    cnt.set(s, cnt.get(s) - 1);
    let x = total - 2 * s;
    if (cnt.get(x) > 0) {
      ans = Math.max(ans, x);
    }
    cnt.set(s, cnt.get(s) + 1);
  }
  return ans;
};
