/**
 * @param {number[]} nums
 * @return {number}
 */
var getLargestOutlier = function (nums) {
  let cnt = new Map();
  let target = 0;
  for (let x of nums) {
    cnt.set(x, (cnt.get(x) || 0) + 1);
    target += x;
  }
  let ans = -Infinity;
  for (let s of nums) {
    cnt.set(s, cnt.get(s) - 1);
    let x = target - 2 * s;
    if (cnt.has(x)) {
      ans = Math.max(ans, x);
    }
    cnt.set(s, cnt.get(s) + 1);
  }
  return ans;
};
