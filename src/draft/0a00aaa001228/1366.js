/**
 * @param {string[]} votes
 * @return {string}
 */
var rankTeams = function (votes) {
  let cnt = {};
  let m = votes[0].length;
  for (let x of votes[0]) {
    cnt[x] = new Array(m).fill(0);
  }
  for (let vo of votes) {
    for (let i = 0; i < m; i++) {
      cnt[vo[i]][i]++;
    }
  }
  let ans = votes[0].split('');
  ans.sort((a, b) => {
    for (let i = 0; i < m; i++) {
      if (cnt[a][i] != cnt[b][i]) {
        return cnt[b][i] - cnt[a][i];
      }
    }
    return a.localeCompare(b);
  });
  return ans.join('');
};
