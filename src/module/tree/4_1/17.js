/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (digits.length == 0) return [];
  let mapping = [
    '',
    '',
    'abc',
    'def',
    'ghi',
    'jkl',
    'mno',
    'pqrs',
    'tuv',
    'wxyz',
  ];
  let ans = [];
  const n = digits.length;
  const dfs = (index, path) => {
    if (index == n) {
      ans.push(path.join(''));
      return;
    }
    for (let s of mapping[digits[index]]) {
      for (let i = 0; i < s.length; i++) {
        path.push(s[i]);
        dfs(index + 1, path);
        path.pop();
      }
    }
  };
  dfs(0, []);
  return ans;
};
