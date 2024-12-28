/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function (n) {
  let ans = [0];
  while (n--) {
    for (let i = ans.length - 1; i >= 0; i--) {
      // 上一部分被0
      ans[i] <<= 1;
      // 下一部分补0 并且是对称的
      ans.push(ans[i] + 1);
    }
  }
  return ans;
};
