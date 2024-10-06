
var StockSpanner = function () {
  this.index = 0
  this.stack = []
  this.list = []
};

/** 
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
  while (this.stack.length && this.list[this.stack[this.stack.length - 1]] > price) {
    this.stack.pop()
  }
  this.stack.push(this.index)
  this.list.push(price)
  this.index++
  return this.index - this.stack[this.stack.length - 1]
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */