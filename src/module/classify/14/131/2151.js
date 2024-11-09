/**
 * @param {number[][]} statements
 * @return {number}
 */
var maximumGood = function (statements) {
  let ans = 0;
  const n = statements.length;
  const check = (i) => {
    let cnt = 0;
    for (let j = 0; j < n; j++) {
      let row = statements[j];
      if ((i >> j) & 1) {
        // 枚举 i 中的好人 j
        for (let k = 0; k < n; k++) {
          // 枚举 j 的所有陈述  判断 i 中好人的陈述是否与实际情况矛盾，若不矛盾则 i 为一种合法的情况
          if (row[k] < 2 && row[k] != ((i >> k) & 1)) {
            return 0;
          }
        }
        cnt++;
      }
    }
    return cnt;
  };
  for (let i = 1; i < 1 << n; i++) {
    // i事实上是一个集合 如果位上是1则表示是对应索引位上的人是好人  否则是好人
    ans = Math.max(ans, check(i));
  }
  return ans;
};
