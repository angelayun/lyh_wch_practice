var winningPlayerCount = function (n, pick) {
  const cnt = Array.from({ length: n }, () => new Array(11).fill(0));
  for (let [x, y] of pick) {
    cnt[x][y]++;
  }
  let ans = 0;
  for (let i = 0; i < n; i++) {
    if (cnt[i].some((c, i) => c > i)) {
      ans++;
    }
  }
  return ans;
};
// 在上面二遍的基础上优化为一次遍历
var winningPlayerCount = function (n, pick) {
  const cnt = Array.from({ length: n }, () => new Array(11).fill(0));
  let ans = 0;
  let win = new Array(n).fill(false);
  for (let [x, y] of pick) {
    if (!win[x] && ++cnt[x][y] > x) {
      win[x] = true;
      ans++;
    }
  }
  return ans;
};
