const gcd = (a, b) => {
  while (b != 0) {
    [a, b] = [b, a % b];
  }
  return a;
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var countBeautifulPairs = function (nums) {
  let res = 0;
  let cnt = new Array(10).fill(0);
  for (let x of nums) {
    // other存的是x的第一个数字
    let other = x;
    while (other >= 10) {
      other = ~~(other / 10);
    }
    for (let j = 0; j < 10; j++){
      if (gcd(x % 10, j) == 1) {
        res+=cnt[j]
      }
    }
    cnt[other]++;
  }
  return res;
};
// 很棒，写的非常清晰