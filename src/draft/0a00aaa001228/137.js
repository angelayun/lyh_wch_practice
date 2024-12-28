/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let res = 0;
  for (let i = 0; i < 32; i++) {
    let cnt = 0;
    for (let x of nums) {
      cnt += (x >> i) & 1;
    }
    res |= cnt % 3 << i;
  }
  return res;
};
