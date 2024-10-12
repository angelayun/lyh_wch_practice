/**
 * @param {number[]} nums
 * @param {number[]} andValues
 * @return {number}
 */
var minimumValueSum = function (nums, andValues) {
  // 这个题目掌握递归函数的返回值  如果是非法需要剪枝的情况  则返回无穷大值
  const n = nums.length, m = andValues.length
  let memo = Array.from({ length: m * n }, () => new Map())
  // 题目说明了需要划分成m段 并且每一段的值要恰好等于andValues对应的值
  // 当前位置是i 已经划分了j份  当前这一段是and值是and
  const dfs = (i, j, and) => {
    // 不够划分，及时剪枝
    if (n - i < m - j) return Infinity
    if (j == m) {
      // 刚刚还在纠结这里如果是合格的话  返回的是啥 这里返回0 是因为题目说明了  正确的划分的值为andValues[i]
      return i == n ? 0 : Infinity
    }
    // 递归的终止条件判断完之后  就应该走记忆化搜索缓存值逻辑  这是通用套路
    let maskKey = i * m + j;
    if (memo[maskKey].has(and)) return memo[maskKey].get(and)
    and &= nums[i]
    // 举例来说  已经划分了0段，那么当前and值应该跟andValues[0]比较   这个是利用&的性质进行的剪枝
    if (and < andValues[j]) return Infinity
    // 这里是直接不划分
    let res = dfs(i + 1, j, and)
    if (and == andValues[j]) {
      res = Math.min(res, dfs(i + 1, j + 1, -1) + nums[i])
    }
    memo[maskKey].set(and, res)
    return res;
  }
  let ans = dfs(0, 0, -1)
  return ans == Infinity ? -1 : ans
};