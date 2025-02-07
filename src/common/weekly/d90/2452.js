/**
 * @param {string[]} queries
 * @param {string[]} dictionary
 * @return {string[]}
 */
var twoEditWords = function (queries, dictionary) {
  let ans = [];
  for (let q of queries) {
    for (let s of dictionary) {
      let cnt = 0;
      for (let i = 0; i < q.length; i++) {
        let x = q[i];
        let y = s[i];
        if (x != y) cnt++;
      }
      if (cnt <= 2) {
        ans.push(q);
        break;
      }
    }
  }
  return ans;
};
