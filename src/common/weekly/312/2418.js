/**
 * @param {string[]} names
 * @param {number[]} heights
 * @return {string[]}
 */
var sortPeople = function (names, heights) {
  heights = heights.map((v, i) => [v, names[i]]);
  heights.sort((a, b) => b[0] - a[0]);
  return heights.map((v) => v[1]);
};
