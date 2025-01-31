/**
 * @param {number[]} enemyEnergies
 * @param {number} currentEnergy
 * @return {number}
 */
var maximumPoints = function (enemyEnergies, currentEnergy) {
  let total = 0;
  let minVal = Number.MAX_SAFE_INTEGER;
  for (let x of enemyEnergies) {
    total += x;
    minVal = Math.min(minVal, x);
  }
  if (currentEnergy < minVal) return 0;
  currentEnergy += total - minVal;
  return ~~(currentEnergy / minVal);
};
