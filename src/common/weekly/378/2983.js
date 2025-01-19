/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var canMakePalindromeQueries = function (s, queries) {
  let m = s.length;
  let n = m >> 1;
  let sumS = Array.from({ length: n + 1 }, () => new Array(26).fill(0));
  for (let i = 0; i < n; i++) {
    sumS[i + 1] = sumS[i].slice();
    sumS[i + 1][s[i].charCodeAt() - 'a'.charCodeAt()]++;
  }
  let sumT = Array.from({ length: n + 1 }, () => new Array(26).fill(0));
  for (let i = 0; i < n; i++) {
    sumT[i + 1] = sumT[i].slice();
    sumT[i + 1][s[m - 1 - i].charCodeAt() - 'a'.charCodeAt()]++;
  }
  let sumNe = Array.from({ length: n + 1 }, () => 0);
  for (let i = 0; i < n; i++) {
    sumNe[i + 1] = sumNe[i] + (s[i] != s[m - 1 - i] ? 1 : 0);
  }
  const count = (sum, l, r) => {
    let res = sum[r + 1].slice();
    for (let i = 0; i < 26; i++) {
      res[i] -= sum[l][i];
    }
    return res;
  };
  const subtract = (s1, s2) => {
    for (let i = 0; i < 26; i++) {
      s1[i] -= s2[i];
      if (s1[i] < 0) return null;
    }
    return s1;
  };
  const check = (l1, r1, l2, r2, sumS, sumT) => {
    if (
      sumNe[l1] > 0 ||
      sumNe[sumNe.length - 1] - sumNe[Math.max(r1, r2) + 1] > 0
    )
      return false;
    if (r2 <= r1) {
      // 区间包含
      return count(sumS, l1, r1).join(',') == count(sumT, l1, r1).join(',');
    }
    if (r1 < l2) {
      // 区间不相交
      return (
        sumNe[l2] - sumNe[r1 + 1] <= 0 &&
        count(sumS, l1, r1).join(',') == count(sumT, l1, r1).join(',') &&
        count(sumS, l2, r2).join(',') == count(sumT, l2, r2).join(',')
      );
    }
    let s1 = subtract(count(sumS, l1, r1), count(sumT, l1, l2 - 1));
    let s2 = subtract(count(sumT, l2, r2), count(sumS, r1 + 1, r2));
    return s1 != null && s2 != null && s1.join(',') == s2.join(',');
  };
  let ans = new Array(queries.length).fill(false);
  for (let i = 0; i < queries.length; i++) {
    let q = queries[i];
    let [l1, r1] = q;
    let l2 = m - 1 - q[3];
    let r2 = m - 1 - q[2];
    ans[i] =
      l1 <= l2
        ? check(l1, r1, l2, r2, sumS, sumT)
        : check(l2, r2, l1, r1, sumT, sumS);
  }
  return ans;
};
