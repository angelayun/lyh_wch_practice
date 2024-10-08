/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countPartitions = function (nums, k) {
  const MOD = 10 ** 9 + 7
  let sum = 0n
  for (let x of nums) {
    sum += BigInt(x)
  }
  if (sum < BigInt(k * 2)) return 0
  let ans = 1n
  let f = new Array(k).fill(0)
  f[0] = 1
  for (let x of nums) {
    ans = ans * 2n % BigInt(MOD)
    for (let j = x - 1; j >= x; j--) {
      f[j] = (f[j] + f[j - x] % MOD) % MOD
    }
  }
  for (let x of f) {
    // ans = (ans - BigInt(x * 2 % MOD) + BigInt(MOD)) % BigInt(MOD)
  }
  return ans
};