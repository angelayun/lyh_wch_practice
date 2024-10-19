var minDistance = function (word1, word2) {
  if (word1.length < word2.length) {
    [word1, word2] = [word2, word2]
  }
  const n1 = word1.length, n2 = word2.length
  const dp = Array.from({ length: n1 + 1 }, () => new Array(n2 + 1).fill(0))
  for (let i = 0; i < n1; i++) {
    // 边界条件需要处理
    dp[i + 1][0] = i + 1
    console.log(n1, n2,)
    for (let j = 0; j < n2; j++) {
      console.log(word2[j])
      if (word1[i] == word2[j]) {
        dp[i + 1][j + 1] = dp[i][j]
      } else {
        console.log('会进来这里么')
        dp[i + 1][j + 1] = Math.min(dp[i][j + 1], dp[i + 1][j], dp[i][j]) + 1
      }
    }
  }
  console.log(dp)

  return dp[n1][n2]
};