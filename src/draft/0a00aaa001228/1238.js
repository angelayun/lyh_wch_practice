/**
 * @param {number} n
 * @param {number} start
 * @return {number[]}
 */
var circularPermutation = function (n, start) {
  let ans = [0];
  while (n--) {
    for (let i = ans.length - 1; i >= 0; i--) {
      ans[i] <<= 1;
      ans.push(ans[i] + 1);
    }
  }
  let index = ans.indexOf(start);
  return [...ans.slice(index), ...ans.slice(0, index)];
};
