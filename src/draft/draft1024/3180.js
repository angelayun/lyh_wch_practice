/**
 * @param {number[]} rewardValues
 * @return {number}
 */
var maxTotalReward = function (rewardValues) {
  const n = rewardValues.length
  rewardValues.sort((a, b) => a - b)
  let res = rewardValues[0]
  for (let i = 1; i < n; i++) {
    let x = rewardValues[i]
    if (res > x) {
      res += x;
    }
  }
  return res
};