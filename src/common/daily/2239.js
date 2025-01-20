/**
 * @param {number[]} nums
 * @return {number}
 */
var findClosestNumber = function (nums) {
  const n = nums.length;
  let minDiff = Number.MAX_SAFE_INTEGER;
  let maxVal = Number.MIN_SAFE_INTEGER;
  for (let x of nums) {
    let curDiff = Math.abs(x);
    if (curDiff < minDiff || (curDiff == minDiff && x > maxVal)) {
      maxVal = x;
      minDiff = curDiff;
    }
  }
  return maxVal;
};
