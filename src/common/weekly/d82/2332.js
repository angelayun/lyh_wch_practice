/**
 * @param {number[]} buses
 * @param {number[]} passengers
 * @param {number} capacity
 * @return {number}
 */
var latestTimeCatchTheBus = function (buses, passengers, capacity) {
  buses.sort((a, b) => a - b);
  passengers.sort((a, b) => a - b);
  let j = 0,
    c = 0;
  for (let b of buses) {
    c = capacity;
    while (c > 0 && j < passengers.length && passengers[j] <= b) {
      c--;
      j++;
    }
  }
  j -= 1;
  let ans = c ? buses[buses.length - 1] : passengers[j];
  while (j >= 0 && ans == passengers[j]) {
    j--;
    ans--;
  }
  return ans;
};
