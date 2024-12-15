/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function (nums) {
  let xor = nums.reduce((prev, cur) => prev ^ cur);
  let arr = [0, 0];
  let lowBit = xor & -xor;
  for (let x of nums) {
    arr[x & lowBit ? 1 : 0] ^= x;
  }
  return arr;
};
