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
  xor ^= n - 1;
  xor ^= n - 2;
  // 现在oxr里面包含的是这俩重复的数字
  let lowBit = xor & -xor;
  let res = [0, 0];
  // n = nums.length - 2;
  for (let i = 0; i < n; i++) {
    let x = nums[i];
    res[lowBit & x ? 1 : 0] ^= x;
    if (i < n - 2) {
      res[lowBit & i ? 1 : 0] ^= i;
    }
  }
  return res;
};
