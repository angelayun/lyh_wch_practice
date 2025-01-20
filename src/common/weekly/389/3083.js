/**
 * @param {string} s
 * @return {boolean}
 */
var isSubstringPresent = function (s) {
  let set = new Set();
  for (let i = 0; i < s.length - 1; i++) {
    let x = s[i],
      y = s[i + 1];
    set.add(`${x},${y}`);
    if (set.has(`${y},${x}`)) return true;
  }
  return false;
};
