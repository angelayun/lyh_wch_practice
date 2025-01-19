/**
 * @param {number[]} nums
 * @return {number}
 */
var getLargestOutlier = function (nums) {
  let total = nums.reduce((a, b) => a + b);
  let cnt = new Map();
  for (let x of nums) {
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  let ans = -Infinity;
  for (let x of nums) {
    cnt.set(x, (cnt.get(x) || 0) - 1);
    let y = (total - x) >> 1;
    if ((total - x) % 2 == 0 && cnt.get(y) > 0) {
      ans = Math.max(ans, x);
    }
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  // console.log(ans)
  // return 0
  return ans;
};
