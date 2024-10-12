/**
 * @param {number[]} nums
 * @param {number[]} andValues
 * @return {number}
 */
var minimumValueSum = function (nums, andValues) {
  const n = nums.length;
  const m = andValues.length;
  const memo = Array.from({ length: n * m }, () => new Map());
  const dfs = (i, j, and) => {
    // 当前位置是i 已经划分了j段了  最后一段and的值
    if (n - i < m - j) {
      // 个数不足的情况
      return Infinity;
    }
    if (j == m) {
      // 到末尾了
      return i == n ? 0 : Infinity;
    }
    // 之前是否计算过
    let maskKey = i * m + j;
    if (memo[maskKey].has(and)) return memo[maskKey].get(and);
    // 先把当前值加到and中
    and &= nums[i];
    // 如果值比对应的值要小  不是正确的划分  剪枝
    if (and < andValues[j]) return Infinity;
    // 不划分
    let res = dfs(i + 1, j, and);
    if (and == andValues[j]) {
      // 在等于对应值的情况下  划分    数组的 值 等于该数组的 最后一个 元素
      res = Math.min(res, dfs(i + 1, j + 1, -1) + nums[i]);
    }
    memo[maskKey].set(and, res);
    return res;
  };
  let ans = dfs(0, 0, -1);
  return ans < Infinity ? ans : -1;
};