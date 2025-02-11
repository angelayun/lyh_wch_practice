/**
 * @param {string[]} words
 * @return {string}
 */
var oddString = function (words) {
  let cnt = new Map();
  for (let word of words) {
    let n = word.length;
    let diff = [];
    for (let i = 1; i < n; i++) {
      diff.push(word[i].charCodeAt() - word[i - 1].charCodeAt());
    }
    // console.log(diff)
    let list = [];
    let key = diff.join(',');
    if (cnt.has(key)) {
      list = cnt.get(key);
    }
    list.push(word)
    cnt.set(key, list);
  }
  // console.log(cnt)
  for (let [key, val] of cnt) {
    if (val.length == 1) return val[0];
  }
};
