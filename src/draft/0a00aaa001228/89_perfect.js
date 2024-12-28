/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function (n) {
  let ans = [0];
  while (n--) {
    for (let i = ans.length - 1; i >= 0; i++) {
      ans[i] <<= 1;
      ans.push(ans[i] + 1);
    }
  }
  return ans
};
