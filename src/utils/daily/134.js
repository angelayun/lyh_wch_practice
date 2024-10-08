var canCompleteCircuit = function (gas, cost) {
  let ans = 0, minS = 0, s = 0; // s 表示油量，minS 表示最小油量
  for (let i = 0; i < gas.length; i++) {
    s += gas[i] - cost[i]; // 在 i 处加油，然后从 i 到 i+1
    if (s < minS) {
      minS = s; // 更新最小油量
      ans = i + 1; // 注意 s 减去 c 之后，汽车在 i+1 而不是 i
    }
  }
  // 循环结束后，s 即为 gas 之和减去 cost 之和
  return s < 0 ? -1 : ans;
};