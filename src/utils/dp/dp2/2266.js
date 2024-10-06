const MOD = 10 ** 9 + 7
const MX = 10 ** 5 + 1
let f = new Array(MX).fill(0n)
let g = new Array(MX).fill(0n)
f[0] = g[0] = 1n
f[1] = g[1] = 1n
f[2] = g[2] = 2n
f[3] = g[3] = 4n
for (let i = 4; i < MX; i++) {
  f[i] = (f[i - 1] + f[i - 2] + f[i - 3]) % BigInt(MOD)
  g[i] = (g[i - 1] + g[i - 2] + g[i - 3] + g[i - 4]) % BigInt(MOD)
}
/**
 * @param {string} pressedKeys
 * @return {number}
 */
var countTexts = function (pressedKeys) {
  let count = 0
  let res = 1n
  for (let i = 0; i < pressedKeys.length; i++) {
    count++
    if (i == pressedKeys.length - 1 || pressedKeys[i + 1] != pressedKeys[i]) {
      // 到了分界点了
      let c = pressedKeys[i]
      res *= BigInt((c == '7' || c == '9' ? g[count] : f[count]) % BigInt(MOD))
      res %= MOD
      count = 0
    }
  }
  return res % MOD
};