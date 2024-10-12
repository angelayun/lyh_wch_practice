/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */
var xorQueries = function (arr, queries) {
  let n = arr.length
  let xors = new Array(n + 1).fill(0)
  for (let i = 0; i < n; i++) {
    xors[i + 1] ^= xors[i] ^ arr[i]
  }
  const m = queries.length
  let ans = []
  for (let [start, end] of queries) {
    ans.push(xors[end] ^ xors[start - 1])
  }
  return ans
};