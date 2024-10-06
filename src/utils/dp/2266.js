const MOD = 1_000_000_007
const MX = 100_001 // 题目给出的数据范围
let f = new Array(MX).fill(0n)
let g = new Array(MX).fill(0n)
f[0] = g[0] = 1n
f[1] = g[1] = 1n
f[2] = g[2] = 2n
f[3] = g[3] = 4n
for (let i = 4; i < MX; i++) {
  f[i] = (f[i - 1] + f[i - 2] + f[i - 3]) % MOD
  g[i] = (g[i - 1] + g[i - 2] + g[i - 3] + g[i - 4]) % MOD

}
/**
 * @param {string} pressedKeys
 * @return {number}
 */
var countTexts = function (s) {
  let ans = 1n
  let cnt = 0
  for (let i = 0; i < s.length; i++) {
    let c = s[i]
    cnt++
    if (i == s.length - 1 || c != s[i + 1]) {
      ans = ans * (c != '7' && c != '9' ? f[cnt] : g[cnt]) % BigInt(MOD)
      cnt = 0
    }
  }
  return Number(ans)
};