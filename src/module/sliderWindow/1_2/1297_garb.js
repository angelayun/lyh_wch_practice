/**
 * @param {string} s
 * @param {number} maxLetters
 * @param {number} minSize
 * @param {number} maxSize
 * @return {number}
 */
var maxFreq = function (s, maxLetters, minSize, maxSize) {
  let ansCnt = new Map();
  let cnt = new Array(26).fill(0);
  let diffCount = 0;
  const n = s.length;
  debugger;
  for (let left = 0, right = 0; right < n; right++) {
    let index = s[right].charCodeAt() - 'a'.charCodeAt();
    if (cnt[index] == 0) diffCount++;
    cnt[index]++;
    let len = right - left + 1;
    while (len > maxSize && diffCount > maxLetters) {
      let yIndex = s[left].charCodeAt() - 'a'.charCodeAt();
      cnt[yIndex]--;
      if (cnt[yIndex] == 0) diffCount--;
      left++;
    }

    if (len >= minSize && len <= maxSize) {
      let cur = s.slice(left, right + 1);
      ansCnt.set(cur, (ansCnt.get(cur) || 0) + 1);
    }
    console.log(left, right);
  }
  let temp = Array.from(ansCnt);
  temp.sort((a, b) => b[1] - a[1]);
  return temp.length ? temp[0][0] : '';
};
// 不知道 怎么让这个  这个没过
// export default maxFreq;
// TODO 这个写的七七八八的  过不了
