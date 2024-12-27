/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function (nums) {
  let cnt = new Map([[0, -1]]);
  let preSum = 0;

  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    // 把0看成-1 那么 0的数量和1的数量相同  就相当于前缀和为0
    preSum += x == 1 ? 1 : -1;
    if (cnt.has(preSum)) {
      res = Math.max(i - cnt.get(preSum), res);
    } else {
      cnt.set(preSum, i);
    }
  }
  return res;
};
