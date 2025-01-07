/**
 * @param {string} target
 * @return {string[]}
 */
var stringSequence = function (target) {
  let result = [];
  let current = '';
  for (let i = 0; i < target.length; i++) {
    let nextChar = 'a';
    while (nextChar <= target[i]) {
      let newStr = '';
      if (i == 0) newStr = nextChar;
      else newStr = current + nextChar;
      result.push(newStr);
      nextChar = String.fromCharCode(nextChar.charCodeAt() + 1);
    }
    current += target[i];
  }
  return result;
};
