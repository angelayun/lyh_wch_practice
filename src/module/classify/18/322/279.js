// 写在外面，多个测试数据之间可以共享，减少计算量
const memo = Array.from({ length: 101 }, () => Array(10001).fill(-1)); // -1 表示没有计算过

function dfs(i, j) {
  if (i === 0) {
    return j === 0 ? 0 : Infinity;
  }
  if (memo[i][j] !== -1) {
    // 之前计算过
    return memo[i][j];
  }
  if (j < i * i) {
    memo[i][j] = dfs(i - 1, j); // 只能不选
  } else {
    memo[i][j] = Math.min(dfs(i - 1, j), dfs(i, j - i * i) + 1); // 不选 vs 选
  }
  return memo[i][j];
}

const numSquares = function (n) {
  return dfs(Math.floor(Math.sqrt(n)), n);
};

// 方法二
const N = 10000;
const f = Array.from({ length: 101 }, () => Array(N + 1).fill(Infinity));
f[0][0] = 0;
for (let i = 1; i * i <= N; i++) {
  for (let j = 0; j <= N; j++) {
    if (j < i * i) {
      f[i][j] = f[i - 1][j]; // 只能不选
    } else {
      f[i][j] = Math.min(f[i - 1][j], f[i][j - i * i] + 1); // 不选 vs 选
    }
  }
}

var numSquares = function (n) {
  return f[Math.floor(Math.sqrt(n))][n]; // 也可以写 f[100][n]
};

const N = 10000;
const f = Array(N + 1).fill(Infinity);
f[0] = 0;
for (let i = 1; i * i <= N; i++) {
  for (let j = i * i; j <= N; j++) {
    f[j] = Math.min(f[j], f[j - i * i] + 1); // 不选 vs 选
  }
}

var numSquares = function (n) {
  return f[n];
};
