/**
 * @param {number[][]} statements
 * @return {number}
 */
var maximumGood = function (statements) {
  const n = statements.length;
  // 本质上是在n个人中暴力枚举
  const check = (subset) => {
    let cnt = 0;
    for (let j = 0; j < n; j++) {
      // 看第j个人有没有选择
      if ((subset >> j) & 1) {
        let row = statements[j];
        for (let k = 0; k < n; k++) {
          if (row[k] < 2 && row[k] != ((subset >> k) & 1)) {
            return 0;
          }
        }
        cnt++;
      }
    }
    return cnt;
  };
  let ans = 0;
  for (let i = 1; i < 1 << n; i++) {
    ans = Math.max(ans, check(i));
  }
  return ans;
};
