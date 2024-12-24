/**
 * @param {number[]} nums
 * @return {number}
 */
var countPairs = function (nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let cnt = new Map();
  let res = 0;
  for (let x of nums) {
    let set = new Set([x]);
    let s = x.toString().split('');
    const m = s.length;
    for (let i = 0; i < m; i++) {
      for (let j = i + 1; j < m; j++) {
        [s[i], s[j]] = [s[j], s[i]]; // 交换一次
        set.add(parseInt(s.join('')));
        for (let p = i + 1; p < m; p++) {
          for (let q = p + 1; q < m; q++) {
            [s[p], s[q]] = [s[q], s[p]]; // 交换两次
            set.add(parseInt(s.join('')));
            [s[p], s[q]] = [s[q], s[p]];
          }
        }
        [s[i], s[j]] = [s[j], s[i]];
      }
    }
    for (let v of set.keys()) {
      res += cnt.get(v) || 0;
    }
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  return res;
};
