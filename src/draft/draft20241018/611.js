/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function (nums) {
  nums.sort((a, b) => a - b)
  const n = nums.length
  for (let i = 0; i < n - 2; i++) {
    let x = nums[i]
    let left = i + 1, right = n - 1;
    while (left < right) { 
      
    }
  }
};