const gcd = (a, b) => {
  while (b != 0) {
    [a, b] = [b, a % b];
  }
  return b;
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var countBeautifulPairs = function (nums) {
  let cnt = new Array(10).fill(0);
  let res = 0;
  for (let x of nums) {
    let lastBit = x % 10;
    for (let y = 1; y < 10; y++) {
      if (cnt[y] && gcd(cnt[y], lastBit) == 1) {
        res += cnt[y];
      }
    }
    while (x >= 10) {
      x = ~(x / 10);
    }
    cnt[x]++;
  }
  return res;
};
