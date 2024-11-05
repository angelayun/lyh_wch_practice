/**
 * @param {number[]} nums
 * @return {number}
 */
var duplicateNumbersXOR = function (nums) {
  let res = 0
  let mask = 0n
  for (let x of nums) {
    if (((mask >> BigInt(x) )& 1n) == 1n) {
      res ^= x;
    } else {
      mask |= (BigInt(x) << 1n)
    }
  }
  return res
};