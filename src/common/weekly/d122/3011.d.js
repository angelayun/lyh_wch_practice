/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function (n) {
  let count = 0;
  while (n) {
    n &= n - 1;
    count++;
  }
  return count;
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canSortArray = function (nums) {
  const n = nums.length;
  let i = 0;
  while (i < n) {
    let start = i;
    let cnt = hammingWeight(nums[i]);
    i++;
    while (i < n && cnt == hammingWeight(nums[i])) {
      i++;
    }
    let end = i;
    let sorted = nums.slice(start, end);
    sorted.sort((a, b) => a - b);
    let k = 0;
    for (let j = start; j < end; j++) {
      nums[j] = sorted[k++];
    }
  }
  for (let i = 1; i < n; i++) {
    if (nums[i] < nums[i - 1]) return false;
  }
  return true;
};
