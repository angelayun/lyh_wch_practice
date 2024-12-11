/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  let left = 1,
    right = x;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (mid * mid < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left * left > x ? left - 1 : left;
};
