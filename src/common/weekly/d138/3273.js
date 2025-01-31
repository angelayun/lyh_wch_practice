/**
 * @param {number} power
 * @param {number[]} damage
 * @param {number[]} health
 * @return {number}
 */
var minDamage = function (power, damage, health) {
  const n = health.length;
  let a = Array.from({ length: n }, () => new Array(2).fill(0));
  for (let i = 0; i < n; i++) {
    // a[i][0] = (health[i]-1)/power +1
    a[i][0] = Math.floor((health[i] - 1) / power);
    a[i][1] = damage[i];
  }
  a.sort((p, q) => p[0] * q[1] - q[0] * p[1]);
  let ans = 0n;
  let s = 0n;
  for (let p of a) {
    s += p[0];
    ans += s * p[1];
  }
  return ans;
};
