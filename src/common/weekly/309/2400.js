/**
 * @param {number} startPos
 * @param {number} endPos
 * @param {number} k
 * @return {number}
 */
var numberOfWays = function (startPos, endPos, k) {
  let d = Math.abs(startPos - endPos);
  if (d > k || (d & 1) != (k & 1)) return 0;
  let memo = new Map();
  const MOD = 1e9 + 7;
  const dfs = (x, left) => {
    if (Math.abs(x - endPos) > left) return 0;
    // 到达终点
    if (left == 0) return 1;
    let memoKey = `${x}_${left}`;
    if (memo.has(memoKey)) return memo.get(memoKey);
    let res = (dfs(x - 1, left - 1) + dfs(x + 1, left - 1)) % MOD;
    memo.set(memoKey, res);
    return res;
  };
  return dfs(startPos, k);
};
// comb 模板
function comb(n, k) {
  n = BigInt(n);
  k = BigInt(k);
  // 当 k 大于 n 时，组合数为 0
  if (k > n) {
    return 0n;
  }
  // 当 k 为 0 或者 k 等于 n 时，组合数为 1
  if (k === 0n || k === n) {
    return 1n;
  }
  // 为了减少计算量，取 k 和 n - k 中较小的那个
  if (n - k < k) {
    k = n - k;
  }
  let result = 1n;
  for (let i = 1n; i <= k; i++) {
    result *= n - (k - i);
    result = ~~(result / i);
  }
  return result;
}
/**
 * @param {number} startPos
 * @param {number} endPos
 * @param {number} k
 * @return {number}
 */
var numberOfWays = function (startPos, endPos, k) {
  let d = Math.abs(startPos - endPos);
  if (d > k || (d & 1) != (k & 1)) return 0;

  const MOD = BigInt(1e9 + 7);
  // 向左走x步  向右走k-x步
  // x-(k-x) = d
  // 2x= d+k
  // x= (d+k)/2
  return Number(comb(k, (d + k) >> 1) % MOD);
};
