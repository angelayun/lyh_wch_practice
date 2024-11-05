/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const n = nums.length
  // 枚举选哪个
  let ans = []
  const dfs = (i, path) => {
    ans.push(path.slice())
    for (let j = i; j < n; j++) {
      path.push(nums[j])
      dfs(j + 1, path)
      path.pop()
    }
  }
  dfs(0, [])
  return ans
};