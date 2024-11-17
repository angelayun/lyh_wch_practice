var minFlips = function (a) {
  const m = a.length,
    n = a[0].length;
  let ans = 0;
  for (let i = 0; i < Math.floor(m / 2); i++) {
    for (let j = 0; j < Math.floor(n / 2); j++) {
      const cnt1 =
        a[i][j] + a[i][n - 1 - j] + a[m - 1 - i][j] + a[m - 1 - i][n - 1 - j];
      ans += Math.min(cnt1, 4 - cnt1); // 全为 1 或全为 0
    }
  }

  if (m % 2 && n % 2) {
    // 正中间的数必须是 0
    ans += a[Math.floor(m / 2)][Math.floor(n / 2)];
  }

  let diff = 0,
    cnt1 = 0;
  if (m % 2) {
    // 统计正中间这一排
    for (let j = 0; j < Math.floor(n / 2); j++) {
      if (a[Math.floor(m / 2)][j] !== a[Math.floor(m / 2)][n - 1 - j]) {
        diff++;
      } else {
        cnt1 += a[Math.floor(m / 2)][j] * 2;
      }
    }
  }
  if (n % 2) {
    // 统计正中间这一列
    for (let i = 0; i < Math.floor(m / 2); i++) {
      if (a[i][Math.floor(n / 2)] !== a[m - 1 - i][Math.floor(n / 2)]) {
        diff++;
      } else {
        cnt1 += a[i][Math.floor(n / 2)] * 2;
      }
    }
  }

  return ans + (diff ? diff : cnt1 % 4);
};
// 说句实话我没太听明白
