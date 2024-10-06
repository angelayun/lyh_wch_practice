/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimalKSum = function (nums, k) {
  let ans = 0n
  nums.push(0)
  nums.push(Infinity)
  nums.sort((a, b) => a - b)
  for (let i = 0; i < nums.length - 1; i++) {
    let x = nums[i], y = nums[i + 1]
    // 可以填充的数字个数
    let fill = y - x - 1
    // 没有可以填充的
    if (fill <= 0) continue
    if (fill >= k) {
      // 填充剩余k个数  首项是x 末项是 x+k+1
      return Number(ans + BigInt(~~(BigInt(
        BigInt(x * 2 + 1 + k) * BigInt(k)) / 2n))
      )
    }
    ans += BigInt(~~(BigInt((x + y) * fill) / 2n))
    k -= fill
  }

};