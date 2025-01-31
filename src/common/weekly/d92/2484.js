/**
 * @param {string} s
 * @return {number}
 */
var countPalindromes = function (s) {
  const MOD = BigInt(1e9 + 7);
  let pre = new Array(10).fill(0);
  let suf = new Array(10).fill(0);
  let pre2 = Array.from({ length: 10 }, () => new Array(10).fill(0));
  let suf2 = Array.from({ length: 10 }, () => new Array(10).fill(0));
  for (let i = s.length - 1; i >= 0; i--) {
    let d = s[i] - '0';
    for (let j = 0; j < 10; j++) {
      suf2[d][j] += suf[j];
    }
    suf[d]++;
  }
  let ans = 0n;
  for (let d of s) {
    d -= '0';
    --suf[d];
    for (let j = 0; j < 10; j++) {
      suf2[d][j] -= suf[j];
    }
    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 10; k++) {
        ans = (ans + BigInt(pre2[j][k] * suf2[j][k])) % MOD;
      }
    }
    for (let j = 0; j < 10; j++) {
      pre2[d][j] += pre[j];
    }
    pre[d]++;
  }
  return Number(ans);
};
