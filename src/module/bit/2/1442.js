/**
 * @param {number[]} arr
 * @return {number}
 */
var countTriplets = function (arr) {
  const n = arr.length;
  let prefix = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] ^ arr[i];
  }
  let res = 0;
  for (let i = 0; i < n; i++) {
    for (let k = i + 1; k < n; k++) {
      if (prefix[i] == prefix[k + 1]) {
        res += k - i;
      }
    }
  }
  return res;
};
// TODO 这个题目先暂时还不是特别理解  等做完前缀和的时候再来温习一遍这个
