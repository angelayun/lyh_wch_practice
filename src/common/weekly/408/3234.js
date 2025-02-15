/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function (S) {
  let s = S.split('');
  let n = s.length;
  let m = 0;
  let a = new Array(n + 1).fill(0);

  for (let i = 0; i < n; i++) {
    if (s[i] === '0') {
      a[m++] = i;
    }
  }

  let tot1 = n - m;
  a[m] = n; // 哨兵值

  let ans = 0;
  let i = 0; // >= left 的第一个 0 的下标是 a[i]
  for (let left = 0; left < n; left++) {
    if (s[left] === '1') {
      ans += a[i] - left; // 不含 0 的子串个数
    }
    for (let k = i; k < m; k++) {
      let cnt0 = k - i + 1;
      if (cnt0 * cnt0 > tot1) {
        break;
      }
      let cnt1 = a[k] - left - (k - i);
      ans += Math.max(a[k + 1] - a[k] - Math.max(cnt0 * cnt0 - cnt1, 0), 0);
    }
    if (s[left] === '0') {
      i++; // 这个 0 后面不会再枚举到了
    }
  }
  return ans;
};
