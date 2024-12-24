/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function (nums) {
  let cnt = {};
  let res = 0;
  for (let x of nums) {
    let v = cnt[x] ?? 0;
    res += v;
    cnt[x] = v + 1;
  }
  return res;
};
