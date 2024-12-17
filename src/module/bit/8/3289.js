// 未优化的代码
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getSneakyNumbers = function (nums) {
  let xor = 0;
  for (let i = 0; i < nums.length; i++) {
    xor ^= nums[i];
  }
  let n = nums.length - 2;
  for (let i = 0; i < n; i++) {
    xor ^= i;
  }
  // 现在oxr里面包含的是这俩重复的数字
  let lowBit = xor & -xor;
  let res = [0, 0];

  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    res[lowBit & x ? 1 : 0] ^= x;
  }
  for (let i = 0; i < n; i++) {
    res[lowBit & i ? 1 : 0] ^= i;
  }
  return res;
};
// 优化之后的代码
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getSneakyNumbers = function (nums) {
  let xor = 0;
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    xor ^= i ^ nums[i];
  }
  // 多出来的两个索引位置  把它俩移出去
  xor ^= n - 1;
  xor ^= n - 2;
  // 现在oxr里面包含的是这俩重复的数字
  let lowBit = xor & -xor;
  let res = [0, 0];
  for (let i = 0; i < n; i++) {
    let x = nums[i];
    res[lowBit & x ? 1 : 0] ^= x;
    if (i < n - 2) {
      res[lowBit & i ? 1 : 0] ^= i;
    }
  }
  return res;
};
