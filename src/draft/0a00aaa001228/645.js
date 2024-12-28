/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
  const n = nums.length;
  let xor = 0;
  for (let i = 0; i < n; i++) {
    console.log(nums[i], i + 1);
    xor ^= nums[i] ^ (i + 1);
  }
  let ans = [0, 0];
  let lowBit = xor & -xor;
  for (let i = 0; i < n; i++) {
    let x = nums[i];
    ans[x & lowBit ? 1 : 0] ^= x;
    x = i + 1;
    ans[x & lowBit ? 1 : 0] ^= x;
  }
  for (let i = 0; i < n; i++) {
    if (ans[1] == nums[i]) {
      [ans[0],ans[1]]=[ans[1],ans[0]]
    }
  }
  return ans;
};
