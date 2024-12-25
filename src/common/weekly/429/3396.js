/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
  const n = nums.length;
  let vis = new Set();
  for (let i = n - 1; i >= 0; i--) {
    let x = nums[i];
    if (vis.has(x)) {
      return Math.ceil((i + 1) / 3);
    }
    vis.add(x);
  }
  // 一直都没有重复的  直接就不用操作了
  return 0;
};
