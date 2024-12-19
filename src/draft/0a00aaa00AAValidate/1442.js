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
  let cnt = 0;
  for (let j = 0; j < n; j++) {
    for (let k = j + 1; k < n; k++) {
      // prefix[j-1] - prefix[0] 就是a
      // prefix[k+1] -prefix[j] 就是b
      if (prefix[j - 1] == prefix[k + 1] - prefix[j]) {
        cnt += k - j;
      }
    }
  }
  return cnt;
};
