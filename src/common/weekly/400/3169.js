/**
 * @param {number} days
 * @param {number[][]} meetings
 * @return {number}
 */
var countDays = function (days, meetings) {
  // 先合并重复区间
  // 按左端点从左到右排序
  meetings.sort((a, b) => a[0] - b[0]);
  let res = [meetings[0]];
  for (let i = 1; i < meetings.length; i++) {
    let [start, end] = meetings[i];
    if (start <= res[res.length - 1][1]) {
      res[res.length - 1][1] = Math.max(res[res.length - 1][1], end);
    } else res.push(meetings[i]);
  }
  // 统计没有重复区间的天数
  let cnt = 0;
  for (let [start, end] of res) {
    cnt += end - start + 1;
  }
  return days - cnt;
};
