/**
 * @param {number[]} nums
 * @return {number}
 */
var longestNiceSubarray = function (nums) {
  let n = nums.length;
  let ans = 1;
  for (let right = 0; right < n; right++) {
    let or = 0;
    let left = right;
    // 这里满足条件了之后  left--已经移到了下一个位置
    for (; left >= 0 && (or & nums[left]) == 0; left--) {
      or |= nums[left];
    }
    console.log(left, right);
    ans = Math.max(right - left, ans);
  }
  return ans;
};
