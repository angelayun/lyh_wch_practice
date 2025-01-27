/**
 * @param {number[][]} events
 * @return {number}
 */
var buttonWithLongestTime = function (events) {
  let [minIndex, maxDiff] = events[0];
  for (let i = 1; i < events.length; i++) {
    let [index, time] = events[i];
    let diff = time - events[i - 1][1];
    if (diff > maxDiff || (diff == maxDiff && index < minIndex)) {
      minIndex = index;
      maxDiff = diff;
    }
  }
  return minIndex;
};
