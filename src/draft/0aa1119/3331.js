/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number[]}
 */
var findSubtreeSizes = function (parent, s) {
  const n = parent.length;
  let graph = Array.from({ length: n }, () => new Array());
  for (let i = 1; i < n; i++) {
    graph[parent[i]].push(i);
  }
  let size = new Array(n).fill(0);
  let ancestor = new Array(26).fill(-1);
  const dfs = (x) => {
    size[x] = 1;
    let sx = s[x].charCodeAt() - 'a'.charCodeAt();
    let old = ancestor[sx];
    ancestor[sx] = x;
    for (let y of graph[x]) {
      dfs(y);
      let anc = ancestor[s[y].charCodeAt() - 'a'.charCodeAt()];
      size[anc < 0 ? x : anc] += size[y];
    }
    ancestor[sx] = old;
  };
  dfs(0);
  return size;
};
