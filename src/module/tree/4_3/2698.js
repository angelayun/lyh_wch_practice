// p是起始位置   sum分割的字符串的和  s是整个字符串  i是当前值
function dfs(p, sum, s, i) {
  const n = s.length;
  if (p === n) {
    // 递归终点
    return sum === i; // i 符合要求
  }
  let x = 0;
  for (let j = p; j < n; j++) {
    // 枚举分割出从 s[p] 到 s[j] 的子串
    x = x * 10 + parseInt(s[j]); // 子串对应的整数值
    // 以10举例来说 最开始它只有10*10=100  1 81
    if (dfs(j + 1, sum + x, s, i)) {
      return true;
    }
  }
  return false;
}
// 以9来举例  9*9=81  => 8+1=9
const PRE_SUM = new Array(1001).fill(0);
for (let i = 1; i <= 1000; i++) {
  const s = (i * i).toString();
  PRE_SUM[i] = PRE_SUM[i - 1] + (dfs(0, 0, s, i) ? i * i : 0);
}

var punishmentNumber = function (n) {
  return PRE_SUM[n];
};
