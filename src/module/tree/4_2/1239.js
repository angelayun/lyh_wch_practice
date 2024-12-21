/**
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function (arr) {
  const n = arr.length;
  const dfs = (i, mask) => {
    if (i < 0) return 0;
    // 不选
    let res = dfs(i - 1, mask);
    // 判断是否可以选
    let t = mask;
    let ok = true;
    for (let c of arr[i]) {
      if ((1 << (c.charCodeAt() - 'a'.charCodeAt())) & t) {
        ok = false;
        break;
      }
      // 加入集合
      t = t | (1 << (c.charCodeAt() - 'a'.charCodeAt()));
    }
    if (ok) {
      res = Math.max(res, dfs(i - 1, t) + arr[i].length);
    }
    return res;
  };
  return dfs(n - 1, 0);
};
