/**
 * @param {number} n
 * @return {number}
 */
var smallestNumber = function (n) {
  return (1 << (32 - Math.clz32(n))) - 1;
};
