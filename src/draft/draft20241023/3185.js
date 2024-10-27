/**
 * @param {number[]} hours
 * @return {number}
 */
var countCompleteDayPairs = function (hours) {
  const MOD = 24
  let cnt = new Array(MOD).fill(0)
  let ans = 0
  for (let x of hours) {
    ans += cnt[(MOD - x % MOD) % MOD]
    cnt[x % MOD]++
  }
  return ans
};