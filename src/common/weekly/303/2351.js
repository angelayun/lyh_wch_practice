/**
 * @param {string} s
 * @return {character}
 */
var repeatedCharacter = function (s) {
  let set = new Set();
  for (let x of s) {
    if (set.has(x)) return x;
    set.add(x);
  }
};
/**
 * @param {string} s
 * @return {character}
 */
var repeatedCharacter = function (s) {
  let set = 0;
  for (let x of s) {
    let index = x.charCodeAt() - 'a'.charCodeAt();
    if ((set >> index) & 1) return x;
    set |= 1 << index;
  }
};
