/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getSneakyNumbers = function (nums) {
  let xor = 0;
  for (let i = 0; i < nums.length; i++) {
    xor ^= i ^ nums[i];
  }
  let n = nums.length - 2;
  xor ^= n;
  xor ^= n + 1;
  console.log(xor);
  // 现在oxr里面包含的是这俩重复的数字
  let lowBit = xor & -xor;
  console.log(lowBit);
  let res = [0, 0];
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    if (i < n) {
      ans[(i >> shift) & 1] ^= i;
    }
    res[lowBit & x ? 1 : 0] ^= x;
  }
  return res;
};
