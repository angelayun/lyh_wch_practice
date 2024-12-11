/**
 * @param {number} label
 * @return {number[]}
 */
var pathInZigZagTree = function (label) {
  let res = [];
  let d = 0;
  // 找到在第几层
  while (Math.pow(2, d + 1) - 1 < label) {
    d++;
  }
  let invert = (d, label) => {
    return Math.pow(2, d) - 1 + Math.pow(2, d) - (label - Math.pow(2, d));
  };
  res.push(label);
  while (d > 0) {
    label = invert(d, label);
    label /= 2;
    res.push(label);
    d--;
  }
  res.reverse();
  return res;
};
