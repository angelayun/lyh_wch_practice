/**
 * @param {number[]} nums
 * @return {number}
 */
var returnToBoundaryCount = function (nums) {
  let cnt = 0;
  let s = 0;
  for (let x of nums) {
    s += x;
    if (s == 0) cnt++;
  }
  return cnt;
};
