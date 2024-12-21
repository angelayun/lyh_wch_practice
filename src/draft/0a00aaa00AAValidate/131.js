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
  const n = s.length;
  let path = [];
  let res = [];
  //
  const dfs = (i) => {
    if (i == n) {
      res.push(path.slice());
      return;
    }
    for (let j = i; j < n; j++) {
      if (isPalindrome(s, i, j)) {
        path.push(s.slice(i, j + 1));
        dfs(j + 1);
        path.pop();
      }
    }
  };
  dfs(0);
  return res;
};
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const n = s.length;
  let path = [];
  let res = [];
  // 位置上的逗号是否选的视角上
  const dfs = (i, start) => {
    if (i == n) {
      res.push(path.slice());
      return;
    }
    // 不选
    if (i < n - 1) dfs(i + 1, start);
    // 选
    if (isPalindrome(s, start, i)) {
      path.push(s.slice(start, i + 1));
      dfs(i + 1, i + 1);
      path.pop();
    }
  };
  dfs(0, 0);
  return res;
};
