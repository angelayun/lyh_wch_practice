/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {number}
 */
var findMinimumOperations = function (s1, s2, s3) {
  // 先求最长公共前缀
  let s1Len = s1.length,
    s2Len = s2.length,
    s3Len = s3.length;
  let i = 0;
  for (; i < Math.min(s1Len, s2Len, s3Len); i++) {
    if (s1[i] != s2[i] || s2[i] != s3[i]) break;
  }
  // 没有任何公共前缀
  if (i == 0) return -1;
  return s1Len - i + (s2Len - i) + (s3Len - i);
};
