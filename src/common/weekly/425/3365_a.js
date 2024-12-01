/**
 * @param {string} s
 * @param {string} t
 * @param {number} k
 * @return {boolean}
 */
var isPossibleToRearrange = function (s, t, k) {
  let n = s.length;
  let x = ~~(n / k);
  let sArr = Array.from({ length: x }, () => []);
  let tArr = Array.from({ length: x }, () => []);
  console.log(x);
  for (let i = 0; i < n; i += x) {
    console.log(i, i / x);
    sArr[i / x].push(s.substring(i, x));
    tArr[i / x].push(t.substring(i, x));
  }
  sArr.sort();
  tArr.sort();
  console.log(sArr, tArr);
  return sArr == tArr;
};
