/**
 * @param {number} n
 * @return {number}
 */
var concatenatedBinary = function (n) {
  let res = 0n;
  let shift = 0n;
  const MOD = BigInt(1e9 + 7);
  for (let i = 1n; i <= n; i++) {
    if ((i & (i - 1n)) == 0) shift++;
    res = ((res << shift) | i) % MOD;
  }
  return Number(res);
};
