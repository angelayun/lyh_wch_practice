/**
 * @param {number} n
 * @return {string[]}
 */
var validStrings = function (n) {
  let ans = [];
  let mask = (1 << n) - 1;
  for (let i = 0; i < 1 << n; i++) {
    // 判断是否有相邻的1
    if ((i & (i >> 1)) == 0) {
      ans.push((i ^ mask).toString(2).padStart(n, '0'));
    }
  }
  return ans;
};
