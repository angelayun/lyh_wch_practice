/**
 * @param {number[][]} events
 * @return {number}
 */
var buttonWithLongestTime = function (events) {
  let [minIndex, maxDiff] = events[0];
  for (let i = 1; i < events.length; i++) {
    let [index, val] = events[i];
    let [_, preVal] = events[i - 1];
    let curDiff = val - preVal;
    if (curDiff > maxDiff || (curDiff == maxDiff && index < minIndex)) {
      maxDiff = curDiff;
      minIndex = index;
    }
  }
  return minIndex;
};
