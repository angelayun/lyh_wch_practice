/**
 * @param {number[]} hours
 * @return {number}
 */
var countCompleteDayPairs = function (hours) {
  let cnt = new Array(12).fill(0)
  let ans = 0
  const MOD = 24
  for (let x of hours) {
    ans += cnt[(MOD - x % MOD) % MOD]
    cnt[x % MOD]++
  }
  return ans
};