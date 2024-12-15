/**
 * @param {number[]} derived
 * @return {boolean}
 */
var doesValidArrayExist = function (derived) {
  return derived.reduce((prv, cur) => prv ^ cur) == 0;
};
