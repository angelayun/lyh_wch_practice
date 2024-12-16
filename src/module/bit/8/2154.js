/**
 * @param {number[]} nums
 * @param {number} original
 * @return {number}
 */
var findFinalValue = function (nums, original) {
  let cnt = new Set(nums);
  while (cnt.has(original)) {
    original <<= 1;
  }
  return original;
};
/**
 * @param {number[]} nums
 * @param {number} original
 * @return {number}
 */
var findFinalValue = function (nums, original) {
  let cnt = new Map();
  for (let i = original; i <= 1000; i += original) {
    cnt.set(i, 1);
  }
  for (let x of nums) {
    if (cnt.has(x)) cnt.set(x, 2);
  }
  while (cnt.get(original) == 2) {
    original <<= 1;
  }
  return original;
};

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
        // 是original的1 2 4 8 16...倍的话
        mask |= k;
        // mask的二进制是全为1的值
      }
    }
  }
  mask = ~mask;
  original *= mask & -mask;
  return original;
};
// 灵神的3个题解我都分别写了下
