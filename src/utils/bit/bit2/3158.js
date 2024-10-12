/**
 * @param {number[]} nums
 * @return {number}
 */
var duplicateNumbersXOR = function (nums) {
  let ans = 0
  let visit = new Set()
  for (let x of nums) {
    if (visit.has(x)) {
      ans ^= x;
    } else visit.add(x)
  }
  return ans
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var duplicateNumbersXOR = function (nums) {
  let ans = 0
  let visit = 0n
  for (let x of nums) {
    // (visit & (1n << BigInt(x))) == 1n  这是错的
    if ((visit >> BigInt(x)) & 1n) {
      ans ^= x;
    } else {
      visit |= (1n << BigInt(x))
    }
  }
  return ans
};