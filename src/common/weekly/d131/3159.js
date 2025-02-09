/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @param {number} x
 * @return {number[]}
 */
var occurrencesOfElement = function (nums, queries, x) {
  let pos = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == x) pos.push(i);
  }
  let ans = [];
  for (let i = 0; i < queries.length; i++) {
    let cur = queries[i];
    if (cur > pos.length) ans.push(-1);
    else {
      ans.push(pos[cur - 1]);
    }
  }
  return ans;
};
