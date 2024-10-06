/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
var carFleet = function (target, position, speed) {
  const n = position.length
  let nums = []
  for (let i = 0; i < position.length; i++) {
    nums.push([position[i], speed[i]])
  }
  // 按照位置从小到大排序
  nums.sort((a, b) => a[0] - b[0])
  let stack = []
  for (let [pos, spd] of nums) {
    let time = Math.ceil(target - pos) / spd
    while (stack.length && stack[stack.length - 1] < time) {
      // 上一个车到达目的地花费的时间比当前车要小  则表示可以合成一个车队
      stack.pop()
    }
    stack.push(time)
  }
  return stack.length
};