/**
 * @param {number[]} nums
 * @param {number} indexDifference
 * @param {number} valueDifference
 * @return {number[]}
 */
var findIndices = function (nums, indexDifference, valueDifference) {
  /* j - i >= indexDifference;
  j - indexDifference >= i;
  i <= j - indexDifference; */
  const n = nums.length;
  let maxIndex = -1;
  let minIndex = -1;
  for (let j = indexDifference; j < n; j++) {
    let i = j - indexDifference;
    if (nums[maxIndex] < nums[i]) {
      maxIndex = i;
    } else if (nums[minIndex] < nums[i]) {
      minIndex = i;
    }
    if (nums[maxIndex] - nums[j] >= valueDifference) {
      return [maxIndex, j];
    } else if (nums[j] - nums[minIndex] >= valueDifference) {
      return [j, minIndex];
    }
  }
  return [-1, -1];
};


/**
 * @param {number[]} nums
 * @param {number} indexDifference
 * @param {number} valueDifference
 * @return {number[]}
 */
var findIndices = function (nums, indexDifference, valueDifference) {
  /* j - i >= indexDifference;
  j - indexDifference >= i;
  i <= j - indexDifference; */
  const n = nums.length;
  let maxIndex = 0;
  let minIndex = 0;
  for (let j = indexDifference; j < n; j++) {
    let i = j - indexDifference;
    if (nums[i] > nums[maxIndex]) {
      maxIndex = i;
    } else if (nums[i] < nums[minIndex]) {
      minIndex = i;
    }
    if (nums[maxIndex] - nums[j] >= valueDifference) {
      return [maxIndex, j];
    } else if (nums[j] - nums[minIndex] >= valueDifference) {
      return [minIndex, j];
    }
  }
  return [-1, -1];
};
