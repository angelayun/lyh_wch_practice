/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const n = nums.length;
  let res = [];
  for (let i = 0; i < 1 << n; i++) {
    let subset = [];
    for (let j = 0; j < n; j++) {
      if ((i >> j) & 1) {
        subset.push(nums[j]);
      }
    }
    res.push(subset);
  }
  return res;
};
