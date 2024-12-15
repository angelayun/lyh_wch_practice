/**
 * @param {number[]} derived
 * @return {boolean}
 */
var doesValidArrayExist = function (derived) {
  return derived.reduce((pre, cur) => pre ^ cur) == 0;
};
