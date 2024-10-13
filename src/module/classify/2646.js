var minimumTotalPrice = function (n, edges, price, trips) {
  const g = Array(n).fill(null).map(() => []);
  for (const [x, y] of edges) {
      g[x].push(y);
      g[y].push(x);
  }

  const cnt = Array(n).fill(0);
  for (const [start, end] of trips) {
      function dfs(x, fa) {
          if (x === end) {
              cnt[x]++;
              return true; // 找到 end
          }
          for (const y of g[x]) {
              if (y !== fa && dfs(y, x)) {
                  cnt[x]++; // x 是 end 的祖先节点，也就在路径上
                  return true;
              }
          }
          return false; // 未找到 end
      }
      dfs(start, -1);
  }

  // 类似 337. 打家劫舍 III
  function dp(x, fa) {
      let not_halve = price[x] * cnt[x]; // x 不变
      let halve = Math.floor(not_halve / 2); // x 减半
      for (const y of g[x]) {
          if (y !== fa) {
              const [nh, h] = dp(y, x); // 计算 y 不变/减半的最小价值总和
              not_halve += Math.min(nh, h); // x 不变，那么 y 可以不变或者减半，取这两种情况的最小值
              halve += nh; // x 减半，那么 y 只能不变
          }
      }
      return [not_halve, halve];
  }
  return Math.min(...dp(0, -1));
};
// 这个跟337是一个套路