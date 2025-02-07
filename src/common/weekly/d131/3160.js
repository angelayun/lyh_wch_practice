/**
 * @param {number} limit
 * @param {number[][]} queries
 * @return {number[]}
 */
var queryResults = function (limit, queries) {
  let ans = [];
  let color = {};
  let cnt = new Map();
  for (let [x, y] of queries) {
    if (color[x]) {
      let c = color[x];
      cnt.set(c, cnt.get(c) - 1);
      if (cnt.get(c) == 0) cnt.delete(c);
    }
    color[x] = y;
    cnt.set(y, (cnt.get(y) || 0) + 1);
    ans.push(cnt.size);
  }
  return ans;
};
