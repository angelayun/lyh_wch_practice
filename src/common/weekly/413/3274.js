/**
 * @param {string} coordinate1
 * @param {string} coordinate2
 * @return {boolean}
 */
var checkTwoChessboards = function (s, t) {
  return ((s[0].charCodeAt() ^ s[1]) & 1) === ((t[0].charCodeAt() ^ t[1]) & 1);
};
