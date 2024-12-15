/**
 * @param {number} n
 * @return {string[]}
 */
var validStrings = function (n) {
  let res = [];
  let mask = (1 << n) - 1;
  for (let i = 1; i < 1 << n; i++) {
    if ((i & (i - 1)) == 0) {
      res.push((i ^ mask).toString(2).padStart(n, '0'));
    }
  }
  return res;
};
