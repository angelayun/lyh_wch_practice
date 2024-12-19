/**
 * @param {number[]} nums
 * @return {number}
 */
var totalHammingDistance = function (nums) {
  const n = nums.length;
  let cnt = 0;
  for (let i = 0; i < 32; i++) {
    let c1 = 0;
    for (let x of nums) {
      c1 += (x >> i) & 1;
    }
    cnt += c1 * (n - c1);
  }
  return cnt;
};
