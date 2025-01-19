/**
 * @param {string} initialCurrency
 * @param {string[][]} pairs1
 * @param {number[]} rates1
 * @param {string[][]} pairs2
 * @param {number[]} rates2
 * @return {number}
 */
var maxAmount = function (initialCurrency, pairs1, rates1, pairs2, rates2) {
  let graph = new Map();
  // 根据pairs1建图
  for (let i = 0; i < pairs1.length; i++) {
    let [x, y] = pairs1[i];
    let list = graph.get(x) || [];
    list.push([y, rates1[i]]);
    graph.set(x, list);
    list = graph.get(y) || [];
    list.push([x, 1 / rates1[i]]);
    graph.set(y, list);
  }
  // 建立分层图关系
  for (let key of graph.keys()) {
    let list = graph.get(key);
    list.push([key + '2', 1.0]);
    graph.set(key, list);
  }
  // 根据pairs2建图
  for (let i = 0; i < pairs2.length; i++) {
    let [x, y] = pairs2[i];
    // 第二张图的key都加2
    x += '2';
    y += '2';
    let list = graph.get(x) || [];
    list.push([y, rates2[i]]);
    graph.set(x, list);
    list = graph.get(y) || [];
    list.push([x, 1 / rates2[i]]);
    graph.set(y, list);
  }
  let ans = 1.0;
  const dfs = (x, fa, cur_amout) => {
    if (x == initialCurrency + '2') {
      ans = Math.max(ans, cur_amout);
      return;
    }
    if (graph.has(x)) {
      for (let [to, rate] of graph.get(x)) {
        if (to != fa) {
          dfs(to, x, cur_amout * rate);
        }
      }
    }
  };
  dfs(initialCurrency, '', 1.0);
  return ans;
};
