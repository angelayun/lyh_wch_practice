/**
 * @param {number[]} nums
 * @return {number}
 */
var maxIncreasingSubarrays = function (nums) {
  let ans = 0;
  let preCnt = 0;
  let cnt = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    cnt++;
    if (i == n - 1 || nums[i] >= nums[i + 1]) {
      // 如果当前是最后一个元素 或者当前元素到了一个非递增的转换点
      ans = Math.max(ans, Math.max(~~(cnt / 2), Math.min(preCnt, cnt)));
      preCnt = cnt;
      cnt = 0;
    }
  }
  return ans;
};
