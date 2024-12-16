/**
 * @param {number} n
 * @return {number}
 */
var concatenatedBinary = function (n) {
  let shift = 0n,
    ans = 0n; //因为 Javascript number 的位操作是32位有符号，所以用 BigInt
  for (let i = 1n; i <= n; ++i) {
    // 如果i是2的幂次数  那就需要再多移一次
    if ((i & (i - 1n)) === 0n) shift++;
    ans = ((ans << shift) + i) % 1000000007n;
  }
  return Number(ans);
};

/* 人家写的很棒
1的时候移1位  0移1位还是0 +当前的1
2的时候移2位  所以二进制是100+10  也就是110
3的时候移2位  所以二进制是110 + 11  也就是11011
4的时候移3位  所以二进制是11011 + 100  也就是11011100 */
