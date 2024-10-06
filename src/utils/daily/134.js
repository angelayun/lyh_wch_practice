/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  const n = gas.length
  let sum = 0
  let minSum = Number.MAX_SAFE_INTEGER
  let ans = 0
  for (let i = 0; i < gas.length; i++) {
    sum += gas[i] - cost[i]
    if (sum < minSum) {
      minSum = sum
      ans = i + 1 // // 注意 s 减去 c 之后，汽车在 i+1 而不是 i
    }
  }
  return sum < 0 ? -1 : ans
};