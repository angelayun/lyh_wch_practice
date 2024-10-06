
var trap = function (height) {
  let ans = 0;
  const st = [];
  for (let i = 0; i < height.length; i++) {
    // 找上一个更大元素
    while (st.length && height[i] >= height[st[st.length - 1]]) {
      // 比方说[4,1,1,6] 所以上面是>=  相同的1弹出也是ok的
      const bottomH = height[st.pop()];
      if (st.length === 0) {
        break;
      }
      // 左边界
      const left = st[st.length - 1];
      // 高度是左右边界的最小值 减去 中间元素的高度
      const dh = Math.min(height[left], height[i]) - bottomH; // 面积的高
      // console.log(left, bottomH, height[i], dh,)
      // 这块区域的面积就是宽*高
      ans += dh * (i - left - 1);
      console.log(left, i, bottomH, dh)
    }
    st.push(i);
  }
  return ans;
};