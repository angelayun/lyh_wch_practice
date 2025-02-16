/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function (nums) {
  let res = 0,
    max = 0,
    cnt = 0;
  for (let x of nums) {
    if (x > max) {
      max = x;
      res = 1;
      cnt = 1;
    } else if (x == max) {
      cnt++;
      res = Math.max(res, cnt);
    } else {
      cnt = 0;
    }
  }
  return res;
};
