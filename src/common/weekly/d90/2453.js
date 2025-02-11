/**
 * @param {number[]} nums
 * @param {number} space
 * @return {number}
 */
var destroyTargets = function (nums, space) {
  let cnt = new Map();
  for (let x of nums) {
    let key = x % space;
    let list = [];
    if (cnt.has(key)) {
      list = cnt.get(key);
    }
    list.push(x);
    cnt.set(key, list);
  }
  let maxLen = 0,
    ans = 0;
  for (let a of cnt.values()) {
    let m = a.length;
    let low = a.sort((a, b) => a - b)[0];
    if (m > maxLen || (m == maxLen && low < ans)) {
      maxLen = m;
      ans = low;
    }
  }
  return ans;
};
