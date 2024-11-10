/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let cntT = new Array(128).fill(0);
  // 需要统计的字母数量
  let needCount = 0;
  for (let x of t) {
    let index = x.charCodeAt();
    // 第一次加入的
    if (cntT[index] == 0) needCount++;
    cntT[index]++;
  }
  const n = s.length;
  let startEnd = -1,
    rightEnd = n;
  for (let left = 0, right = 0; right < n; right++) {
    // cntS[s[right].charCodeAt()]++;
    cntT[s[right].charCodeAt()]--;
    if (cntT[s[right].charCodeAt()] == 0) needCount--;
    while (needCount == 0) {
      if (right - left < rightEnd - startEnd) {
        rightEnd = right;
        startEnd = left;
      }
      if (cntT[s[left].charCodeAt()] == 0) {
        needCount++;
      }
      cntT[s[left].charCodeAt()]++;
      left++;
    }
  }
  return startEnd == -1 ? '' : s.substring(startEnd, rightEnd + 1);
};
