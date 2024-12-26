/**
 * @param {number[]} prizePositions
 * @param {number} k
 * @return {number}
 */
var maximizeWin = function (prizePositions, k) {
  const n = prizePositions.length;
  let preSum = new Array(n + 1).fill(0);
  let ans = 0;
  for (let left = 0, right = 0; right < n; right++) {
    let p = prizePositions[right];
    while (p - prizePositions[left] > k) left++;
    ans = Math.max(ans, right - left + 1 + preSum[left]);
    preSum[right + 1] = Math.max(preSum[right], right - left + 1);
  }
  return ans;
};
