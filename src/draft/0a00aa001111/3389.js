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
  let dp = new Array(27).fill(0);
  let ans = s.length;
  for (let target = 1; target <= maxVal; target++) {
    dp[25] = Math.min(cnt[25], Math.abs(cnt[25] - target));
    for (let i = 24; i >= 0; i--) {
      let x = cnt[i];
      let y = cnt[i + 1];
      dp[i] = dp[i + 1] + Math.min(x, Math.abs(x - target));
      if (y < target) {
        if (x < target) {
          dp[i] = Math.min(dp[i], dp[i + 2] + Math.max(target - y, x));
        } else {
          dp[i] = Math.min(dp[i], dp[i + 2] + Math.max(target - y, x - target));
        }
      }
    }
    ans = Math.min(ans, dp[0]);
  }
  return ans;
};
