/**
 * @param {number} low
 * @param {number} high
 * @param {number} zero
 * @param {number} one
 * @return {number}
 */
var countGoodStrings = function (low, high, zero, one) {
  const dp = new Array(high + 1).fill(0);
  dp[0] = 1;
  let ans = 0;
  for (let i = 0; i < high; i++) {
    if (i > zero) {
      dp[i + 1] += dp[i + 1 - zero];
    }
    if (i > one) {
      dp[i + 1] += dp[i + 1 - one];
    }
    if (i > low) {
      // 这里还有个取模
      ans += dp[i + 1];
    }
  }
  return ans;
};
// 上面这个完全不对

/**
 * @param {number} low
 * @param {number} high
 * @param {number} zero
 * @param {number} one
 * @return {number}
 */
var countGoodStrings = function (low, high, zero, one) {
  const MOD = Math.pow(10, 9) + 7;
  const dp = new Array(high + 1).fill(0);
  // i表示字符串的长度
  dp[0] = 1;
  let ans = 0;
  for (let i = 1; i <= high; i++) {
    if (i >= zero) {
      dp[i] = dp[i - zero] % MOD;
    }
    if (i >= one) {
      dp[i] = (dp[i] + dp[i - one]) % MOD;
    }
    if (i >= low) {
      ans = (ans + dp[i]) % MOD;
    }
  }
  console.log(ans);
  return 0;
  return Number(ans);
};
// TODO 待验证
