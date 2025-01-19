/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumLength = function (nums) {
  // 从小到大排序
  nums.sort((a, b) => a - b);
  let cnt = new Map();
  for (let x of nums) {
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  let ans = 1;
  for (let x of nums) {
    let size = 0;
    while (cnt.has(x) && cnt.get(x) >= 2) {
      cnt.set(x, cnt.get(x) - 2);
      size++;
      x = Math.pow(x, 2);
      if (cnt.has(x) && cnt.get(x) != 0) {
        ans = Math.max(ans, size * 2 + 1);
      } else break;
    }
  }
  return ans;
};
