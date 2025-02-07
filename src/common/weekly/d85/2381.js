/**
 * @param {string} s
 * @param {number[][]} shifts
 * @return {string}
 */
var shiftingLetters = function (s, shifts) {
  const n = s.length;
  let diff = new Array(n + 1).fill(0);
  for (let [start, end, dir] of shifts) {
    let d = 2 * dir - 1;
    diff[start] += d;
    diff[end + 1] -= d;
  }
  s = s.split('');
  let preSum = 0;
  for (let i = 0; i < n; i++) {
    preSum += diff[i];
    s[i] = String.fromCharCode(
      ((((s[i].charCodeAt() - 'a'.charCodeAt() + preSum) % 26) + 26) % 26) +
        'a'.charCodeAt()
    );
  }
  return s.join('');
};
