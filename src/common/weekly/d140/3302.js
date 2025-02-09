/**
 * @param {string} word1
 * @param {string} word2
 * @return {number[]}
 */
var validSequence = function (s, t) {
  const n = s.length,
    m = t.length;
  let suf = new Array(n + 1).fill(0);
  suf[n] = m;
  let j = m - 1;
  for (let i = n - 1; i >= 0; i--) {
    if (j >= 0 && s[i] == t[j]) {
      j--;
    }
    suf[i] = j + 1;
  }
  let ans = [];
  let changed = false;
  j = 0;
  for (let i = 0; i < n; i++) {
    let c = s[i];
    if (c == t[j]) {
      ans.push(i);
      j++;
      if (j == m) return ans;
    } else if (!changed && suf[i + 1] <= j + 1) {
      changed = true;
      ans.push(i);
      j++;
      if (j == m) return ans;
    }
  }
  return [];
};

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number[]}
 */
var validSequence = function (s, t) {
  const n = s.length,
    m = t.length;
  let suf = new Array(n + 1).fill(0);
  suf[n] = m;
  let j = m - 1;
  for (let i = n - 1; i >= 0; i--) {
    if (j >= 0 && s[i] == t[j]) {
      j--;
    }
    suf[i] = j + 1;
  }
  let ans = [];
  let changed = false;
  j = 0;
  for (let i = 0; i < n; i++) {
    let c = s[i];
    if (c == t[j] || (!changed && suf[i + 1] <= j + 1)) {
      if (c != t[j]) changed = true;
      ans.push(i);
      j++;
      if (j == m) return ans;
    }
  }
  return [];
};
