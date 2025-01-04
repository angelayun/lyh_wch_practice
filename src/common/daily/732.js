var MyCalendarThree = function () {
  this.calendar = {};
};

/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {number}
 */
MyCalendarThree.prototype.book = function (startTime, endTime) {
  this.calendar[start] = (this.calendar[start] || 0) + 1;
  this.calendar[end] = (this.calendar[end] || 0) - 1;
  let active = 0;
  for (let k of Object.keys(this.calendar)) {
    active += this.calendar[k];
  }
  return active;
};

/**
 * Your MyCalendarThree object will be instantiated and called as such:
 * var obj = new MyCalendarThree()
 * var param_1 = obj.book(startTime,endTime)
 */
