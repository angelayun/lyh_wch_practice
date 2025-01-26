/**
 * @param {number[]} nums
 * @return {number[]}
 */
var numberOfPairs = function (nums) {
  let cnt = new Set();
  let sameCount = 0;
  for (let x of nums) {
    if (cnt.has(x)) {
      sameCount++;
      cnt.delete(x);
    } else {
      cnt.add(x);
    }
  }
  return [sameCount, nums.length - sameCount * 2];
};
