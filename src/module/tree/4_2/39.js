/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  let res = [];
  const n = candidates.length;
  const dfs = (i, sum, path) => {
    if (i >= n) {
      if (sum == target) {
        res.push(path.slice());
      }
      return;
    }
    // 及时剪枝
    if (sum > target) return;
    // 不选
    dfs(i + 1, sum, path);
    // 选
    path.push(candidates[i]);
    dfs(i, sum + candidates[i], path);
    path.pop();
  };
  dfs(0, 0, []);
  return res;
};

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  let res = [];
  const n = candidates.length;
  const dfs = (i, sum, path) => {
    if (sum > target) return;
    if (sum == target) {
      res.push(path.slice());
      return;
    }
    for (let index = i; index < n; index++) {
      path.push(candidates[index]);
      dfs(index, sum + candidates[index], path);
      path.pop();
    }
  };
  dfs(0, 0, []);
  return res;
};
// 第二种方式也能通过了
