/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxDistinctElements = function (nums, k) {
  nums.sort((a, b) => a - b);
  let ans = 0;
  // 每个人左边的人的位置
  let pre = -Infinity;
  for (let x of nums) {
    // 当前这个人的位置只能在[x-k,x+k] 但是不能移到上一个人的位置上去了
    x = Math.min(Math.max(x - k, pre + 1), x + k);
    if (x > pre) {
      // 新的一个位置
      ans++;
      pre = x;
    }
  }
  return ans;
};
