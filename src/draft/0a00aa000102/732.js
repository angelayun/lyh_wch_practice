var MyCalendarThree = function () {
  this.booked = {};
};

/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {number}
 */
MyCalendarThree.prototype.book = function (startTime, endTime) {
  this.booked[startTime] = (this.booked[startTime] || 0) + 1;
  this.booked[endTime] = (this.booked[endTime] || 0) - 1;
  let activeCount = 0;
  let maxCount = 0
  for (let key of Object.keys(this.booked)) {
    activeCount += this.booked[key];
    maxCount = Math.max(maxCount, activeCount)
  }
  return maxCount;
};

/**
 * Your MyCalendarThree object will be instantiated and called as such:
 * var obj = new MyCalendarThree()
 * var param_1 = obj.book(startTime,endTime)
 */
