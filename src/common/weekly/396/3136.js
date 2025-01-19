/**
 * @param {string} word
 * @return {boolean}
 */
var isValid = function (word) {
  if (word.length < 3) return false;
  const isLetter = (c) => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
  const isDigit = (c) => c != ' ' && c >= 0 && c <= 9;
  let hasVowel = false,
    hasConsonant = false;
  for (let w of word) {
    if (isLetter(w)) {
      if (['a', 'e', 'i', 'o', 'u'].includes(w.toLowerCase())) hasVowel = true;
      else hasConsonant = true;
    } else if (!isDigit(w)) {
      console.log(w);
      // 包含了除字母和数字之外的字符
      return false;
    }
  }
  // 既要有元音字母  又要有  辅音字母
  return hasVowel && hasConsonant;
};
