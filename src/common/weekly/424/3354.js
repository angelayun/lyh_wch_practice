/**
 * @param {number[]} nums
 * @return {number}
 */
var countValidSelections = function (nums) {
  let suf = nums.reduce((pre, cur) => pre + cur);
  let ans = 0,
    pre = 0;
  for (let x of nums) {
    if (x) {
      suf -= x;
      pre += x;
    } else {
      if (pre == suf) {
        ans += 2;
      } else if (Math.abs(pre - suf) == 1) ans++;
    }
  }
  return ans
};
