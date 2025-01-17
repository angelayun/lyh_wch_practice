/**
 * @param {number} k
 * @param {number[]} operations
 * @return {character}
 */
/* var kthCharacter = function (k) {
  k = BigInt(k);
  // 先写个递归的写法
  if (k == 0) return 'a';
  // 注意 pop 之后 operations 的长度减少了 1，所以下面写的是 1<<n 而不是 1<<(n-1)
  let m = k >> 1;
  if (k <= m) {
    // k在左半边
    return kthCharacter(Number(k));
  } else {
    // k在右半边
    let ans = kthCharacter(Number(k - m));
    return String.fromCharCode(
      ((ans.charCodeAt() - 'a'.charCodeAt() + 1) % 26) + 'a'.charCodeAt()
    );
  }
}; */
// 上面写的不对
var kthCharacter = function (k) {
  k--;
  let ans = 0;
  for (let i = 31 - Math.clz32(k); i >= 0; i--) {
    if (k >= 1 << i) {
      ans++;
      ans %= 26;
      k -= 1 << i;
      console.log(k);
    }
  }
  console.log(ans);
  return String.fromCharCode('a'.charCodeAt() + ans);
};
