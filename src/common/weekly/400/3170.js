/**
 * @param {string} s
 * @return {string}
 */
var clearStars = function (s) {
  let stack = Array.from({ length: 26 }, () => []);
  let deleteSet = new Set();
  for (let i = 0; i < s.length; i++) {
    let x = s[i];
    if (x != '*') {
      let index = x.charCodeAt() - 'a'.charCodeAt();
      stack[index].push(i);
    } else {
      deleteSet.add(i);
      // 删除靠近*号最右边字典序最小的字符
      for (let j = 0; j < 26; j++) {
        if (stack[j].length) {
          let k = stack[j].pop();
          deleteSet.add(k);
          break;
        }
      }
    }
  }
  let ans = [];
  for (let i = 0; i < s.length; i++) {
    if (!deleteSet.has(i)) ans.push(s[i]);
  }
  return ans.join('');
};
