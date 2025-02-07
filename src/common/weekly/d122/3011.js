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
    let ones = hammingWeight(nums[i]);
    i += 1;
    while (i < n && hammingWeight(nums[i]) == ones) {
      i++;
    }
    // 循环结束之后  从start到i-1是一个子数组
    // 提取子数组
    let subArray = nums.splice(start, i - start);
    // 对子数组进行排序
    subArray.sort((a, b) => a - b);
    // 将排序好的子数组插回原数组
    nums.splice(start, 0, ...subArray);
  }
  for (let i = 1; i < n; i++) {
    let x = nums[i - 1],
      y = nums[i];
    if (x > y) return false;
  }
  return true;
};
