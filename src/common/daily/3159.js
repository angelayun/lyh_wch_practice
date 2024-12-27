/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @param {number} x
 * @return {number[]}
 */
var occurrencesOfElement = function (nums, queries, x) {
  let position = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == x) {
      position.push(i);
    }
  }
  const m = queries.length;
  let res = new Array(m).fill(-1);
  for (let i = 0; i < m; i++) {
    let x = queries[i];
    if (x - 1 < position.length) {
      res[i] = position[x - 1];
    }
  }
  return res;
};
