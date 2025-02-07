/**
 * @param {string} blocks
 * @param {number} k
 * @return {number}
 */
var minimumRecolors = function (blocks, k) {
  let cnt = 0;
  const n = blocks.length;
  for (let i = 0; i < k; i++) {
    if (blocks[i] == 'W') cnt++;
  }
  let ans = cnt;
  for (let i = k; i < n; i++) {
    cnt -= blocks[i - k] == 'W' ? 1 : 0;
    cnt += blocks[i] == 'W' ? 1 : 0;
    ans = Math.min(cnt, ans);
  }
  return ans;
};

/**
 * @param {string} blocks
 * @param {number} k
 * @return {number}
 */
var minimumRecolors = function (blocks, k) {
  let cnt = 0;
  const n = blocks.length;
  for (let i = 0; i < k; i++) {
    cnt += blocks[i].charCodeAt() & 1;
  }
  let ans = cnt;
  for (let i = k; i < n; i++) {
    cnt -= blocks[i - k].charCodeAt() & 1;
    cnt += blocks[i].charCodeAt() & 1;
    ans = Math.min(cnt, ans);
  }
  return ans;
};
