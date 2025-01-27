/**
 * @param {string} s
 * @return {number}
 */
var makeStringGood = function (s) {
  let cnt = new Array(26).fill(0);
  let maxVal = 0;
  for (let x of s) {
    let index = x.charCodeAt() - 'a'.charCodeAt();
    cnt[index]++;
    maxVal = Math.max(maxVal, cnt[index]);
  }
  // 将
  let ans = s.length;
  let dp = new Array(27).fill(0);
  for (let target = 1; target <= maxVal; target++) {
    // 自己全被删除   或者自己变成target
    dp[25] = Math.min(cnt[25], Math.abs(cnt[25] - target));
    for (let i = target; i >= 0; i++) {
      let x = cnt[i],
        y = cnt[i + 1];
      dp[i] = Math.min(x, Math.abs(x - target));
      if (y < target) {
        if (x < target) {
          dp[i] = Math.min(dp[i], dp[i + 2] + Math.max(x, target - y));
        } else {
          // x>=target
          dp[i] = Math.min(dp[i], dp[i + 2] + Math.max(x - target, target - y));
        }
      }
    }
    ans = Math.min(ans, dp[0]);
  }
  return ans;
};
