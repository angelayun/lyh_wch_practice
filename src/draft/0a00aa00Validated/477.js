/**
 * @param {number[]} nums
 * @return {number}
 */
var totalHammingDistance = function (nums) {
  let res = 0;
  const n = nums.length;
  for (let i = 0; i < 32; i++) {
    let cnt = 0;
    for (let x of nums) {
      if ((x >> i) & 1) cnt++;
    }
    res += cnt * (n - cnt);
  }
  return res;
};
