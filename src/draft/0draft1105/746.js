/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  const n = cost.length;
  let f0 = 0,
    f1 = 0;
  for (let i = 2; i < n; i++) {
    let newF = Math.min(cost[i - 2] + f0, cost[i - 1] + f1);
    f0 = f1;
    f1 = newF;
  }
  return f1;
};
