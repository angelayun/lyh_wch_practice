/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var validSubstringCount = function (word1, word2) {
  let needCount = 0;
  let needMap = new Array(26).fill(0);
  for (let x of word2) {
    let index = x.charCodeAt() - 'a'.charCodeAt();
    if (needMap[index] == 0) needCount++;
    needMap[index]++;
  }
  let cnt = 0;
  for (let left = 0, right = 0; right < word1.length; right++) {
    let index = word1[right].charCodeAt() - 'a'.charCodeAt();
    needMap[index]--;
    if (needMap[index] == 0) {
      needCount--;
    }
    while (needCount == 0) {
      let yIndex = word1[left].charCodeAt() - 'a'.charCodeAt();
      if (needMap[yIndex] == 0) {
        needCount++;
      }
      needMap[yIndex]++;
      left++;
    }
    cnt += left;
  }
  return cnt;
};
