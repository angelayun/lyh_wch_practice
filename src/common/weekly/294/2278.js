/**
 * @param {string} s
 * @param {character} letter
 * @return {number}
 */
var percentageLetter = function (s, letter) {
  let cnt = 0;
  for (let x of s) {
    if (x == letter) cnt++;
  }
  // console.log(cnt, s.length, Math.floor(cnt / s.length), )
  return ~~(cnt / s.length * 100);
};
