const isPalindrome = (s, left, right) => {
  while (left < right) {
    if (s[left] == s[right]) {
      left++
      right--
    } else {
      return false
    }
  }
  return true
}
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  // 选和不选  在i和i+1之间选和不选逗号的思路  
  const n = s.length
  let path = []
  let ans = []
  const dfs = (i, start) => {
    if (i == n) {
      return ans.push(path.slice())
    }

    if (i < n - 1) {
      // 不选
      dfs(i + 1, start)
    }
    if (isPalindrome(s, start, i)) {
      path.push(s.slice(start, i + 1))
      dfs(i + 1, i + 1)
      path.pop()
    }
  }
  dfs(0, 0)
  return ans
};

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  // 枚举 选哪个
  const n = s.length
  let path = []
  let ans = []
  const dfs = (i) => {
    if (i == n) {
      return ans.push(path.slice())
    }
    for (let j = i; j < n; j++) {
      if (isPalindrome(s, i, j)) {
        path.push(s.slice(i, j + 1))
        dfs(j + 1)
        path.pop()
      }
    }
  }
  dfs(0)
  return ans
};