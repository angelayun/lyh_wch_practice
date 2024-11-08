/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  let ans = 0;
  const n = nums.length;
  let f0 = 0,
    f1 = nums[0];
  for (let i = 1; i < n; i++) {
    let newF = Math.max(f1, f0 + nums[i]);
    f0 = f1;
    f1 = newF;
  }
  return f1;
};
