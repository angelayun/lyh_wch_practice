/**
 * @param {number[]} nums
 * @return {number}
 */
var countPairs = function (nums) {
  nums.sort((a, b) => a - b);
  let cnt = new Map();
  let res = 0;
  for (let x of nums) {
    let s = x.toString().split('');
    let m = s.length;
    let set = new Set([x]);
    for (let i = 0; i < m; i++) {
      for (let j = i + 1; j < m; j++) {
        [s[i], s[j]] = [s[j], s[i]];
        set.add(parseInt(s.join('')));
        for (let p = i + 1; p < m; p++) {
          for (let q = p + 1; q < m; q++) {
            [s[p], s[q]] = [s[q], s[p]];
            set.add(parseInt(s.join('')));
            [s[p], s[q]] = [s[q], s[p]];
          }
        }
        [s[i], s[j]] = [s[j], s[i]];
      }
    }
    for (let v of set) {
      res += cnt.get(v) || 0;
    }
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  return res;
};
