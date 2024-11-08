const MOD = BigInt(Math.pow(10, 9) + 7);
const N = 10000;
const f = new Array(N + 1).fill(0n);
const g = new Array(N + 1).fill(0n);
f[0] = g[0] = 1n;
f[1] = g[1] = 1n;
f[2] = g[2] = 2n;
f[3] = g[3] = 4n;
for (let i = 4; i <= N; i++) {
  f[i] = (f[i - 1] + f[i - 2] + f[i - 3]) % MOD;
  g[i] = (g[i - 1] + g[i - 2] + g[i - 3] + g[i - 4]) % MOD;
}
/**
 * @param {string} pressedKeys
 * @return {number}
 */
var countTexts = function (pressedKeys) {
  // 空字符串也是一种方案
  let ans = 1n;
  const n = pressedKeys.length;
  let cnt = 0;
  for (let i = 0; i < n; i++) {
    cnt++;
    if (i == n - 1 || pressedKeys[i] != pressedKeys[i + 1]) {
      // 到了一个分界点
      if (pressedKeys[i] == '7' || pressedKeys[i] == '9') {
        ans *= g[cnt];
      } else {
        ans *= f[cnt];
      }
      ans %= MOD;
      cnt = 0;
    }
  }
  return Number(ans % MOD);
};

export default countTexts