/**
 * @param {number[]} nums
 * @return {number}
 */
var countPairs = function (nums) {
  // 是从小到大排序  这样避免前导0的情况
  nums.sort((a, b) => a - b);
  let ans = 0;
  let cnt = new Map();
  for (let x of nums) {
    let s = x.toString().split('');
    let m = s.length;
    let st = new Set([x]);
    for (let i = 0; i < m; i++) {
      for (let j = i + 1; j < m; j++) {
        [s[i], s[j]] = [s[j], s[i]]; // 交换一次
        st.add(parseInt(s.join('')));
        for (let p = i + 1; p < m; p++) {
          for (let q = p + 1; q < m; q++) {
            [s[p], s[q]] = [s[q], s[p]]; // 交换两次
            st.add(parseInt(s.join('')));
            [s[p], s[q]] = [s[q], s[p]]; // 交换回来，方便后面循环
          }
        }
        [s[i], s[j]] = [s[j], s[i]]; // 交换回来，方便后面循环
      }
    }
    for (let key of st) {
      ans += cnt.get(key) || 0;
    }
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  return ans;
};
