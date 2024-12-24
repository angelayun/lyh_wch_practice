/**
 * @param {number[]} values
 * @return {number}
 */
var maxScoreSightseeingPair = function (values) {
  const n = values.length;
  let leftMax = values[0];
  let res = -Infinity;
  for (let j = 1; j < n; j++) {
    res = Math.max(res, values[j] - j + leftMax);
    leftMax = Math.max(leftMax, values[j] + j);
  }
  return res;
};
