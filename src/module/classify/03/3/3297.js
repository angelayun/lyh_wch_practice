/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var validSubstringCount = function (word1, word2) {
  let needMap = new Array(26).fill(0);
  for (let x of word2) {
    let index = x.charCodeAt() - 'a'.charCodeAt();
    needMap[index]++;
  }
  const check = (needMap, winMap) => {
    for (let i = 0; i < 26; i++) {
      if (winMap[i] < needMap[i]) return false;
    }
    return true;
  };
  const n = word1.length;
  let winMap = new Array(26).fill(0);
  let ans = 0;
  for (let left = 0, right = 0; right < n; right++) {
    let index = word1[right].charCodeAt() - 'a'.charCodeAt();
    winMap[index]++;
    while (check(needMap, winMap)) {
      let yIndex = word1[left++].charCodeAt() - 'a'.charCodeAt();
      winMap[yIndex]--;
    }
    ans += left;
  }
  return ans;
};

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var validSubstringCount = function (word1, word2) {
  let needMap = new Array(26).fill(0);
  // word2 总体需要的字符个数
  let needCount = 0;
  for (let x of word2) {
    let index = x.charCodeAt() - 'a'.charCodeAt();
    if (needMap[index] == 0) needCount++;
    needMap[index]++;
  }
  const n = word1.length;
  let ans = 0;
  for (let left = 0, right = 0; right < n; right++) {
    let index = word1[right].charCodeAt() - 'a'.charCodeAt();
    needMap[index]--;
    if (needMap[index] == 0) {
      needCount--;
    }
    while (needCount == 0) {
      let yIndex = word1[left++].charCodeAt() - 'a'.charCodeAt();
      if (needMap[yIndex] == 0) {
        needCount++;
      }
      needMap[yIndex]++;
    }
    ans += left;
  }
  return ans;
};
