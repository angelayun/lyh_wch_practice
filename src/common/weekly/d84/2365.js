/**
 * @param {number[]} tasks
 * @param {number} space
 * @return {number}
 */
var taskSchedulerII = function (tasks, space) {
  let day = 0;
  let last = {};
  for (let t of tasks) {
    day++;
    if (last[t] != null) {
      day = Math.max(day, last[t] + space + 1);
    }
    last[t] = day;
  }
  return day;
};
