/**
 * @param {number[]} colors
 * @return {number}
 */
var numberOfAlternatingGroups = function (colors) {
  let cnt = 0;
  let ans = 0;
  const n = colors.length;
  for (let i = 0; i < 2 * n; i++) {
    if (i > 0 && colors[(i - 1) % n] == colors[(i) % n]) {
      cnt = 0;
    }
    cnt++;
    if (i >= n && cnt >= 3) {
      ans++;
    }
  }
  return ans;
};