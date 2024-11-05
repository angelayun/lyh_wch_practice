var StockSpanner = function () {
  this.nums = [];
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
  this.nums.push(price);
  let stack = [];
  const n = this.nums.length;
  let ans = new Array(n).fill(1);
  // 单调递增的栈
  for (let i = 0; i < n; i++) {
    while (stack.length && this.nums[stack[stack.length - 1]] >= this.nums[i]) {
      let j = stack.pop();
      ans[j] = i - j + 1;
    }
    stack.push(i);
  }
  return ans;
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */

// 待验证