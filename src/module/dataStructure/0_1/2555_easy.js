/**
 * @param {number[]} prizePositions
 * @param {number} k
 * @return {number}
 */
var maximizeWin = function (prizePositions, k) {
  // prizePositions 表示各奖品所在的位置
  const n = prizePositions.length;
  let preSum = new Array(n + 1).fill(0);
  let ans = 0;
  for (let left = 0, right = 0; right < n; right++) {
    let p = prizePositions[right];
    // 右边的位置和左边的位置相隔不能超过k 否则就缩小窗口
    while (p - prizePositions[left] > k) left++;
    // preSum[left]第一个线段的的奖品的最大值   第二个线段奖品的和为right - left + 1 当前这个线段的个数
    ans = Math.max(ans, right - left + 1 + preSum[left]);
    // 这里有种dp的味道在里面  如果上一个更大就取上一个  否则当前更大就取当前right - left + 1
    preSum[right + 1] = Math.max(preSum[right], right - left + 1);
  }
  return ans;
};
