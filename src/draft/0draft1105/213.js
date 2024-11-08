/**
 * @param {number[]} nums
 * @return {number}
 */
var rob198 = function (nums) {
  const n = nums.length;
  let f0 = 0,
    f1 = nums[0];
  for (let i = 1; i < n; i++) {
    let newF = Math.max(f1, f0 + nums[i]);
    f0 = f1;
    f1 = newF;
  }
  return f1 || 0;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const n = nums.length;
  let aaa = nums[0] + rob198(nums.slice(2, n - 1));
  let bb = rob198(nums.slice(1));
  let a = Math.max(aaa, bb);
  console.log(a);
  return 0;
};
export default rob;
