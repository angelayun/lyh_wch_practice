/**
 * @param {number[]} nums
 * @return {boolean}
 */
var hasTrailingZeros = function (nums) {
  // 至少有两个元素是偶数
  let cnt = 0;
  for (let x of nums) {
    if ((x & 1) == 0) {
      cnt++;
      if (cnt >= 2) return true;
    }
  }
  return false;
};
