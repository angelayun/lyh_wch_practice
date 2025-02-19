/**
 * @param {string} target
 * @return {string[]}
 */
var stringSequence = function (target) {
  let ans = [];
  let s = '';
  for (let i = 0; i < target.length; i++) {
    let c = target.charCodeAt(i);
    s += 'a';
    for (let j = 'a'.charCodeAt(0); j <= c; j++) {
      let newS = s.slice(0, -1) + String.fromCharCode(j);
      ans.push(newS);
      s = newS;
    }
  }
  return ans;
};
