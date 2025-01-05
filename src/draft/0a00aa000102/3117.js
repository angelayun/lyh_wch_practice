/**
 * @param {number[]} nums
 * @param {number[]} andValues
 * @return {number}
 */
var minimumValueSum = function (nums, andValues) {
  const n = nums.length;
  const m = andValues.length;
  let memo = Array.from({ length: n * m }, () => new Map());
  const dfs = (i, j, and) => {
    // 不够分
    if (n - i < m - j) return Infinity;
    if (j == m) {
      return i == n ? 0 : Infinity;
    }
    let memoKey = i * m + j;
    if (memo[memoKey].has(and)) {
      return memo[memoKey].get(and);
    }
    and &= nums[i];
    // 提前剪枝
    if (and < andValues[j]) return Infinity;
    let res = dfs(i + 1, j, and);
    if (and == andValues[j]) {
      res = Math.min(res, dfs(i + 1, j + 1, -1) + nums[i]);
    }
    memo[memoKey].set(and, res);
    return res;
  };
  let res = dfs(0, 0, -1);
  return res == Infinity ? -1 : res;
};
