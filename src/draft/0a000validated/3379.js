/**
 * @param {number[]} nums
 * @return {number[]}
 */
var constructTransformedArray = function (nums) {
  const n = nums.length;
  let res = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let x = nums[i];
    res[i] = nums[(((i + x) % n) + n) % n];
  }
  return res;
};
