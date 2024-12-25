/**
 * @param {string} s
 * @param {number} numOps
 * @return {number}
 */
var minLength = function (s, numOps) {
  s = s.split('');
  // 开区间的写法
  let left = 0,
    right = s.length;
  const n = s.length;
  const check = (m) => {
    let cnt = 0;
    if (m == 1) {
      // 改成0101
      for (let i = 0; i < n; i++) {
        // 如果s[i]和i的奇偶性不同 则加1
        cnt += (s[i] ^ i) & 1;
      }
      // n-cnt 表示改成1010
      cnt = Math.min(cnt, n - cnt);
    } else {
      let k = 0;
      for (let i = 0; i < n; i++) {
        k++;
        // 到达连续相同的子串的末尾
        if (i == n - 1 || s[i] != s[i + 1]) {
          cnt += ~~(k / (m + 1));
          k = 0;
        }
      }
    }
    return cnt <= numOps;
  };
  while (left + 1 < right) {
    let mid = left + ((right - left) >> 1);
    if (check(mid)) {
      right = mid;
    } else {
      left = mid;
    }
  }
  return right;
};
