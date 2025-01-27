/**
 * @param {number} days
 * @param {number[][]} meetings
 * @return {number}
 */
var countDays = function (days, meetings) {
  // 按照左端点从小到大排序
  meetings.sort((a, b) => a[0] - b[0]);
  let merge = [meetings[0]];
  for (let i = 1; i < meetings.length; i++) {
    let [start, end] = meetings[i];
    if (start > merge[merge.length - 1][1]) merge.push(meetings[i]);
    else {
      merge[merge.length - 1][1] = Math.max(merge[merge.length - 1][1], end);
    }
  }
  let total = 0;
  for (let [start, end] of merge) {
    total += end - start + 1;
  }
  return days - total;
};
// 下面是一次遍历的方式
/**
 * @param {number} days
 * @param {number[][]} meetings
 * @return {number}
 */
var countDays = function (days, meetings) {
  // 按照左端点从小到大排序
  meetings.sort((a, b) => a[0] - b[0]);
  let start = 1,
    end = 0;
  for (let [l, r] of meetings) {
    if (l > end) {
      // 开启一个新区间
      days -= end - start + 1;
      start = l;
    }
    end = Math.max(end, r);
  }
  days -= end - start + 1;
  return days;
};
