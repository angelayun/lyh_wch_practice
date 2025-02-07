/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSquareStreak = function (nums) {
  let set = new Set(nums);
  let ans = 0;
  for (let x of set) {
    let cnt = 0;
    while (set.has(x)) {
      cnt++;
      x *= x;
    }
    ans = Math.max(ans, cnt);
  }
  return ans > 1 ? ans : -1;
};
