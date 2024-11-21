function UnionFind(size) {
  // 0位置的初始值为0  1位置的初始值为1  2位置的初始值为2 ....
  this.fa = Array.from({ length: size }, (_, k) => k);
  UnionFind.prototype.find = (x) => {
    let fa = this.fa;
    if (fa[x] != x) {
      fa[x] = this.find(fa[x]);
    }
    return fa[x];
  };
}
/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var shortestDistanceAfterQueries = function (n, queries) {
  let uf = new UnionFind(n - 1);
  let ans = new Array(queries.length).fill(0);
  let cnt = n - 1;
  for (let qi = 0; qi < queries.length; qi++) {
    let [l, r] = queries[qi];
    r--;
    let fr = uf.find(r);
    for (let i = uf.find(l); i < r; i = uf.find(i + 1)) {
      uf.fa[i] = fr;
      cnt--;
    }
    ans[qi] = cnt;
  }
  return ans;
};
export default shortestDistanceAfterQueries;
