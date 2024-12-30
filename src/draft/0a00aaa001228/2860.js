/**
 * @param {number[]} nums
 * @return {number}
 */
var countWays = function (nums) {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  // 都不选
  let ans = nums[0] > 0 ? 1 : 0;
  for (let i = 0; i < n; i++) {
    // 选中的人数
    let count = i + 1;
    if (count > nums[i] && count < nums[i + 1]) {
      // 左边都是被选中的 右边的都是没被选中的
      ans++;
    }
  }
  // 0 <= nums[i] < nums.length  题目说明了这个  那么都选的话是明显满足条件的
  return ans + 1;
};
