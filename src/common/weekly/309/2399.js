/**
 * @param {string} s
 * @param {number[]} distance
 * @return {boolean}
 */
var checkDistances = function (s, distance) {
  const n = s.length;
  let pre = new Array(26).fill(-1);
  for (let i = 0; i < n; i++) {
    let x = s[i];
    let index = x.charCodeAt() - 'a'.charCodeAt();
    if (pre[index] == -1) {
      pre[index] = i;
    } else {
      let dis = i - pre[index] - 1;
      // console.log(index, dis)
      if (distance[index] != dis) return false;
    }
  }
  return true;
};
// 下面一版是参照灵神的代码优化后的代码
/**
 * @param {string} s
 * @param {number[]} distance
 * @return {boolean}
 */
var checkDistances = function (s, distance) {
  const n = s.length;
  let pre = new Array(26).fill(0);
  for (let i = 0; i < n; i++) {
    let x = s[i];
    let index = x.charCodeAt() - 'a'.charCodeAt();
    if (pre[index]) {
      let dis = i - pre[index];
      // console.log(index, dis)
      if (distance[index] != dis) return false;
    } 
    pre[index] = i + 1;
  }
  return true;
};
