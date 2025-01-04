/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function (nums) {
  let cnt = new Map();
  let ans = 0;
  for (let x of ans) {
    ans += cnt.get(x) ?? 0;
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  return ans;
};
