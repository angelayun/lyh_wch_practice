var StockSpanner = function () {
  this.stack = [[-1, Infinity]]; // 这样无需判断栈为空的情况
  this.curDay = -1; // 第一个 next 调用算作第 0 天
};

StockSpanner.prototype.next = function (price) {
  while (price >= this.stack[this.stack.length - 1][1]) {
    this.stack.pop(); // 栈顶数据后面不会再用到了，因为 price 更大
  }
  this.stack.push([++this.curDay, price]);
  return this.curDay - this.stack[this.stack.length - 2][0];
};
