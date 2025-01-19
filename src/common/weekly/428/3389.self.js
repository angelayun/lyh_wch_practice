/**
 * @param {string} s
 * @return {number}
 */
var makeStringGood = function (s) {
  let cnt = new Array(26).fill(0);
  for (let x of s) {
    cnt[x.charCodeAt() - 'a'.charCodeAt()]++;
  }
  let maxVal = Math.max(...cnt);
  // 把s中的所有都删除掉
  let ans = s.length;
  let dp = new Array(27).fill(0);
  for (let target = 1; target <= maxVal; target++) {
    dp[25] = Math.min(cnt[25], Math.abs(cnt[25] - target));
    for (let i = 24; i >= 0; i--) {
      let x = cnt[i],
        y = cnt[i + 1];
      // 单独操作
      dp[i] = dp[i + 1] + Math.min(x, Math.abs(x - target));
      if (y < target) {
        //合起来操作
        if (x < target) {
          dp[i] = Math.min(dp[i], dp[i + 2] + Math.max(x, target - y));
        } else {
          dp[i] = Math.min(dp[i], dp[i + 2] + Math.max(x - target, target - y));
        }
      }
    }
    ans = Math.min(ans, dp[0]);
  }
  return ans;
};
