/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function (nums, k) {
  let res = nums.reduce((pre, cur) => pre ^ cur)
  const bitLen = (n) => {
    let count = 0
    while (n) {
      n &= n - 1
      count++
    }
    return count
  }
  return bitLen(res ^ k)
};