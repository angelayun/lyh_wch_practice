/**
 * @param {number[][]} events
 * @return {number}
 */
var buttonWithLongestTime = function (events) {
  let [idx, maxDiff] = events[0];
  for (let i = 1; i < events.length; i++) {
    let [index, time] = events[i];
    let [_, preVal] = events[i - 1];
    let diff = time - preVal;
    if (diff > maxDiff || (diff == maxDiff && index < idx)) {
      maxDiff = diff;
      idx = index;
    }
  }
  return idx;
};
