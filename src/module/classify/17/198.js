var rob = function (nums) {
  const n = nums.length;
  const memo = new Array(n).fill(-1); // -1 表示没有计算过
  // dfs(i) 表示从 nums[0] 到 nums[i] 最多能偷多少
  function dfs(i) {
    if (i < 0) { // 递归边界（没有房子）
      return 0;
    }
    if (memo[i] !== -1) { // 之前计算过
      return memo[i];
    }
    const res = Math.max(dfs(i - 1), dfs(i - 2) + nums[i]);
    memo[i] = res; // 记忆化：保存计算结果
    return res;
  }
  return dfs(n - 1); // 从最后一个房子开始思考
};



var rob = function (nums) {
  const n = nums.length;
  const f = new Array(n + 2).fill(0);
  for (let i = 0; i < n; i++) {
    f[i + 2] = Math.max(f[i + 1], f[i] + nums[i]);
  }
  return f[n + 1];
};


var rob = function (nums) {
  let f0 = 0, f1 = 0;
  for (const x of nums) {
    [f0, f1] = [f1, Math.max(f1, f0 + x)]
  }
  return f1;
};
