/**
 * @param {number} n
 * @return {string[]}
 */
var validStrings = function (n) {
  let res = [];
  let mask = (1 << n) - 1;
  for (let i = 0; i < 1 << n; i++) {
    if ((i & (i >> 1)) == 0) {
      // 不包含相邻的1
      res.push((mask ^ i).toString(2).padStart(n, '0'));
    }
  }
  return res;
};
