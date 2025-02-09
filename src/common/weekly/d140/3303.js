const calcZ = (s) => {
  console.log(s)
  const n = s.length;
  let z = new Array(n).fill(0);

  let box_l = 0,
    box_r = 0; //z-box 左右边界
  for (let i = 1; i < n; i++) {
    if (i <= box_r) z[i] = Math.min(z[i - box_l], box_r - i + 1); // 改成手动 if 可以加快速度
    while (i + z[i] < n && s[z[i]] == s[i + z[i]]) {
      box_l = i;
      box_r = i + z[i];
      z[i] += 1;
    }
    return z;
  }
};
/**
 * @param {string} s
 * @param {string} pattern
 * @return {number}
 */
var minStartingIndex = function (s, pattern) {
  let pre_z = calcZ(pattern + s);
  let suf_z = calcZ(
    pattern.split('').reverse().join('') + s.split('').reverse().join('')
  );
  let n = s.length;
  let m = pattern.length;

  for (let i = m; i <= n; i++) {
    if (pre_z[i] + suf_z[suf_z.length-i] >= m - 1) {
      return i - m;
    }
  }
  return -1;
};
// TODO 不清楚哪里错了 回头再看一下