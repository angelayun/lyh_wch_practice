/**
 * @param {string} blocks
 * @param {number} k
 * @return {number}
 */
var minimumRecolors = function (blocks, k) {
  let minCnt = Number.MAX_SAFE_INTEGER;
  const n = blocks.length;
  let cnt = 0;
  for (let left = 0, right = 0; right < n; right++) {
    cnt += blocks[right] == 'W' ? 1 : 0;
    while (right - left + 1 > k) {
      cnt -= blocks[left++] == 'W' ? 1 : 0;
    }
    if (right - left + 1 == k) {
      minCnt = Math.min(cnt, minCnt);
    }
  }
  return minCnt;
};
/**
 * @param {string} blocks
 * @param {number} k
 * @return {number}
 */
var minimumRecolors = function (blocks, k) {
  const n = blocks.length;
  let cnt = 0;
  for (let i = 0; i < k; i++) {
    cnt += blocks[i].charCodeAt() & 1;
  }
  let minCnt = cnt
  for (let i = k; i < n; i++) {
    cnt += (blocks[i].charCodeAt() & 1) - (blocks[i - k].charCodeAt() & 1);
    minCnt = Math.min(cnt, minCnt);
  }
  return minCnt;
};
