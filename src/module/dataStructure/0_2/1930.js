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
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubsequence = function (s) {
  let pre = new Array(26).fill(0);
  let suf = new Array(26).fill(0);
  let has = new Array(26).fill(0);
  const n = s.length;
  for (let c of s) {
    suf[c.charCodeAt() - 'a'.charCodeAt()]++;
  }
  for (let i = 0; i < n - 1; i++) {
    // 枚举回文子序列的中间字符
    let index = s[i].charCodeAt() - 'a'.charCodeAt();
    suf[index]--;
    for (let j = 0; j < 26; j++) {
      // 枚举中间字符的左右字符
      if (pre[j] && suf[j]) {
        // 找到了一个回文子序列
        has[index] |= 1 << j;
      }
    }
    pre[index]++;
  }
  let ans = 0;
  for (let x of has) {
    // 累加二进制中 1 的个数即为答案
    ans += hammingWeight(x);
  }
  return ans;
};
