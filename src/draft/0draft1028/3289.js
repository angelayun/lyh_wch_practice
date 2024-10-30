/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getSneakyNumbers = function (nums) {
  let set = new Set();
  let ans = [];
  for (let x of nums) {
    if (set.has(x)) {
      ans.push(x);
    }
    set.add(x);
  }
  return ans;
};
