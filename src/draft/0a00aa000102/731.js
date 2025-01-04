var MyCalendarTwo = function () {
  this.booked = {};
};

/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {boolean}
 */
MyCalendarTwo.prototype.book = function (startTime, endTime) {
  this.booked[startTime] = (this.booked[startTime] || 0) + 1;
  this.booked[endTime] = (this.booked[endTime] || 0) - 1;
  let activeCount = 0;
  for (let key of Object.keys(this.booked)) {
    activeCount += this.booked[key];
    if (activeCount > 2) {
      this.booked[startTime] = (this.booked[startTime] || 0) - 1;
      this.booked[endTime] = (this.booked[endTime] || 0) + 1;
      return false;
    }
  }
  return true;
};

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * var obj = new MyCalendarTwo()
 * var param_1 = obj.book(startTime,endTime)
 */
