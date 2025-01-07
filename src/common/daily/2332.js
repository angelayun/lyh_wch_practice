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
    c;
  for (const t of buses) {
    for (
      let c = capacity;
      c > 0 && j < passengers.length && passengers[j] <= t;
      c--
    ) {
      j++;
    }
  }
};
