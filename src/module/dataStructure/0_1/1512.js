/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function (nums) {
  let cnt = new Map();
  let res = 0;
  for (let y of nums) {
    res += cnt.get(y) || 0;
    cnt.set(y, (cnt.get(y) || 0) + 1);
  }
  return res;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function (nums) {
  let cnt = new Map();
  let res = 0;
  for (let y of nums) {
    const c = cnt[y] ?? 0;
    res += c;
    cnt[y] = c + 1;
    // 这种是灵神新的语法的写法
    // res += cnt.get(y) || 0;
    // cnt.set(y, (cnt.get(y) || 0) + 1);
  }
  return res;
};
