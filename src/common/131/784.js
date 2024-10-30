/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
  let ans = [];
  const n = s.length;
  let path = [];
  const dfs = (i) => {
    if (i == n) {
      ans.push(path.join(''));
      return;
    }
    if ((s[i] >= 'a' && s[i] <= 'z') || (s[i] >= 'A' && s[i] <= 'Z')) {
      path.push(s[i].toLowerCase());
      dfs(i + 1);
      path.pop();

      path.push(s[i].toUpperCase());
      dfs(i + 1);
      path.pop();
    } else {
      path.push(s[i]);
      dfs(i + 1);
      path.pop();
    }
  };
  dfs(0);
  return ans;
};

/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
  let ans = [];
  const n = s.length;
  const dfs = (i, path) => {
    if (i == n) {
      ans.push(path);
      return;
    }
    if ((s[i] >= 'a' && s[i] <= 'z') || (s[i] >= 'A' && s[i] <= 'Z')) {
      dfs(i + 1, path + s[i].toLowerCase());
      dfs(i + 1, path + s[i].toUpperCase());
    } else {
      dfs(i + 1, path + s[i]);
    }
  };
  dfs(0, '');
  return ans;
};

// 下面是自己题解的写法

/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
  let result = [];
  /**
   *
   * @param {*} index 开始索引
   * @param {*} path 已选择的路径
   */
  const dfs = (index, path) => {
    // 对于path而言  如果遇到是数字的话，就直接加入，忽略大小写的转换了，直到遇到字母才进入后面的递归
    // 这里要用isNaN而不能用Number.isNaN  因为用isNaN就可以不用判断到达字符串末尾了
    while (!isNaN(s[index])) path += s[index++];
    // 结束条件，如果已选择的长度达到目标路径的长度，则加入结果集中
    if (path.length == s.length) return result.push(path);
    // 递归下一个，把当前大小写都试一遍
    dfs(index + 1, path + s[index].toLowerCase());
    dfs(index + 1, path + s[index].toUpperCase());
  };
  // 从第0位开始拼凑
  dfs(0, '');
  return result;
};
