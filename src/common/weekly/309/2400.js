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
