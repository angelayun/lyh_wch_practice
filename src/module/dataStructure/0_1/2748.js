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
  let cnt = new Array(10).fill(0);
  let res = 0;
  for (let x of nums) {
    let lastBit = x % 10;
    // 存的应该是x的第一个数字 （从左到右的第一个数字）
    let num = x;
    while (num >= 10) {
      num = Math.floor(num / 10);
    }
    console.log(x, num, lastBit);
    for (let y = 1; y < 10; y++) {
      if (cnt[y] > 0 && gcd(y, lastBit) == 1) {
        res += cnt[y];
      }
    }
    // cnt.set(num, (cnt.get(num) || 0) + 1);
    cnt[num]++;
  }
  return res;
};
