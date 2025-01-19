/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function (word) {
  const n = word.length;
  let cnt = new Array(26).fill(0);
  for (let x of word) {
    let index = x.charCodeAt() - 'a'.charCodeAt();
    cnt[index]++;
  }
  // console.log(cnt)
  // 从大到小的顺序排列
  cnt.sort((a, b) => b - a);
  // console.log(cnt)

  let ans = 0;
  let freq = 1;
  let curCount = 0;
  for (let val of cnt) {
    if (val <= 0) break;
    curCount++;
    if (curCount == 9) {
      curCount = 0;
      freq++;
    }
    ans += val * freq;
  }
  return ans;
};
// 上面的通不过  有问题
/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function (word) {
  let cnt = new Array(26).fill(0);
  for (let x of word) {
    let index = x.charCodeAt() - 'a'.charCodeAt();
    cnt[index]++;
  }
  // 从大到小的顺序排列
  cnt.sort((a, b) => b - a);
  let ans = 0;
  for (let i = 0; i < 26; i++) {
    let val = cnt[i];
    ans += val * (~~(i / 8) + 1);
  }
  return ans;
};
