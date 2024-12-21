/**
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function (arr) {
  const dfs = (i, mask) => {
    if (i < 0) return 0;
    let res = dfs(i - 1, mask);
    let t = mask;
    let isOk = true;
    for (let c of arr[i]) {
      if ((1 << (c.charCodeAt() - 'a'.charCodeAt())) & t) {
        isOk = false;
        break;
      }
      t |= 1 << (c.charCodeAt() - 'a'.charCodeAt());
    }
    if (isOk) {
      res = Math.max(res, dfs(i - 1, t) + arr[i].length);
    }
  };
  return dfs(arr.length, 0);
};
