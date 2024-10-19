/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const n = nums.length
  let path = new Array(n).fill(0)
  let visited = new Array(n).fill(false)
  let ans = []
  const dfs = (i) => {
    if (i == n) {
      return ans.push(path.slice())
    }
    for (let [j, on] of visited.entries()) {
      if (!on) {
        visited[j] = true
        path[i] = nums[j]
        dfs(i + 1)
        visited[j] = false
      }
    }
  }
  dfs(0)
  return ans
};