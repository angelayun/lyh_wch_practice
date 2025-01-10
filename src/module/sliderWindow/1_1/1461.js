/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
var hasAllCodes = function (s, k) {
  // parseInt("10",2)
  let set = new Set();
  let winS = '';
  const n = s.length;
  for (let i = 0; i < k; i++) {
    winS += s[i];
  }
  set.add(parseInt(winS, 2));
  for (let i = k; i < n; i++) {
    winS = winS.slice(1) + s[i];
    set.add(parseInt(winS, 2));
  }
  // console.log(set)
  /* for (let i = 0; i < 1 << k; i++) {
    if (!set.has(i)) return false;
  }
  return true; */
  return set.size == 1 << k;
};
