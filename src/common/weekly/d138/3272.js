/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var countGoodIntegers = function (n, k) {
  let factorial = new Array(n + 1).fill(0);
  factorial[0] = 1;
  for (let i = 1; i <= n; i++) {
    factorial[i] = factorial[i - 1] * i;
  }
  let ans = 0;
  let vis = new Set();
  let base = Math.pow(10, (n - 1) >> 1);
  for (let i = base; i < base * 10; i++) {
    let preHalf = i.toString();
    let secondHalf = i.toString();
    secondHalf = secondHalf.split('');
    secondHalf.reverse();
    let s = preHalf + secondHalf.join('').substring(n % 2);
    // console.log(i, s);
    // 回文数不能被k整除
    if (BigInt(s) % BigInt(k) > 0n) {
      continue;
    }
    let sortedS = s.split('');
    sortedS.sort((a, b) => a - b);
    if (vis.has(sortedS.join(''))) {
      vis.add(sortedS.join(''));
      continue;
    } else {
      vis.add(sortedS.join(''));
    }
    let cnt = new Array(10).fill(0);
    for (let c of sortedS) {
      cnt[c - '0']++;
    }
    let res = (n - cnt[0]) * factorial[n - 1];
    for (let c of cnt) {
      res = Math.floor(res / factorial[c]);
    }
    ans += res;
  }
  return ans;
};
