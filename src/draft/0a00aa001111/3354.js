/**
 * @param {number[]} nums
 * @return {number}
 */
var countValidSelections = function (nums) {
  let ans = 0;
  let suf = nums.reduce((pre, cur) => pre + cur);
  let pre = 0;
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    if (x) {
      pre += x;
      suf -= x;
    } else {
      if (pre == suf) ans += 2;
      else if (Math.abs(pre - suf) < 2) ans += 1;
    }
  }
  return ans;
};
