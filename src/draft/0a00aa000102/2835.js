/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var minOperations = function (nums, target) {
  const n = nums.length;
  let res = 0;
  target = BigInt(target);
  nums.sort((a, b) => a - b);
  let sum = 0n;
  for (let i = 0; i < n; i++) {
    nums[i] = BigInt(nums[i]);
    sum += nums[i];
  }
  // 所有的数字加起来都不足
  if (sum < target) {
    return -1;
  }
  while (target) {
    let t = nums.pop();
    if (sum - t >= target) {
      // 剩余的数字可以凑出target来  当前t可以直接丢弃
      sum -= t;
    } else if (t > target) {
      // 如果当前这个数比target要大  那么得拆分
      res++;
      nums.push(t >> 1);
      nums.push(t >> 1);
    } else {
      sum -= t;
      target -= t;
    }
  }
  return res;
};
