/**
 * @param {number[]} nums
 * @return {number}
 */
var getLargestOutlier = function (nums) {
  let cnt = new Map();
  let totalSum = 0;
  for (let x of nums) {
    cnt.set(x, (cnt.get(x) || 0) + 1);
    totalSum += x;
  }
  let ans = Number.MIN_SAFE_INTEGER;
  for (let x of nums) {
    cnt.set(x, (cnt.get(x) || 0) - 1);
    let y = (totalSum - x) >> 1;
    if ((totalSum - x) % 2 == 0 && cnt.has(y)) {
      ans = Math.max(ans, x);
    }
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  return ans;
};
