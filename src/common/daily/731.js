var MyCalendarTwo = function () {
  this.caldendar = {};
};

/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {boolean}
 */
MyCalendarTwo.prototype.book = function (startTime, endTime) {
  this.caldendar[startTime] = (this.caldendar[startTime] || 0) + 1;
  this.caldendar[endTime] = (this.caldendar[endTime] || 0) - 1;
  let active = 0;
  for (let k of Object.keys(this.caldendar)) {
    active += this.caldendar[k];
    if (active > 2) {
      this.caldendar[startTime] = (this.caldendar[startTime] || 0) - 1;
      this.caldendar[endTime] = (this.caldendar[endTime] || 0) + 1;
      return false;
    }
  }
  console.log(JSON.stringify(this.caldendar));
  return true;
};

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * var obj = new MyCalendarTwo()
 * var param_1 = obj.book(startTime,endTime)
 */
