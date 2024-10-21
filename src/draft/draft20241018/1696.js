/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxResult = function (nums, k) {
  const n = nums.length
  let memo = new Map()
  const dfs = (i) => {
    if (i == 0) return nums[0]
    if (memo.has(i)) return memo.get(i)
    let mx = Number.MIN_SAFE_INTEGER
    for (let j = Math.max(i - k, 0); j < i; j++) {
      mx = Math.max(mx, dfs(j))
    }
    let res = mx + nums[i]
    memo.set(i, res)
    return res
  }
  return dfs(n - 1)
};
