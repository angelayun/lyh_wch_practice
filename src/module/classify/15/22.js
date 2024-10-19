var generateParenthesis = function (n) {
  const m = n * 2;
  const ans = [];
  const path = Array(m);
  // i=目前填了多少个括号
  // open=左括号个数，i-open=右括号个数
  function dfs(i, open) {
    if (i === n * 2) {
      ans.push(path.join(""));
      return;
    }
    if (open < n) { // 可以填左括号
      path[i] = '(';
      dfs(i + 1, open + 1);
    }
    if (i - open < open) { // 可以填右括号
      path[i] = ')';
      dfs(i + 1, open);
    }
  }
  dfs(0, 0);
  return ans;
};


var generateParenthesis = function (n) {
  const ans = [];
  const path = [];
  // balance = 左括号个数 - 右括号个数
  function dfs(i, balance) {
    if (path.length === n) {
      let s = Array(n * 2).fill(')');
      for (const j of path) s[j] = '(';
      ans.push(s.join(""));
      return;
    }
    // 可以填 0 到 balance 个右括号
    for (let close = 0; close <= balance; close++) { // 填 close 个右括号
      path.push(i + close); // 填 1 个左括号
      dfs(i + close + 1, balance - close + 1);
      path.pop();
    }
  }
  dfs(0, 0);
  return ans;
};