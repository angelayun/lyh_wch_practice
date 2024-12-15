/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function (nums) {
  // res里面存在的是那两个只出现1次的元素的异或和
  let xor = nums.reduce((pre, cur) => pre ^ cur);
  // 分两组
  let lowBit = xor & -xor;
  let res = [0, 0];
  for (let x of nums) {
    res[(x & lowBit) ? 1 : 0] ^= x;
  }
  return res;
};