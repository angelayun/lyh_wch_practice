/**
 * @param {number[]} nums
 * @return {number}
 */
var duplicateNumbersXOR = function (nums) {
  let set = new Set();
  let ans = 0;
  for (let x of nums) {
    if (set.has(x)) {
      ans ^= x;
    } else {
      set.add(x);
    }
  }
  return ans;
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var duplicateNumbersXOR = function (nums) {
  let mask = 0n;
  let ans = 0;
  for (let x of nums) {
    if ((mask >> BigInt(x)) & 1n) {
      ans ^= x;
    } else {
      mask |= 1n << BigInt(x);
    }
  }
  return ans;
};
