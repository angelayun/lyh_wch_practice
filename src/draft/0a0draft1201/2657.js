/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function (n) {
  let count = 0;
  while (n) {
    n &= n - 1n;
    count++;
  }
  return count;
};
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
var findThePrefixCommonArray = function (A, B) {
  let p = 0n;
  let q = 0n;
  const n = A.length;
  let res = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let x = A[i];
    let y = B[i];
    p |= 1n << BigInt(x);
    q |= 1n << BigInt(y);
    res[i] = hammingWeight(p & q);
  }
  return res;
};
