var minimumTotalPrice = function (n, edges, price, trips) {
  const g = Array(n)
    .fill(null)
    .map(() => []);
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

var minimumTotalPrice = function (n, edges, price, trips) {
  const g = Array(n)
    .fill(null)
    .map(() => []);
  for (const [x, y] of edges) {
    g[x].push(y);
    g[y].push(x);
  }

  const qs = Array(n)
    .fill(null)
    .map(() => []);
  for (const [s, e] of trips) {
    qs[s].push(e); // 路径端点分组
    if (s !== e) {
      qs[e].push(s);
    }
  }

  // 并查集模板
  const root = [...Array(n).keys()];
  function find(x) {
    if (x !== root[x]) {
      root[x] = find(root[x]);
    }
    return root[x];
  }

  const diff = Array(n).fill(0);
  const father = Array(n).fill(0);
  const color = Array(n).fill(0);
  function tarjan(x, fa) {
    father[x] = fa;
    color[x] = 1; // 递归中
    for (const y of g[x]) {
      if (color[y] === 0) {
        // 未递归
        tarjan(y, x);
        root[y] = x; // 相当于把 y 的子树节点全部 merge 到 x
      }
    }
    for (const y of qs[x]) {
      // color[y] == 2 意味着 y 所在子树已经遍历完
      // 也就意味着 y 已经 merge 到它和 x 的 lca 上了
      // 此时 find(y) 就是 x 和 y 的 lca
      if (y === x || color[y] === 2) {
        diff[x] += 1;
        diff[y] += 1;
        const lca = find(y);
        diff[lca] -= 1;
        if (father[lca] >= 0) {
          diff[father[lca]] -= 1;
        }
      }
    }
    color[x] = 2; // 递归结束
  }
  tarjan(0, -1);

  function dfs(x, fa) {
    let not_halve = 0;
    let halve = 0;
    let cnt = diff[x];
    for (const y of g[x]) {
      if (y !== fa) {
        const [nh, h, c] = dfs(y, x); // 计算 y 不变/减半的最小价值总和
        not_halve += Math.min(nh, h); // x 不变，那么 y 可以不变，可以减半，取这两种情况的最小值
        halve += nh; // x 减半，那么 y 只能不变
        cnt += c; // 自底向上累加差分值
      }
    }
    not_halve += price[x] * cnt; // x 不变
    halve += Math.floor((price[x] * cnt) / 2); // x 减半
    return [not_halve, halve, cnt];
  }
  const [nh, h, _] = dfs(0, -1);
  return Math.min(nh, h);
};
