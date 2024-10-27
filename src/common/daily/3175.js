/**
 * @param {number[]} skills
 * @param {number} k
 * @return {number}
 */
var findWinningPlayer = function (skills, k) {
  const n = skills.length
  // 默认第0个人是赢家
  let maxI = 0, winCount = 0
  // 赢的次数不超过k次
  for (let i = 1; i < n && winCount < k; i++) {
    // 如果当前数比赢家的技能还要大  则重新计数
    if (skills[i] > skills[maxI]) {
      winCount = 0
      maxI = i
    }
    winCount++
  }
  return maxI
};