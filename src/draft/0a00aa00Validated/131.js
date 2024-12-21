const isPalindrome = (s, left, right) => {
  while (left < right) {
    if (s[left++] != s[right--]) return false;
  }
  return true;
};
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  let res = [];
  const n = s.length;
  let path = [];
  const dfs = (i, start) => {
    if (i == n) {
      res.push(path.slice());
      return;
    }
    // 不选 i 和 i+1 之间的逗号（i=n-1 时一定要选）
    if (i < n - 1) dfs(i + 1, start);
    if (isPalindrome(s, start, i)) {
      // 当前这个点作为结束位置
      path.push(s.slice(start, i + 1));
      dfs(i + 1, i + 1);
      path.pop();
    }
  };
  dfs(0, 0, []);
  return res;
};
