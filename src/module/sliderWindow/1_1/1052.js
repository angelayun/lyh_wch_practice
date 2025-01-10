/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} minutes
 * @return {number}
 */
var maxSatisfied = function (customers, grumpy, minutes) {
  // 老板不生气的时候  客户是满意的
  const n = customers.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans += grumpy[i] == 0 ? customers[i] : 0;
  }
  let other = 0;
  for (let i = 0; i < minutes; i++) {
    other += grumpy[i] == 1 ? customers[i] : 0;
  }
  let maxCnt = other;
  for (let i = minutes; i < n; i++) {
    other +=
      (grumpy[i] == 1 ? customers[i] : 0) -
      (grumpy[i - minutes] == 1 ? customers[i - minutes] : 0);
    maxCnt = Math.max(maxCnt, other);
  }
  return ans + maxCnt;
};
