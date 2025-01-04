var MyCalendar = function () {
  this.calendar = [];
};

/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {boolean}
 */
MyCalendar.prototype.book = function (startTime, endTime) {
  for (let [left, right] of this.calendar) {
    // right > startTime 保证 [startTime, endTime)是在当前区间范围内的
    if (left < endTime && right > startTime) {
      return false;
    }
  }
  this.calendar.push([startTime, endTime]);
  return true;
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(startTime,endTime)
 */
