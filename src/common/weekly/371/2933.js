/**
 * @param {string[][]} access_times
 * @return {string[]}
 */
var findHighAccessEmployees = function (access_times) {
  let name2times = new Map();
  for (let [name, s] of access_times) {
    let t = s.substring(0, 2) * 60 + Number(s.substring(2));
    let list = name2times.get(name) || [];
    list.push(t);
    name2times.set(name, list);
  }
  console.log(name2times);
  let ans = [];
  for (let [name, a] of name2times) {
    a.sort((a, b) => a - b);
    for (let i = 2; i < a.length; i++) {
      if (a[i] - a[i - 2] < 60) {
        if (ans[ans.length - 1] != name) {
          ans.push(name);
        }
      }
    }
  }
  return ans;
};
