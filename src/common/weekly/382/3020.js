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
  let ans = 1;
  for (let i = 0; i < n; i++) {
    let num = nums[i];
    let size = 0;
    while (cnt.has(num) && cnt.get(num) >= 2) {
      cnt.set(num, cnt.get(num) - 2);
      size++;
      num = Math.pow(num, 2);
      if (cnt.has(num) && cnt.get(num) != 0) {
        ans = Math.max(ans, size * 2 + 1);
      } else break;
    }
  }
  return ans;
};
