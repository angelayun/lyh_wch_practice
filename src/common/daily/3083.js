/**
 * @param {string} s
 * @return {boolean}
 */
var isSubstringPresent = function (s) {
  let cnt = Array.from({ length: 26 }, () => new Array(26).fill(false));
  const n = s.length;
  for (let i = 1; i < n; i++) {
    let x = s[i - 1].charCodeAt() - 'a'.charCodeAt();
    let y = s[i].charCodeAt() - 'a'.charCodeAt();
    cnt[x][y] = true;
  }
  for (let i = 1; i < n; i++) {
    let x = s[i - 1].charCodeAt() - 'a'.charCodeAt();
    let y = s[i].charCodeAt() - 'a'.charCodeAt();
    if (cnt[x][y] && cnt[y][x]) return true;
  }
  return false;
};

/**
 * @param {string} s
 * @return {boolean}
 */
var isSubstringPresent = function (s) {
  let cnt = Array.from({ length: 26 }, () => new Array(26).fill(false));
  const n = s.length;
  for (let i = 1; i < n; i++) {
    let x = s[i - 1].charCodeAt() - 'a'.charCodeAt();
    let y = s[i].charCodeAt() - 'a'.charCodeAt();
    cnt[x][y] = true;
    // 由两次遍历优化到一次遍历  记得应该是cnt[x][y] = true;再判断if(cnt[y][x])
    if (cnt[y][x]) return true;
  }
  return false;
};

/**
 * @param {string} s
 * @return {boolean}
 */
var isSubstringPresent = function (s) {
  let cnt = Array.from({ length: 26 }, () => 0);
  const n = s.length;
  for (let i = 1; i < n; i++) {
    let x = s[i - 1].charCodeAt() - 'a'.charCodeAt();
    let y = s[i].charCodeAt() - 'a'.charCodeAt();
    cnt[x] |= 1 << y;
    if ((cnt[y] >> x) & 1) {
      return true;
    }
  }
  return false;
};
