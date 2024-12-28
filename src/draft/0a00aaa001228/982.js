/**
 * @param {number[]} nums
 * @return {number}
 */
var countTriplets = function (nums) {
  let cnt = new Map();
  for (let x of nums) {
    for (let y of nums) {
      cnt.set(x & y, (cnt.get(x & y) || 0) + 1);
    }
  }
  let ans = 0;
  let mask = 0xffff;
  for (let x of nums) {
    // x的补集
    let m = mask ^ x;
    let s = m;
    while (true) {
      ans += cnt.get(s) ?? 0;
      s = m & (s - 1);
      if (s == m) break;
    }
  }
  return ans;
};
