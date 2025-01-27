/**
 * @param {number[]} nums
 * @return {number}
 */
var countPairs = function (nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let ans = 0;
  let cnt = new Map();
  for (let x of nums) {
    let t = x.toString().split('');
    let m = t.length;
    let set = new Set([x]);
    for (let i = 0; i < m; i++) {
      for (let j = i + 1; j < m; j++) {
        [t[i], t[j]] = [t[j], t[i]];
        set.add(parseInt(t.join('')));
        for (let p = i + 1; p < m; p++) {
          for (let q = p + 1; q < m; q++) {
            [t[p], t[q]] = [t[q], t[p]];
            set.add(parseInt(t.join('')));
            [t[q], t[p]] = [t[p], t[q]];
          }
        }
        [t[i], t[j]] = [t[j], t[i]];
      }
    }
    for (let y of set) {
      ans += cnt.get(y) ?? 0;
    }
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  return ans;
};
