/**
 * @param {number[]} encoded
 * @param {number} first
 * @return {number[]}
 */
var decode = function (encoded, first) {
  const n = encoded.length;
  let arr = new Array(n + 1).fill(0);
  arr[0] = first;
  for (let i = 0; i < n; i++) {
    arr[i + 1] = arr[i] ^ encoded[i];
  }
  return arr;
};
