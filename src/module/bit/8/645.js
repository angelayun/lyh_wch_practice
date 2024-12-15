/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
  let orx = 0;
  for (let i = 0; i < nums.length; i++) {
    orx ^= nums[i] ^ (i + 1);
  }
  let lowBit = orx & -orx;
  let arr = [0, 0];
  for (let i = 0; i < nums.length; i++) {
    arr[nums[i] & lowBit ? 1 : 0] ^= nums[i];
    arr[(i + 1) & lowBit ? 1 : 0] ^= i + 1;
  }
  for (let x of nums) {
    if (x == arr[1]) {
      [arr[0], arr[1]] = [arr[1], arr[0]];
      break;
    }
  }
  return arr;
};
