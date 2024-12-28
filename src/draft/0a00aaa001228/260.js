/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function (nums) {
  let xor = 0;
  for (let x of nums) {
    xor ^= x;
  }
  let lowBit = xor & -xor;
  let ans = [0, 0];
  for (let x of nums) {
    ans[x & lowBit] ^= x;
  }
  return ans;
};
