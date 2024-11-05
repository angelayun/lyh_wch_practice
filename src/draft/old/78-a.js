/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  // 枚举选哪个的思路
  const n = nums.length
  let path = []
  let ans = []
  const dfs = (i) => {
    if (i == n) {
      return ans.push(path.slice())
    }
    // 不选
    dfs(i + 1)
    // 选
    path.push(nums[i])
    dfs(i + 1)
    path.pop()
  }
  dfs(0)
  return ans
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const n = nums.length
  let path = []
  let ans = []
  // 枚举选哪个
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