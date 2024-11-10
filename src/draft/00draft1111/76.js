let isConvered = (cntS, cntT) => {
  for (let i = 0; i < 128; i++) {
    if (cntT[i] > cntS[i]) return false;
    // if (cntS[i] < cntT[i]) return false;
  }
  return true;
};
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let cntS = new Array(128).fill(0);
  let cntT = new Array(128).fill(0);
  for (let x of t) {
    let index = x.charCodeAt();
    cntT[index]++;
  }
  const n = s.length;
  let startEnd = -1,
    rightEnd = n;
  for (let left = 0, right = 0; right < n; right++) {
    cntS[s[right].charCodeAt()]++;
    while (isConvered(cntS, cntT)) {
      if (right - left < rightEnd - startEnd) {
        rightEnd = right;
        startEnd = left;
      }
      cntS[s[left].charCodeAt()]--;
      left++;
    }
  }
  return startEnd == -1 ? '' : s.substring(startEnd, rightEnd + 1);
};
