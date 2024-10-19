/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  let ans = 0
  for (let x of nums) {
    // 如果x是0 之前的翻转次数是偶数  那现在还是0 需要翻转
    // 同理   如果x是1 之前的翻转次数是奇数  那现在是0 还是需要翻转
    if (x == ans % 2) {
      ans++
    }
  }
  return ans
};