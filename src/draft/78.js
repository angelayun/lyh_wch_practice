/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const n = nums.length
  // 选或者不选的思路
  let ans = []
  const dfs = (i, path) => {
    if (i == n) {
      return ans.push(path.slice())
    }
    // 不选
    dfs(i + 1, path)
    // 选
    path.push(nums[i])
    dfs(i + 1, path)
    path.pop()
  }
  dfs(0, [])
  return ans
};
// 用枚举选哪个的思路
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const n = nums.length
  let ans = []
  let path = []
  const dfs = (i) => {
    ans.push(path.slice())
    for (let j = i; j < n; j++) {
      path.push(nums[j])
      dfs(j + 1)
      path.pop()
    }
  }
  dfs(0)
  return ans
};