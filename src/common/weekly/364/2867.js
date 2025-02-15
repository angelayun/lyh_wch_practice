// 埃氏筛
const N = 100001;
let isPrime = new Array(N).fill(true);
isPrime[1] = false;
for (let i = 2; i * i < N; i++) {
  if (isPrime[i]) {
    for (let j = i * i; j < N; j += i) {
      isPrime[j] = false;
    }
  }
}

var countPaths = function (n, edges) {
  let graph = new Array(n + 1).fill(null).map(() => []);
  for (const [i, j] of edges) {
    graph[i].push(j);
    graph[j].push(i);
  }

  function dfs(i, pre) {
    seen.push(i);
    for (const j of graph[i]) {
      if (j !== pre && !isPrime[j]) {
        dfs(j, i);
      }
    }
  }

  let seen = [];
  let res = 0;
  let count = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    if (!isPrime[i]) {
      continue;
    }
    // 从质数出发
    let cur = 0;
    for (const j of graph[i]) {
      if (isPrime[j]) {
        continue;
      }
      // 遍历到的如果是非质数并且  之前没有统计过
      if (count[j] === 0) {
        seen = [];
        dfs(j, 0);
        let cnt = seen.length;
        for (const k of seen) {
          count[k] = cnt;
        }
      }
      res += count[j] * cur;
      cur += count[j];
    }
    res += cur;
  }
  return res;
};
