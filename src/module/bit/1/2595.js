/**
 * @param {number} n
 * @return {number[]}
 */
var evenOddBit = function (n) {
  let ans = [0, 0];
  for (let i = 0; i < 32; i++) {
    ans[i & 1] += (n >> i) & 1;
  }
  return ans;
};
