/**
 * @param {number} n
 * @return {string[]}
 */
var validStrings = function (n) {
  let ans = 0;
  for (let i = 0; i < 1 << n; i++) {
    if ((i & (i >> 1)) == 0) {
      let mask = (1 << n) - 1;
      ans.push((mask ^ i).toString(2).padStart(n, 0));
    }
  }
  return ans;
};
