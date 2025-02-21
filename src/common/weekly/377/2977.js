/**
 * @param {string} source
 * @param {string} target
 * @param {string[]} original
 * @param {string[]} changed
 * @param {number[]} cost
 * @return {number}
 */
var minimumCost = function (source, target, original, changed, cost) {
  // 用于按照长度分组存储字符串
  const len_to_strs = new Map();
  // 存储字符串之间的距离（成本）
  const dis = new Map();

  // 初始化 dis 并按照长度分组存储字符串
  for (let i = 0; i < original.length; i++) {
    const x = original[i];
    const y = changed[i];
    const c = cost[i];

    if (!len_to_strs.has(x.length)) {
      len_to_strs.set(x.length, new Set());
    }
    len_to_strs.get(x.length).add(x);

    if (!len_to_strs.has(y.length)) {
      len_to_strs.set(y.length, new Set());
    }
    len_to_strs.get(y.length).add(y);

    if (!dis.has(x)) {
      dis.set(x, new Map());
    }
    if (!dis.get(x).has(y)) {
      dis.get(x).set(y, Infinity);
    }
    dis.get(x).set(y, Math.min(dis.get(x).get(y), c));

    if (!dis.get(x).has(x)) {
      dis.get(x).set(x, 0);
    }
    if (!dis.has(y)) {
      dis.set(y, new Map());
    }
    if (!dis.get(y).has(y)) {
      dis.get(y).set(y, 0);
    }
  }

  // 使用 Floyd-Warshall 算法计算所有字符串对之间的最短距离
  for (const strs of len_to_strs.values()) {
    for (const k of strs) {
      for (const i of strs) {
        if (dis.get(i).get(k) === Infinity) {
          continue;
        }
        for (const j of strs) {
          if (!dis.get(i).has(j)) {
            dis.get(i).set(j, Infinity);
          }
          dis
            .get(i)
            .set(
              j,
              Math.min(dis.get(i).get(j), dis.get(i).get(k) + dis.get(k).get(j))
            );
        }
      }
    }
  }

  // 记忆化搜索函数，用于计算将 source[:i] 转换为 target[:i] 的最小成本
  const memo = new Map();
  function dfs(i) {
    if (i === 0) {
      return 0;
    }
    if (memo.has(i)) {
      return memo.get(i);
    }
    let res = Infinity;
    if (source[i - 1] === target[i - 1]) {
      res = dfs(i - 1);
    }
    for (const [size, strs] of len_to_strs.entries()) {
      if (i < size) {
        continue;
      }
      const s = source.slice(i - size, i);
      const t = target.slice(i - size, i);
      if (strs.has(s) && strs.has(t)) {
        res = Math.min(res, dis.get(s).get(t) + dfs(i - size));
      }
    }
    memo.set(i, res);
    return res;
  }

  const ans = dfs(source.length);
  return ans < Infinity ? ans : -1;
};
