/**
 * @param {number[]} nums
 * @return {number}
 */
var countSubarrays = function (nums) {
  let cnt = 0;
  for (let i = 2; i < nums.length; i++) {
    let a = nums[i - 2],
      b = nums[i - 1],
      c = nums[i];
    // 这里应该用乘法不要用除法  除法还得判断是不是偶数  不然和是奇数肯定不行哈
    if ((a + c) * 2 == b) cnt++;
  }
  return cnt;
};
