/**
 * @param {number[]} nums
 * @return {number}
 */
var countTriplets = function (nums) {
  let cnt = new Map();
  for (let x of nums) {
    for (let y of nums) {
      let cur = x & y;
      cnt.set(cur, (cnt.get(cur) || 0) + 1);
    }
  }
  let mask = 0xffff;
  let ans = 0;
  for (let x of nums) {
    let m = x ^ mask;
    let s = m;
    while (true) {
      ans += cnt.get(s) ?? 0;
      s = m & (s - 1);
      if (s == m) break;
    }
  }
  return ans;
};
