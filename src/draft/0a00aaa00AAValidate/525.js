/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function (nums) {
  let res = 0;
  // 前缀和0出现在-1
  let cnt = new Map([[0, -1]]);
  let preSum = 0;
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    preSum += x == 1 ? 1 : -1;
    if (cnt.has(preSum)) {
      res = Math.max(res, i - cnt.get(preSum));
    } else {
      cnt.set(preSum, i);
    }
  }
  console.log(nums);
  return res;
};
