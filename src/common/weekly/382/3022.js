/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOrAfterOperations = function (nums, k) {
  let ans = 0;
  let mask = 0;
  for (let b = 29; b >= 0; b--) {
    mask |= 1 << b;
    let cnt = 0; // 操作次数
    let and = -1; // -1 的二进制全为 1
    for (let x of nums) {
      and &= x & mask;
      if (and != 0) {
        cnt++; // 合并 x，操作次数加一
      } else {
        and = -1; // 准备合并下一段
      }
    }
    if (cnt > k) {
      ans |= 1 << b; // 答案的这个比特位必须是 1
      mask ^= 1 << b; // 后面不考虑这个比特位
    }
  }
  return ans;
};
