/**
 * @param {string[]} votes
 * @return {string}
 */
var rankTeams = function (votes) {
  let cnts = {};
  let m = votes[0].length;
  for (let x of votes[0]) {
    cnts[x] = new Array(m).fill(0);
  }
  for (let vo of votes) {
    for (let i = 0; i < m; i++) {
      cnts[vo[i]][i]++;
    }
  }
  let ans = votes[0].split('');
  ans.sort((a, b) => {
    for (let i = 0; i < m; i++) {
      if (cnts[b][i] != cnts[a][i]) {
        return cnts[b][i] - cnts[a][i];
      }
    }
    return a.localeCompare(b);
  });
  return ans.join('');
};
