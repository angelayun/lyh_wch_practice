/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (digits.length == 0) return []
  let mapping = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
  let ans = []
  const dfs = (i, path) => {
    if (i == n) {
      return ans.push(path.slice())
    }
    // 以示例1来举例 i如果是0 digits[0]=2  应该在abc里面枚举
    for (let c of mapping[digits[i]]) {
      path.push(c)
      dfs(i + 1, path)
      path.pop()
    }
  }
  dfs(0, [])
  return ans
};