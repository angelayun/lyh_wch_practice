/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const n = nums.length
  let ans = []
  const visited = new Array(n).fill(false)
  let path = new Array(n).fill(0)
  const dfs = (i) => {
    if (i == n) {
      return ans.push(path.slice())
    }
    for (let [j, on] of visited.entries()) {
      if (!on) {
        path[i] = nums[j]
        visited[j] = true
        dfs(i + 1)
        visited[j] = false
      }
    }
  }
  dfs(0)
  return ans
};