/**
 * @param {number[]} enemyEnergies
 * @param {number} currentEnergy
 * @return {number}
 */
var maximumPoints = function (enemyEnergies, currentEnergy) {
  let min = Math.min(...enemyEnergies);
  if (currentEnergy >= min) {
    let total = enemyEnergies.reduce((pre, cur) => pre + cur);
    currentEnergy += total - min;
    return Math.floor(currentEnergy / min);
  }
  return 0;
};
