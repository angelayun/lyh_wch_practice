/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number}
 */
var longestPath = function (parent, s) {
  const n = parent.length;
  let graph = Array.from({ length: n }, () => []);
  for (let i = 1; i < n; i++) {
    graph[parent[i]].push(i);
  }
  let ans = 1;
  const dfs = (x) => {
    let maxLen = 0;
    for (let y of graph[x]) {
      let len = dfs(y) + 1;
      if (s[y] != s[x]) {
        ans = Math.max(ans, maxLen + len);
        maxLen = Math.max(maxLen, len);
      }
    }
    return maxLen;
  };
  return ans;
};