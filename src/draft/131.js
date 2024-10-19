const isPalindrome = (s, left, right) => {
  // 左闭在闭区间
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
  const n = s.length
  let ans = []
  let path = []
  // start表示当前这段回文子串的开始位置
  const dfs = (i, start) => {
    if (i == n) {
      return ans.push(path.slice())
    }
    // 不选  不选 i 和 i+1 之间的逗号（i=n-1 时一定要选）
    if (i < n - 1) {
      dfs(i + 1, start)
    }
    // 选 i 和 i+1 之间的逗号（把 s[i] 作为子串的最后一个字符）
    if (isPalindrome(s, start, i)) {
      path.push(s.slice(start, i + 1))
      dfs(i + 1, i + 1) // 下一个子串从i+1开始
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
  const n = s.length
  let ans = []
  let path = []
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