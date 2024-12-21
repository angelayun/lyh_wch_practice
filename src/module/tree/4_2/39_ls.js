/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  let ans = [];
  let path = [];
  const dfs = (i, left) => {
    if (left == 0) {
      // 找到一个合法组合
      ans.push(path.slice());
      return;
    }
    // 剪枝
    if (i == candidates.length || left < 0) return;
    // 不选
    dfs(i + 1, left);
    // 选
    path.push(candidates[i]);
    dfs(i, left - candidates[i]);
    path.pop();
  };
  dfs(0, target);
  return ans;
};
// 上面方式的优化
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  // 把 candidates 从小到大排序，如果递归中发现 left<candidates[i]，由于后面的数字只会更大，所以无法把 left 减小到 0，可以直接返回
  candidates.sort((a, b) => a - b);
  let ans = [];
  let path = [];
  const dfs = (i, left) => {
    if (left == 0) {
      // 找到一个合法组合
      ans.push(path.slice());
      return;
    }
    // 剪枝
    if (i == candidates.length || left < candidates[i]) return;
    // 不选
    dfs(i + 1, left);
    // 选
    path.push(candidates[i]);
    dfs(i, left - candidates[i]);
    path.pop();
  };
  dfs(0, target);
  return ans;
};
// 下面是枚举的方式
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  // 把 candidates 从小到大排序，如果递归中发现 left<candidates[i]，由于后面的数字只会更大，所以无法把 left 减小到 0，可以直接返回
  candidates.sort((a, b) => a - b);
  let ans = [];
  let path = [];
  const dfs = (i, left) => {
    if (left == 0) {
      // 找到一个合法组合
      ans.push(path.slice());
      return;
    }
    // 剪枝
    if (left < candidates[i]) return;
    for (let j = i; j < candidates.length; j++) {
      path.push(candidates[j]);
      dfs(j, left - candidates[j]);
      path.pop();
    }
  };
  dfs(0, target);
  return ans;
};

// 完全背包预处理 + 可行性剪枝
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const n = candidates.length;
  let dp = Array.from({ length: n + 1 }, () =>
    new Array(target + 1).fill(false)
  );
  dp[0][0] = true;
  for (let i = 0; i < n; i++) {
    let x = candidates[i];
    for (let j = 0; j < target + 1; j++) {
      dp[i + 1][j] = dp[i][j] || (j >= x && dp[i + 1][j - x]);
    }
  }
  let ans = [];
  let path = [];
  const dfs = (i, left) => {
    if (left == 0) {
      ans.push(path.slice());
      return;
    }
    // 无用用下标在[0,i]中的数字组合出left
    if (left < 0 || !dp[i + 1][left]) return;
    // 不选
    dfs(i - 1, left);
    // 选
    path.push(candidates[i]);
    dfs(i, left - candidates[i]);
    path.pop();
  };
  dfs(n - 1, target);
  return ans;
};
