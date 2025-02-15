/**
 * @param {number[]} nums
 * @param {number[]} target
 * @return {number}
 */
var minimumOperations = function (nums, target) {
  // 差分数组
  let s = target[0] - nums[0];
  let ans = Math.abs(s);
  for (let i = 1; i < nums.length; i++) {
    // 当前元素的操作次数
    let d = target[i] - target[i - 1] - (nums[i] - nums[i - 1]);
    if (d > 0) {
      ans += s >= 0 ? d : Math.max(d + s, 0);
    } else {
      ans -= s <= 0 ? d : Math.min(d + s, 0);
    }
    s += d;
  }
  return ans;
};
