/**
 * @param {number[]} arr
 * @return {number}
 */
var minSetSize = function (arr) {
  let cnt = new Map();
  let totalSize = 0;
  for (let x of arr) {
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  let nums = Array.from(cnt.values());
  nums.sort((a, b) => b - a);
  let size = 0;
  for (let i = 0; i < nums.length; i++) {
    size += nums[i];
    if (size >= arr.length / 2) {
      return i + 1;
    }
  }
};
