/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
var constructGridLayout = function (n, edges) {
  let graph = Array.from({ length: n }, () => []);
  for (let [x, y] of edges) {
    graph[x].push(y);
    graph[y].push(x);
  }
  let degToNode = new Array(5).fill(-1);
  for (let i = 0; i < n; i++) {
    let list = graph[i];
    degToNode[list.length] = i;
  }
  let row, x, pre;
  if (degToNode[1] != -1) row = [degToNode[1]];
  else if (degToNode[4] == -1) {
    x = degToNode[2];
    for (let y of graph[x]) {
      if (graph[y].length == 2) {
        row = [x, y];
        break;
      }
    }
  } else {
    x = degToNode[2];
    row = [x];
    pre = x;
    x = graph[x][0];
    while (graph[x].length == 3) {
      row.push(x);
      for (let y of graph[x]) {
        if (y != pre && graph[y].length < 4) {
          pre = x;
          x = y;
          break;
        }
      }
    }
    row.push(x);
  }
  let ans = Array.from({ length: ~~(n / row.length) }, () => []);
  ans[0] = row;
  let vis = new Array(n).fill(false);
  for (let x of row) {
    vis[x] = true;
  }
  for (let i = 1; i < ans.length; i++) {
    for (let x of ans[i - 1]) {
      for (let y of graph[x]) {
        if (!vis[y]) {
          vis[y] = true;
          ans[i].push(y);
          break;
        }
      }
    }
  }
  return ans;
};
export default constructGridLayout;
