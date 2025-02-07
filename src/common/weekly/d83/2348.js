/**
 * @param {number[]} nums
 * @return {number}
 */
var zeroFilledSubarray = function (nums) {
  let ans = 0;
  let cnt = 0;
  for (let x of nums) {
    if (x == '0') {
      cnt++;
      ans += cnt;
    } else cnt = 0;
  }
  return ans;
};
