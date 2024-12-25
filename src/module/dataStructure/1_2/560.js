/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let n = nums.length;
  let preSum = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    preSum[i + 1] = preSum[i] + nums[i];
  }
  let cnt = new Map();
  let ans = 0;
  for (let x of preSum) {
    ans += cnt.get(x - k) ?? 0;
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  return ans;
};
// 上面是两次遍历  来一个一次遍历的
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let ans = 0;
  let cnt = new Map([[0, 1]]);
  let sum = 0;
  for (let x of nums) {
    sum += x;
    ans += cnt.get(sum - k) ?? 0;
    cnt.set(sum, (cnt.get(sum) || 0) + 1);
  }
  return ans;
};
