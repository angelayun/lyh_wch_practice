const pow = (x, n) => {
  let res = 1n;
  for (; n > 0n; n /= 2n) {
    if (n % 2n > 0n) {
      res = (res * x) % MOD;
    }
    x = (x * x) % MOD;
  }
  return res;
};

const MOD = BigInt(1_000_000_007);
const MX = BigInt(100_000);
let fac = new Array(MX).fill(0n); // fac[i] = i!
let invF = new Array(MX).fill(0n); // invF[i] = i!^-1
fac[0] = 1n;
for (let i = 1n; i < MX; i++) {
  fac[i] = (fac[i - 1n] * i) % MOD;
}

invF[MX - 1n] = pow(fac[MX - 1n], MOD - 2n);
for (let i = MX - 1n; i > 0n; i--) {
  invF[i - 1n] = (invF[i] * i) % MOD;
}
const comb = (n, m) => {
  return (((fac[n] * invF[m]) % MOD) * invF[n - m]) % MOD;
};
/**
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
var countGoodArrays = function (n, m, k) {
  n = BigInt(n);
  m = BigInt(m);
  k = BigInt(k);
  return Number(
    (((comb(n - 1n, k) * m) % MOD) * pow(m - 1n, n - k - 1n)) % MOD
  );
};
export default countGoodArrays;
