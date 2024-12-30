/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number}
 */
var longestPath = function (parent, s) {
  const n = parent.length;
  // 初始化为-1 是考虑到只有一个节点的情况
  let ans = -1;
  let graph = Array.from({ length: n }, () => []);
  for (let i = 1; i < n; i++) {
    // 父节点  链表里面  有哪些子节点
    graph[parent[i]] = i;
  }
  // 从x往下的最长链
  const dfs = (x) => {
    let maxLen = 0;
    for (let y of graph[x]) {
      // 这里+1 1指的是y自己
      let len = dfs(y) + 1;
      if (s[x] != s[y]) {
        maxLen = Math.max(maxLen, len);
        ans = Math.max(ans, maxLen + len);
      }
    }
    return maxLen;
  };
  dfs(0);
  return ans + 1;
};
