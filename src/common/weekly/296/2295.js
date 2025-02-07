/**
 * @param {number[]} nums
 * @param {number[][]} operations
 * @return {number[]}
 */
var arrayChange = function (nums, operations) {
  let mp = {};
  for (let i = operations.length - 1; i >= 0; i--) {
    let [x, y] = operations[i];
    mp[x] = mp[y] || y;
  }
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    nums[i] = mp[num] || num;
  }
  return nums;
};
