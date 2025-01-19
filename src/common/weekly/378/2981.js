/**
 * @param {string} s
 * @return {number}
 */
var maximumLength = function (s) {
  let groups = Array.from({ length: 26 }, () => []);
  // 单个字母连续出现的次数
  let cnt = 0;
  const n = s.length;
  for (let i = 0; i < n; i++) {
    cnt++;
    if (i == n - 1 || s[i] != s[i + 1]) {
      groups[s[i].charCodeAt() - 'a'.charCodeAt()].push(cnt);
      cnt = 0;
    }
  }
  let ans = 0;
  for (let x of groups) {
    if (x.length == 0) continue;
    // 从大到小排序
    x.sort((a, b) => b - a);
    // 有种哨兵模式的感觉在里面
    x.push(0);
    x.push(0);
    let [l1, l2, l3] = x;
    ans = Math.max(l1 - 2, Math.min(l2, l1 - 1), l3);
  }
  return ans > 0 ? ans : -1;
};
