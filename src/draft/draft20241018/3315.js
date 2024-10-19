/**
 * @param {number[]} nums
 * @return {number[]}
 */
var minBitwiseArray = function (nums) {
  // x=100111，那么 x ∣ (x+1)=100111 ∣ 101000=101111。
  // 把nums[i]的最右边的0的右边的1变成0
  // 偶数的情况下肯定无解  而题目说明了数组里面都是质数  偶数且是质数的只有2
  for (let [i, x] of nums.entries()) {
    if (x == 2) {
      nums[i] = -1
    } else {
      let t = ~x;
      let lowbit = t & -t
      nums[i] ^= lowbit >> 1
    }
  }
  return nums
};