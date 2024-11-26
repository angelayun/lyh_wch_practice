// ls的俩思路
var winningPlayerCount = function (n, pick) {
  const cnts = Array.from({ length: n }, () => Array(11).fill(0));
  for (const [x, y] of pick) {
    cnts[x][y]++;
  }

  let ans = 0;
  for (let i = 0; i < n; i++) {
    if (cnts[i].some((c) => c > i)) {
      ans++;
    }
  }
  return ans;
};

var winningPlayerCount = function (n, pick) {
  let ans = 0;
  const cnts = Array.from({ length: n }, () => Array(11).fill(0));
  const won = Array(n).fill(false);
  for (const [x, y] of pick) {
    if (!won[x] && ++cnts[x][y] > x) {
      won[x] = true;
      ans++;
    }
  }
  return ans;
};
