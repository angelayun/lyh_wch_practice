/**
 * @param {number[]} nums
 * @param {number} indexDifference
 * @param {number} valueDifference
 * @return {number[]}
 */
var findIndices = function (nums, indexDifference, valueDifference) {
  const n = nums.length;
  let maxIdx = 0,
    minIdx = 0;
  for (let j = indexDifference; j < n; j++) {
    let i = j - indexDifference;
    if (nums[i] > nums[maxIdx]) {
      maxIdx = i;
    } else if (nums[i] < nums[minIdx]) {
      minIdx = i;
    }
    if (nums[maxIdx] - nums[j] >= valueDifference) {
      return [maxIdx, j];
    } else if (nums[j] - nums[minIdx] >= valueDifference) {
      return [minIdx, j];
    }
  }
  return [-1, -1];
};
