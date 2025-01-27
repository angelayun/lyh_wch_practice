// 快速幂模板
function pow(x, n, mod) {
  x = BigInt(x);
  n = BigInt(n);
  mod = BigInt(mod);
  let res = 1n;
  while (n) {
    if (n % 2n) {
      res = (res * x) % mod;
    }
    x = (x * x) % mod;
    n = n >> 1n;
  }
  return res;
}
/**
 * @param {number} n
 * @return {number}
 */
var monkeyMove = function (n) {
  const MOD = 1e9 + 7;
  return (Number(pow(2, n, MOD)) - 2 + MOD) % MOD;
};
