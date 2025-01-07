var latestTimeCatchTheBus = function (buses, passengers, capacity) {
  buses.sort((a, b) => a - b);
  passengers.sort((a, b) => a - b);

  // 模拟乘客上车
  let j = 0,
  // c 最后一班公交还有空位
    c;
  for (const t of buses) {
    // t为公交车最晚出发时间
    for (
      c = capacity;
      // passengers[j] <= t 到达时间小于出发时间
      // capacity 每辆公交车 最多 能容纳的乘客数目
      c > 0 && j < passengers.length && passengers[j] <= t;
      c--
    ) {
      j++;
    }
  }

  // 寻找插队时机
  j--;
  let ans = c > 0 ? buses[buses.length - 1] : passengers[j];
  while (j >= 0 && ans === passengers[j]) {
    ans--; // 往前找没人到达的时刻
    j--;
  }
  return ans;
};
