/**
 * @param {number[]} values
 * @return {number}
 */
var maxScoreSightseeingPair = function (values) {
  let n = values.length;
  let maxScore = 0;
  let cnt = new Map();
  for (let i = 0; i < n; i++) {
    let y = values[i] - i;
    for (let key of cnt.keys()) {
      maxScore = Math.max(maxScore, key + y);
    }
    let x = i + values[i];
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  return maxScore;
};
// 上面写的是超时的写法
/**
 * @param {number[]} values
 * @return {number}
 */
var maxScoreSightseeingPair = function (values) {
  let n = values.length;
  let maxScore = 0;
  let leftMax = 0;
  for (let i = 0; i < n; i++) {
    let y = values[i] - i;
    maxScore = Math.max(maxScore, leftMax + y);
    let x = i + values[i];
    leftMax = Math.max(leftMax, x);
  }
  return maxScore;
};
