/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canAliceWin = function (nums) {
  let ans = [0, 0];
  for (let x of nums) {
    ans[x >= 10 ? 1 : 0] += x;
  }
  return ans[0] == ans[1] ? false : true;
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canAliceWin = function (nums) {
  let ans = 0;
  for (let x of nums) {
    ans += x >= 10 ? x : -x;
  }
  return ans != 0;
};
