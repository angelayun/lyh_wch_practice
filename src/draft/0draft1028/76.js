const isCovered = (cntS, cntT) => {
  let n = cntS.length;
  for (let i = 0; i < n; i++) {
    if (cntS[i] < cntT[i]) return false;
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
    cntT[x.charCodeAt()]++;
  }
  const n = s.length;
  let leftStart = -1,
    rightEnd = n + 1;
  for (let left = 0, right = 0; right < n; right++) {
    cntS[s[right].charCodeAt()]++;
    while (isCovered(cntS, cntT)) {
      if (right - left < rightEnd - leftStart) {
        rightEnd = right;
        leftStart = left;
      }
      cntS[s[left].charCodeAt()]--;
      left++;
    }
  }
  return leftStart == -1 ? '' : s.substring(leftStart, rightEnd + 1);
};

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let less = 0;
  let cntT = new Array(128).fill(0);
  for (let x of t) {
    let index = x.charCodeAt();
    if (cntT[index] == 0) less++;
    cntT[index]++;
  }
  const n = s.length;
  let leftStart = -1,
    rightEnd = n + 1;
  for (let left = 0, right = 0; right < n; right++) {
    // cntS[s[right].charCodeAt()]++;
    cntT[s[right].charCodeAt()]--;
    if (cntT[s[right].charCodeAt()] == 0) {
      less--;
    }
    while (less == 0) {
      if (right - left < rightEnd - leftStart) {
        rightEnd = right;
        leftStart = left;
      }
      if (cntT[s[left].charCodeAt()] == 0) {
        less++;
      }
      cntT[s[left].charCodeAt()]++;
      left++;
    }
  }
  return leftStart == -1 ? '' : s.substring(leftStart, rightEnd + 1);
};
