/**
 * @param {string} s
 * @return {boolean}
 */
var doesAliceWin = function (s) {
  let vowels = ['a', 'e', 'i', 'o', 'u'];
  for (let x of s) {
    if (vowels.includes(x)) return true;
  }
  return false;
};
