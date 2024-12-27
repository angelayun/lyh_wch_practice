/**
 * @param {string[]} array
 * @return {string[]}
 */
var findLongestSubarray = function (array) {
  let cnt = new Map([[0, -1]]);
  let preSum = 0;
  let maxLen = 0;
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    let x = array[i];
    /* if (/^[a-zA-Z]+$/.test(x)) {
      preSum += 1;
    } else {
      preSum -= 1;
    } */
    preSum += array[i].charCodeAt(0) > 57 ? 1 : -1;
    if (cnt.has(preSum)) {
      if (i - cnt.get(preSum) > maxLen) {
        maxLen = i - cnt.get(preSum);
        index = cnt.get(preSum) + 1;
      }
    } else {
      cnt.set(preSum, i);
    }
  }
  return array.slice(index, index + maxLen);
};
