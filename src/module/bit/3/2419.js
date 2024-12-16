/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function (nums) {
  let max = 0,
    cnt = 0;
  let res = 0;
  // 一次遍历的方式
  for (let x of nums) {
    if (x > max) {
      max = x;
      cnt = 1;
      res = 1;
    } else if (x == max) {
      cnt++;
    } else {
      cnt = 0;
    }
    res = Math.max(res, cnt);
  }
  return res;
};
