/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let f0 = 1,
    f1 = 1;
  for (let i = 2; i <= n; i++) {
    let newF = f0 + f1;
    f0 = f1;
    f1 = newF;
  }
  return f1;
};
