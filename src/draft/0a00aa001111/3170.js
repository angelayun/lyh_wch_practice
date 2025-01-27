/**
 * @param {string} s
 * @return {string}
 */
var clearStars = function (s) {
  let stack = Array.from({ length: 26 }, () => []);
  let deleteSet = new Set();
  for (let i = 0; i < s.length; i++) {
    let x = s[i];
    if (x == '*') {
      for (let j = 0; j < 26; j++) {
        if (stack[j].length) {
          deleteSet.add(stack[j].pop());
          break;
        }
      }
      deleteSet.add(i);
    } else {
      // console.log(x.charCodeAt() - 'a'.charCodeAt())
      stack[x.charCodeAt() - 'a'.charCodeAt()].push(i);
    }
  }
  let ans = [];
  for (let i = 0; i < s.length; i++) {
    if (deleteSet.has(i)) continue;
    ans.push(s[i]);
  }
  return ans.join('');
};
