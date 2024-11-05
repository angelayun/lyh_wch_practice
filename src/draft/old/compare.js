// 单调栈
var trap = function (height) {
  let ans = 0;
  const stack = [];
  for (let i = 0; i < height.length; i++) {
    while (stack.length && height[i] >= height[stack[stack.length - 1]]) {
      const bottomH = height[stack.pop()];
      if (stack.length === 0) {
        break;
      }
      const left = stack[stack.length - 1];
      const dh = Math.min(height[left], height[i]) - bottomH; // 面积的高
      ans += dh * (i - left - 1);
    }
    stack.push(i);
  }
  return ans;
};