/**
 * @param {number[]} nums
 * @return {number}
 */
var countTriplets = function (nums) {
  let cnt = new Map();
  for (let x of nums) {
    for (let y of nums) {
      let and = x & y;
      cnt.set(and, (cnt.get(and) || 0) + 1);
    }
  }
  let res = 0;
  let mask = 0xffff;
  for (let x of nums) {
    // x的补集
    let m = mask ^ x;
    let s = m;
    while (true) {
      res += cnt.get(s) || 0;
      s = (s - 1) & m;
      if (s == m) break;
    }
  }
  return res;
};
