/**
 * @param {number[][]} edges
 * @return {number}
 */
var countGoodNodes = function (edges) {
  // 看示例  这里是长度+1
  const n = edges.length + 1;
  const graph = Array.from({ length: n }, () => new Array());
  for (let [x, y] of edges) {
    graph[x].push(y);
    graph[y].push(x);
  }
  let cnt = 0;
  const dfs = (x, fa) => {
    // 默认子树个数之和要算上自己  所以是1
    let size = 1,
      // 第一个儿子子树的大小
      sz0 = 0,
      // 子树个数都相同
      ok = true;
    for (let y of graph[x]) {
      // 不能递归到父节点
      if (y == fa) continue;
      let curCount = dfs(y, x);
      if (sz0 == 0) {
        // 记录第一个儿子子树的大小
        sz0 = curCount;
      } else if (curCount != sz0) {
        // 存在大小不一样的儿子子树
        ok = false;
        // 这里不能break  因为其它子树y仍然要递归
      }
      size += curCount;
    }
    // 这里会隐式类型转换
    ans += ok;
    return size;
  };
  dfs(0, -1);
  return cnt;
};
// 待验证
