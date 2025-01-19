/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumLength = function (nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let cnt = new Map();
  for (let x of nums) {
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  // 默认值为1
  let ans = 1;
  for (let i = 0; i < n; i++) {
    let num = nums[i];
    let size = 0;
    // 只有出现次数大于2的才能作为x^2 x^4....
    while (cnt.has(num) && cnt.get(num) >= 2) {
      cnt.set(num, cnt.get(num) - 2);
      size++;
      // 下一个更大的值
      num = Math.pow(num, 2);
      // 中间x^k
      if (cnt.has(num) && cnt.get(num) != 0) {
        // 序列的总长度 前半部分次数*2+中间元素1次
        ans = Math.max(ans, size * 2 + 1);
      } else break;
    }
  }
  return ans;
};
