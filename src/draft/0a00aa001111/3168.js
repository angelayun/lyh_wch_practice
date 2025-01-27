/**
 * @param {string} s
 * @return {number}
 */
var minimumChairs = function (s) {
  let maxCount = 0;
  let cnt = 0;
  for (let x of s) {
    if (x == 'E') {
      cnt++;
      maxCount = Math.max(maxCount, cnt);
    } else {
      cnt--;
    }
  }
  return maxCount;
};
