/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function (c) {
  let left = 0,
    right = Math.ceil(Math.sqrt(c));
  while (left <= right) {
    let cur = left * left + right * right;
    if (cur == c) return true;
    else if (cur > c) right--;
    else left++;
  }
  return false;
};
