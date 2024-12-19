/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function (n) {
  let count = 0;
  while (n) {
    n &= n - 1;
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
  let ans = [];
  let p = 0,
    q = 0;
  for (let i = 0; i < A.length; i++) {
    // 相当于p的第x位是1  q的第y位是1
    let x = A[i],
      y = B[i];
    p |= 1 << x;
    q |= 1 << y;
    ans.push(hammingWeight(p & q));
  }
  return ans;
};
// 找到两个数组的前缀公共数组