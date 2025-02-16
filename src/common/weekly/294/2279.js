/**
 * @param {number[]} capacity
 * @param {number[]} rocks
 * @param {number} additionalRocks
 * @return {number}
 */
var maximumBags = function (capacity, rocks, additionalRocks) {
  let cnt = 0;
  const n = capacity.length;
  for (let i = 0; i < n; i++) {
    capacity[i] -= rocks[i];
  }
  capacity.sort((a, b) => a - b);
  for (let i = 0; i < n; i++) {
    let x = capacity[i];
    if (x > additionalRocks) break;

    additionalRocks -= x;
    cnt++;
  }
  return cnt;
};
