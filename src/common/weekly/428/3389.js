/**
 * @param {string} s
 * @return {number}
 */
var makeStringGood = function (s) {
  let cnt = new Array(26).fill(0);
  for (let x of s) {
    cnt[x.charCodeAt() - 'a'.charCodeAt()]++;
  }
  let m = Math.max(...cnt);
  // target=0时的答案  相当于把这些都删除掉
  let ans = s.length;
  let dp = new Array(27).fill(0);
  for (let target = 1; target <= m; target++) {
    dp[25] = Math.min(cnt[25], Math.abs(cnt[25] - target));
    for (let i = 24; i >= 0; i--) {
      let x = cnt[i],
        y = cnt[i + 1];
      // 单独操作x （也就是变成target或0）
      dp[i] = dp[i + 1] + Math.min(x, Math.abs(x - target));
      // x变成target或0 y变成target
      if (y < target) {
        // 只有当 y 需要变大时，才去执行第三种操作
        if (x > target) {
          // 只有当 y 需要变大时，才去执行第三种操作
          dp[i] = Math.min(dp[i], dp[i + 2] + Math.max(x - target, target - y));
        } else {
          // 只有当 y 需要变大时，才去执行第三种操作
          dp[i] = Math.min(dp[i], dp[i + 2] + Math.max(x, target - y));
        }
      }
    }
    ans = Math.min(ans, dp[0]);
  }
  return ans;
};
