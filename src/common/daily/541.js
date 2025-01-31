/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  const n = s.length;
  let res = [];
  for (let i = 0; i < n; i += 2 * k) {
    let t = s.slice(i, i + k);
    // console.log(t)
    t = t.split('').reverse();
    res.push(t.join(''));
    if (i + k < n) {
      // console.log(s.slice(i + k, i + 2 * k))

      res.push(s.slice(i + k, i + 2 * k));
    }
  }
  return res.join('');
};
