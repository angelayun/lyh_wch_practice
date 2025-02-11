/**
 * @param {string} target
 * @return {string[]}
 */
var stringSequence = function (target) {
  let ans = [];
  let s = '';
  for (let i = 0; i < target.length; i++) {
    let newStr = s + 'a';
    for (let j = 'a'.charCodeAt(); j <= target[i].charCodeAt(); j++) {
      newStr = newStr.slice(0, -1) + String.fromCharCode(j);
      ans.push(newStr);
    }
    s = newStr;
  }
  return ans;
};
