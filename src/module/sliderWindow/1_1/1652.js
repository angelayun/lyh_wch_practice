/**
 * @param {number[]} code
 * @param {number} k
 * @return {number[]}
 */
var decrypt = function (code, k) {
  const n = code.length;
  // 确定第一个窗口的右端点（左闭右开） 看示例3 k=-2的时候 第一个窗口是最右侧元素向左拿2个
  let r = k > 0 ? k + 1 : n;
  k = Math.abs(k);
  let sum = 0;
  // 右端点确定了之后  求定长窗口
  for (let i = r - k; i < r; i++) {
    sum += code[i];
  }
  let ans = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    ans[i] = sum;
    // 第一个窗口的和求出来  后面的就是移除前面一个  加上后面一个
    sum += code[r % n] - code[(r - k) % n];
    r++;
  }
  return ans;
};
