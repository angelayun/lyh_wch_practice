/**
 * @param {number[]} nums
 * @return {number}
 */
var totalHammingDistance = function (nums) {
  const n = nums.length;
  let ans = 0;
  for (let i = 0; i < 32; i++) {
    let cnt = 0;
    for (let x of nums) {
      cnt += (x >> i) & 1;
    }
    ans += cnt * (n - cnt);
  }
  return ans;
};
