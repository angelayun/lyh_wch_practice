var StockSpanner = function () {
  // 用户存的数据完全不用存  只需要保存单调栈和当前是第几个数
  this.curDay = -1;
  this.stack = [[this.curDay, Infinity]];
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
  // 入栈之前先及时去掉无用数据
  while (price > this.stack[this.stack.length - 1][1]) {
    this.stack.pop();
  }
  this.stack.push([this.curDay++, price]);

  // 现在栈顶是比price大的数据了
  return this.curDay - this.stack[this.stack.length - 1][0];
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
