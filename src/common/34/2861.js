var maxNumberOfAlloys = function (n, k, budget, composition, stock, cost) {
  let ans = 0;
  // 假设 composition[i][j] 和 cost[j] 都是 1，此时可以制造最多的合金，个数为 min(stock)+budget。
  const mx = Math.min(...stock) + budget;
  for (const comp of composition) {
    function check(num) {
      let money = 0;
      for (let i = 0; i < n; i++) {
        if (stock[i] < comp[i] * num) {
          money += (comp[i] * num - stock[i]) * cost[i];
          if (money > budget) {
            return false;
          }
        }
      }
      return true;
    }
    let left = ans, right = mx + 1;
    while (left + 1 < right) { // 开区间写法
      const mid = Math.floor((left + right) / 2);
      if (check(mid)) {
        left = mid;
      } else {
        right = mid;
      }
    }
    ans = left;
  }
  return ans;
};