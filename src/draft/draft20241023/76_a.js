const isCovered = (cntS, cntT) => {
  // 从a比较到z 是左闭右闭区间
  for (let i = 'A'.charCodeAt(); i <= 'Z'.charCodeAt(); i++) {
    if (cntS[i] < cntT[i]) return false
  }
  for (let i = 'a'.charCodeAt(); i <= 'z'.charCodeAt(); i++) {
    if (cntS[i] < cntT[i]) return false
  }
  return true;
}
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let cntS = new Array(128).fill(0)
  let cntT = new Array(128).fill(0)
  for (let x of t) {
    let index = x.charCodeAt()
    cntT[index]++
  }
  let n = s.length
  let ansLeft = -1, ansRight = n;
  for (let left = 0, right = 0; right < n; right++) {
    cntS[s[right].charCodeAt()]++
    while (isCovered(cntS, cntT)) {
      // 收缩窗口  比较长度
      if (right - left < ansRight - ansLeft) {
        ansLeft = left
        ansRight = right
      }
      cntS[s[left].charCodeAt()]--
      left++
    }
  }
  return ansLeft == -1 ? "" : s.substring(ansLeft, ansRight + 1)
};



// 自己写优化的写法
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let validCount = 0
  let cntT = new Array(128).fill(0)
  for (let x of t) {
    let index = x.charCodeAt()
    if (cntT[index] == 0) validCount++
    cntT[index]++
  }
  let n = s.length
  let ansLeft = -1, ansRight = n;
  for (let left = 0, right = 0; right < n; right++) {
    cntT[s[right].charCodeAt()]--
    if (cntT[s[right].charCodeAt()] == 0) {
      validCount--
    }
    while (validCount == 0) {
      // 收缩窗口  比较长度
      if (right - left < ansRight - ansLeft) {
        ansLeft = left
        ansRight = right
      }
      if (cntT[s[left].charCodeAt()] == 0) {
        validCount++
      }
      cntT[s[left].charCodeAt()]++
      left++
    }
  }
  return ansLeft == -1 ? "" : s.substring(ansLeft, ansRight + 1)
};