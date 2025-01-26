/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
var isItPossible = function (word1, word2) {
  let c1 = new Array(26).fill(0);
  for (let c of word1) {
    c1[c.charCodeAt() - 'a'.charCodeAt()]++;
  }
  let c2 = new Array(26).fill(0);
  for (let c of word2) {
    c2[c.charCodeAt() - 'a'.charCodeAt()]++;
  }
  for (let c = 0; c < 26; c++) {
    let x = c1[i];
    for (let d = 0; d < 26; d++) {
      let y = c2[d];
      if (y == x) {
        if()
      }
    }
  }
};
