var countGoodStrings = function (low, high, zero, one) {
  const MOD = 1_000_000_007;
  const memo = Array(high + 1).fill(-1); // -1 表示没有计算过
  function dfs(i) {
    if (i < 0) {
      return 0;
    }
    if (i === 0) {
      return 1;
    }
    if (memo[i] !== -1) {
      // 之前计算过
      return memo[i];
    }
    return (memo[i] = (dfs(i - zero) + dfs(i - one)) % MOD);
  }
  let ans = 0;
  for (let i = low; i <= high; i++) {
    ans = (ans + dfs(i)) % MOD;
  }
  return ans;
};

var countGoodStrings = function (low, high, zero, one) {
  const MOD = 1_000_000_007;
  const f = Array(high + 1).fill(0); // f[i] 表示构造长为 i 的字符串的方案数
  f[0] = 1; // 构造空串的方案数为 1
  let ans = 0;
  for (let i = 1; i <= high; i++) {
    if (i >= zero) f[i] = f[i - zero];
    if (i >= one) f[i] = (f[i] + f[i - one]) % MOD;
    if (i >= low) ans = (ans + f[i]) % MOD;
  }
  return ans;
};
var countGoodStrings = function (low, high, zero, one) {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const g = gcd(zero, one);
  low = Math.ceil(low / g);
  high = Math.floor(high / g);
  zero /= g;
  one /= g;

  const MOD = 1_000_000_007;
  const f = Array(high + 1).fill(0); // f[i] 表示构造长为 i 的字符串的方案数
  f[0] = 1; // 构造空串的方案数为 1
  let ans = 0;
  for (let i = 1; i <= high; i++) {
    if (i >= zero) f[i] = f[i - zero];
    if (i >= one) f[i] = (f[i] + f[i - one]) % MOD;
    if (i >= low) ans = (ans + f[i]) % MOD;
  }
  return ans;
};
