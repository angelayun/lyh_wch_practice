const gcd = (a, b) => {
  while (b != 0) {
    [a, b] = [b, a % b];
  }
  return a;
};
const MOD = BigInt(Math.pow(10, 9) + 7);
/**
 * @param {number[]} nums
 * @return {number}
 */
var subsequencePairCount = function (nums) {
  const n = nums.length;
  let m = Math.max(...nums);
  let memo = Array.from({ length: n }, () =>
    Array.from({ length: m + 1 }, () => new Array(m + 1).fill(-1))
  );
  const dfs = (i, j, k) => {
    if (i < 0) {
      return j == k ? 1 : 0;
    }
    if (memo[i][j][k] < 0) {
      let a = dfs(i - 1, j, k);
      let b = dfs(i - 1, gcd(j, nums[i]), k);
      let c = dfs(i - 1, j, gcd(k, nums[i]));
      let res = BigInt(a + b + c);
      let aaa = Number(res % MOD);
      console.log(aaa, res);
      memo[i][j][k] = aaa;
    }
    return memo[i][j][k];
  };
  let res = dfs(n - 1, 0, 0);
  // console.log(res);
  return (res - 1 + Number(MOD)) % Number(MOD);
};
export default subsequencePairCount;
