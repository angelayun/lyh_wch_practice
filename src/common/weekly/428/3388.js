/**
 * @param {number[]} nums
 * @return {number}
 */
var beautifulSplits = function (nums) {
  const n = nums.length;
  // lcp[i][j] 表示 s[i:] 和 s[j:] 的最长公共前缀
  let lcp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = n - 1; j >= i; j--) {
      if (nums[i] == nums[j]) {
        lcp[i][j] = lcp[i + 1][j + 1] + 1;
      }
    }
  }
  let ans = 0;
  for (let i = 1; i < n - 1; i++) {
    // i是第二段最开始的索引  j是第三段最开始的索引
    for (let j = i + 1; j < n; j++) {
      // j−i≤n−j 
      if ((i < j - i && lcp[0][i] >= i) || lcp[i][j] >= j - i) ans++;
    }
  }
  return ans;
};
