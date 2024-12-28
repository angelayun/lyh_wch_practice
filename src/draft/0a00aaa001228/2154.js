/**
 * @param {number[]} nums
 * @param {number} original
 * @return {number}
 */
var findFinalValue = function (nums, original) {
  let mask = 0;
  for (let x of nums) {
    if (x % original == 0) {
      let k = x / original;
      if ((k & (k - 1)) == 0) {
        mask |= k;
      }
    }
  }
  // 这个过不了是因为我以为mask是全为1的二进制串  但事实上mask可以为1000
  // return mask == 0 ? original : original * (1 << mask.toString(2).length);
  mask = ~mask;
  let lowBit = mask & -mask;
  return original * lowBit;
};
