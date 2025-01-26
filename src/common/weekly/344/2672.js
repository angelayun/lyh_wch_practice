/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var colorTheArray = function (n, queries) {
  let a = new Array(n).fill(0);
  let ans = [];
  let cnt = 0;
  for (let j = 0; j < queries.length; j++) {
    let [i, c] = queries[j]
    if (a[i]) {
      // 之前操作过  把之前的影响削除掉
      if (i && a[i] == a[i - 1]) cnt -= 1;
      if (i < n - 1 && a[i] == a[i + 1]) cnt -= 1;
    }
    a[i] = c;
    if (i && a[i] == a[i - 1]) cnt += 1;
    if (i < n - 1 && a[i] == a[i + 1]) cnt += 1;
    ans.push(cnt);
  }
  return ans;
};
