/**
 * @param {number} limit
 * @param {number[][]} queries
 * @return {number[]}
 */
var queryResults = function (limit, queries) {
  // 记录球x对应的颜色
  let color = new Map();
  // 记录颜色出现的次数
  let cnt = new Map();
  let ans = [];
  for (let [x, y] of queries) {
    if (color.has(x)) {
      let c = color.get(x);
      cnt.set(c, (cnt.get(c) || 0) - 1);
      if (cnt.get(c) <= 0) cnt.delete(c);
    }
    color.set(x, y);
    cnt.set(y, (cnt.get(y) || 0) + 1);
    ans.push(cnt.size);
  }
  return ans;
};
