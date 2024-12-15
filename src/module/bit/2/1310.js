/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */
var xorQueries = function (arr, queries) {
  const n = arr.length;
  let prefix = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] ^ arr[i];
  }
  let m = queries.length;
  let res = new Array(m).fill(0);
  for (let i = 0; i < m; i++) {
    let [l, r] = queries[i];
    res[i] = prefix[r + 1] ^ prefix[l];
  }
  return res;
};
