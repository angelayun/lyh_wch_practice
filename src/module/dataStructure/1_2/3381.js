/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarraySum = function (nums, k) {
  let minS = new Array(k).fill((~~(BigInt(Number.MAX_SAFE_INTEGER) / 2n)));
  console.log(minS)
  let ans = Number.MIN_SAFE_INTEGER;
  let preSum = 0n;
  for (let j = 0; j < nums.length; j++) {
    preSum += BigInt(nums[j]);
    console.log(preSum)
    let i = j % k;
    if (ans < preSum - minS[i]) {
      ans = preSum - minS[i]
    }
    if (minS[i] > preSum) {
      minS[i] = preSum;
    }
    console.log(minS)
  }
  return Number(ans);
};
// TODO 下午再来看一下为什么通不过