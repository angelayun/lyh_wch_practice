/**
 * @param {number[]} ages
 * @return {number}
 */
var numFriendRequests = function (ages) {
  const n = ages.length;
  let cnt = 0;
  const check = (y, x) => {
    if (y <= 0.5 * x + 7) return false;
    if (y > x) return false;
    if (y > 100 && x < 100) return false;
    return true;
  };
  for (let x = 0; x < n - 1; x++) {
    for (let y = x + 1; y < n; y++) {
      if (check(ages[y], ages[x])) {
        cnt++;
      }
      if (check(ages[x], ages[y])) {
        cnt++;
      }
    }
  }
  return cnt;
};
