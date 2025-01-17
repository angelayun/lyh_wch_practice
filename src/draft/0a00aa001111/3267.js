/**
 * @param {number[]} nums
 * @return {number}
 */
var countPairs = function (nums) {
  nums.sort((a, b) => a - b);
  let cnt = new Map();
  let ans = 0;
  for (let x of nums) {
    let set = new Set([x]);
    let t = x.toString().split('');
    let m = t.length;
    for (let i = 0; i < m; i++) {
      for (let j = i + 1; j < m; j++) {
        [t[i], t[j]] = [t[j], t[i]];
        set.add(parseInt(t.join('')));
        for (let p = i + 1; p < m; p++) {
          for (let q = p + 1; q < m; q++) {
            [t[p], t[q]] = [t[q], t[p]];
            set.add(parseInt(t.join('')));
            [t[p], t[q]] = [t[q], t[p]];
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
