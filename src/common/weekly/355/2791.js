/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number}
 */
var countPalindromePaths = function (parent, s) {
  const n = s.length;
  let graph = Array.from({ length: n }, () => []);
  for (let i = 1; i < n; i++) {
    let bit = 1 << (s[i].charCodeAt() - 'a'.charCodeAt());
    graph[parent[i]].push([i, bit]);
  }
  let ans = 0;
  let cnt = new Map();
  const dfs = (v, xor) => {
    ans += cnt.get(xor) ?? 0;
    for (let i = 0; i < 26; i++) {
      ans += cnt.get(xor ^ (1 << i)) ?? 0;
    }
    cnt.set(xor, (cnt.get(xor) || 0) + 1);
    cnt[xor] += 1;
    for (let [to, wt] of graph[v]) {
      dfs(to, xor ^ wt);
    }
  };
  dfs(0, 0);
  return ans;
};
