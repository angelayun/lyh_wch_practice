/**
 * @param {number[]} colors
 * @return {number}
 */
var numberOfAlternatingGroups = function (colors) {
  const n = colors.length;
  let cnt = 0;
  for (let i = 2; i < 2 * n; i++) {
    if (
      i > 0 &&
      i < n &&
      colors[i % n] != colors[(i - 1) % n] &&
      colors[(i - 2) % n] == colors[i % n]
    ) {
      console.log(
        i % n,
        colors[i % n],
        colors[(i - 1) % n],
        colors[(i - 2) % n]
      );
      cnt++;
    }
  }
  return cnt;
};
