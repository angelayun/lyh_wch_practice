/**
 * @param {string} s
 * @param {string} t
 * @param {number} k
 * @return {boolean}
 */
var isPossibleToRearrange = function (s, t, k) {
  let a = Array.from({ length: k }, () => []);
  let b = Array.from({ length: k }, () => []);
  let n = s.length;
  // 每一段多少个字字符
  k = ~~(n / k);
  console.log(k);
  for (let i = k; i <= n; i += k) {
    console.log(i - k)
    // 这个很妙  这里的i相当于是第几段  i-k又刚刚好是当前段的索引
    // a[i - k].push(s.substring(i - k, i));
    // a[i - k].push(t.substring(i - k, i));
  }
  console.log(a);
  a.sort();
  console.log(a);
  b.sort();
  return a == b;
};
// 上面这个没写出来