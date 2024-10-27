/**
 * @param {number[]} skills
 * @param {number} k
 * @return {number}
 */
var findWinningPlayer = function (skills, k) {
  let maxI = 0, winCount = 0
  const n = skills.length
  for (let i = 1; i < n && winCount < k; i++) {
    if (skills[i] > skills[maxI]) {
      maxI = i
      winCount = 0
    }
    winCount++
  }
  return maxI
};