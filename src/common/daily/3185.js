var countCompleteDayPairs = function (hours) {
  const H = 24;
  const cnt = Array(H).fill(0);
  let ans = 0;
  for (const t of hours) {
    // 先查询 cnt，再更新 cnt，因为题目要求 i < j
    // 如果先更新，再查询，就把 i = j 的情况也考虑进去了
    ans += cnt[(H - t % H) % H]; // 为什么最后还要%H 是因为24的情况  声明的数组只有[0-23] 
    cnt[t % H]++;
  }
  return ans;
};