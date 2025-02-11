/**
 * @param {string[]} queries
 * @param {string[]} dictionary
 * @return {string[]}
 */
var twoEditWords = function (queries, dictionary) {
  let ans = [];
  for (let x of queries) {
    for (let y of dictionary) {
      let cnt = 0;
      for (let i = 0; i < x.length; i++) {
        if (x[i] != y[i]) cnt++;
      }
      if (cnt <= 2) {
        ans.push(x);
      }
    }
  }
  return Array.from(new Set(ans));
};
