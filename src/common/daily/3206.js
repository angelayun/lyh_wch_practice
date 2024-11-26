/**
 * @param {number[]} colors
 * @return {number}
 */
var numberOfAlternatingGroups = function (colors) {
  let n = colors.length;
  let ans = 0,
    cnt = 0;
  let k = 3;
  for (let i = 0; i < 2 * n; i++) {
    if (i > 0 && colors[i % n] == colors[(i - 1) % n]) {
      cnt = 0;
    }
    cnt++;
    if (i >= n && cnt >= k) {
      ans++;
    }
  }
  return ans;
};
