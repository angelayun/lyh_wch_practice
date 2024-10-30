// 生成不含相邻零的二进制字符串
// 回溯的方式
var validStrings = function (n) {
  const ans = [];
  const path = Array(n);

  function dfs(i) {
    if (i === n) {
      ans.push(path.join('')); // 注意 join 需要 O(n) 时间
      return;
    }

    // 填 1
    path[i] = '1';
    dfs(i + 1);

    // 填 0
    if (i === 0 || path[i - 1] === '1') {
      path[i] = '0'; // 直接覆盖
      dfs(i + 1);
    }
  }

  dfs(0);
  return ans;
};

// 位运算的方法
var validStrings = function (n) {
  const ans = [];
  const mask = (1 << n) - 1;
  for (let x = 0; x < 1 << n; x++) {
    // 说明x 没有相邻的1
    if (((x >> 1) & x) === 0) {
      // 低n位取反  不足n长度的  头部补0
      ans.push((x ^ mask).toString(2).padStart(n, '0'));
    }
  }
  return ans;
};
