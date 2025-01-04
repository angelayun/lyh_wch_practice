var MyCalendar = function () {
  this.calendar = {};
};

/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {boolean}
 */
MyCalendar.prototype.book = function (startTime, endTime) {
  for (let [start, end] of Object.keys(this.calendar)) {
    // end > startTime 保证 [startTime, endTime)是在当前区间范围内的
    if (start < endTime && end > startTime) {
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
