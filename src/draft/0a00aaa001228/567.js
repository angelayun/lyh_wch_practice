/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  let need = new Array(26).fill(0);
  for (let x of s1) {
    need[x.charCodeAt() - 'a'.charCodeAt()]++;
  }
  const n = s2.length;
  let winCnt = new Array(26).fill(0);
  const check = (need, winCnt) => {
    for (let i = 0; i < 26; i++) {
      if (need[i] != winCnt[i]) return false;
    }
    return true;
  };
  for (let left = 0, right = 0; right < n; right++) {
    let x = s2[right].charCodeAt() - 'a'.charCodeAt();
    winCnt[x]++;
    while (winCnt[x] > need[x]) {
      // 收缩窗口
      let y = s2[left].charCodeAt() - 'a'.charCodeAt();
      winCnt[y]--;
      left++;
    }
    if (check(need, winCnt)) {
      return true;
    }
  }
  return false;
};
