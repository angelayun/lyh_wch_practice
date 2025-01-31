/**
 * @param {string} word
 * @return {boolean}
 */
var isValid = function (word) {
  if (word.length < 3) return false;
  let vowelCount = 0,
    notVowel = 0;
  let arrVowel = ['a', 'e', 'i', 'o', 'u'];
  for (let x of word) {
    if ((x >= 'a' && x <= 'z') || (x >= 'A' && x <= 'Z')) {
      if (arrVowel.indexOf(x.toLowerCase()) > -1) {
        vowelCount++;
      } else {
        notVowel++;
      }
    } else if (x >= 0 && x <= 9) {
      continue;
    } else return false;
  }
  return vowelCount && notVowel;
};
