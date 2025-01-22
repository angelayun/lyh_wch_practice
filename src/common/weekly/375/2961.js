/**
 * @param {number[][]} variables
 * @param {number} target
 * @return {number[]}
 */
var getGoodIndices = function (variables, target) {
  let ans = [];
  for (let i = 0; i < variables.length; i++) {
    let [a, b, c, m] = variables[i];
    if (Math.pow(Math.pow(a, b) % 10, c) % m == target) {
      ans.push(i);
    }
  }
  return ans;
};
// 上面的通不过
var getGoodIndices = function (variables, target) {
  const ans = [];
  for (let i = 0; i < variables.length; i++) {
    const [a, b, c, m] = variables[i];
    if (pow(pow(a, b, 10), c, m) === target) {
      ans.push(i);
    }
  }
  return ans;
};

// 本题 mod 很小，即使平方也不会超过 MAX_SAFE_INTEGER 范围，所以不需要用 BigInt
function pow(x, n, mod) {
  let res = 1;
  while (n) {
    if (n % 2) {
      res = res * x % mod;
    }
    x = x * x % mod;
    n = Math.floor(n / 2);
  }
  return res;
}