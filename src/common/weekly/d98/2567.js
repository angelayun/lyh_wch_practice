/**
 * @param {number[]} nums
 * @return {number}
 */
var minimizeSum = function (nums) {
  // 求的是最大得分 + 最小得分
  // 因为可以修改两个数  所以 可以把最小值修改成最大值   这样 最小得分就是0
  nums.sort((a, b) => a - b);
  const n = nums.length;
  return Math.min(
    nums[n - 3] - nums[0],
    nums[n - 2] - nums[1],
    nums[n - 1] - nums[2]
  );
};
