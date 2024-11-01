// 12 = 4 + 4 + 4    返回 和为 n 的完全平方数的最少数量 。
// 定义 dfs(i,j) 表示从前 i 个完全平方数中选一些数（可以重复选），满足元素和恰好等于 j，最少要选的数字个数
// 由于i^2<=n 所以i<=sqrt(n)
// 题目说明了1 <= n <= 10^4
const memo = Array.from({ length: 101 }, () => new Array(10001).fill(-1));
const dfs = (i, j) => {
  // 这里是指前i 而不是第i  所以这里是  没有数可以选了，且要得到的数等于 0
  if (i == 0) {
    return j == 0 ? 0 : Infinity;
  }
  if (memo[i][j] != -1) return memo[i][j];
  if (j < i * i) {
    return (memo[i][j] = dfs(i - 1, j));
  }
  return (memo[i][j] = Math.min(dfs(i - 1, j), dfs(i, j - i * i) + 1));
};
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  return dfs(~~Math.sqrt(n), n);
};

// 这是第二种方式  递推
const N = 10000;
let dp = Array.from({ length: 101 }, () => new Array(N + 1).fill(Infinity));
dp[0][0] = 0;
for (let i = 1; i * i <= N; i++) {
  for (let j = 0; j <= N; j++) {
    if (j < i * i) {
      dp[i][j] = dp[i - 1][j];
    } else {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - i * i] + 1);
    }
  }
}

var numSquares = function (n) {
  return dp[~~Math.sqrt(n)][n];
};

const N = 10000;
let dp = new Array(N + 1).fill(Infinity);
dp[0] = 0;
for (let i = 1; i * i <= N; i++) {
  for (let j = i * i; j <= N; j++) {
    dp[j] = Math.min(dp[j], dp[j - i * i] + 1);
  }
}

var numSquares = function (n) {
  return dp[~~Math.sqrt(n)][n];
};
