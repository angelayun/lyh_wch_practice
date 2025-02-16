/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSquareStreak = function (nums) {
  let set = new Set(...nums);
  nums.sort((a, b) => a - b);
  let ans = -1;
  for (let x of nums) {
    let cnt = 1;
    while (set.has(x * x)) {
      cnt++;
      x = x * x;
      set.delete(x);
    }
    ans = Math.max(cnt, ans);
  }
  return ans
};
