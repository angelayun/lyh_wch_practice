/**
 * @param {string} s
 * @return {number}
 */
var minimumChairs = function (s) {
  let ans = 0;
  let cnt = 0;
  for (let x of s) {
    if (x == 'E') {
      cnt++;
      ans = Math.max(ans, cnt);
    } else cnt--;
  }
  return ans;
};
