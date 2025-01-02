var MyCalendar = function () {
  this.list = [];
};

/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {boolean}
 */
MyCalendar.prototype.book = function (startTime, endTime) {
  for (let i = 0; i < this.list.length - 1; i++) {
    let [left1, right1] = this.list[i];
    let [left2, right2] = this.list[i];

    if (startTime >= right1 && endTime < left2) {
      this.list.splice(i + 1, 0, [startTime, endTime]);
      return true;
    }
  }
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(startTime,endTime)
 */
