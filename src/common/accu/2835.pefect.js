/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var minOperations = function (nums, target) {
  let n = nums.length;
  nums.sort((a, b) => a - b); // 把nums数组从小到大排序
  target = BigInt(target);
  let sum = 0n;
  for (let i = 0; i < n; ++i) {
    sum += BigInt(nums[i]); // 把整个数组加起来
  }
  if (sum < target) {
    return -1; // 加起来都小于target，直接返回-1
  }
  let res = 0;
  while (target) {
    let b = BigInt(nums.pop()); // 把数组里最后最大的数字拿出来
    if (sum - b >= target) {
      //如果不用这个数字，靠前面的数字都能凑出来target，这个数字直接扔掉
      sum -= b; // 扔掉数字，继续loop
      // 如果前面不够凑了，要用这个数字的话
    } else if (b > target) {
      // 如果这个数字本身就比target大
      ++res; // 那就要拆一次，拆操作的计数+1
      nums.push(b >> 1n); //拆完了塞回去数组尾部
      nums.push(b >> 1n); //拆完了塞回去数组尾部，继续loop
    } else {
      //如果这个数字刚好是target或者小于target
      target -= b; // 那就把target-这个数字，剩下的继续loop
      sum -= b; // 扔掉数字，继续loop
    }
  }
  return res; //返回拆操作的次数
};
// export default minOperations;
