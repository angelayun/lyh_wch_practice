/**
 * @param {number} k
 * @param {number[]} operations
 * @return {character}
 */
var kthCharacter = function (k, operations) {
  k = BigInt(k);
  // 先写个递归的写法
  if (operations.length == 0) return 'a';
  let op = operations.pop();
  // 注意 pop 之后 operations 的长度减少了 1，所以下面写的是 1<<n 而不是 1<<(n-1)
  let m = 1n << BigInt(operations.length);
  if (k <= m) {
    // k在左半边
    return kthCharacter(Number(k), operations);
  } else {
    // k在右半边
    let ans = kthCharacter(Number(k - m), operations);
    return String.fromCharCode(
      ((ans.charCodeAt() - 'a'.charCodeAt() + op) % 26) + 'a'.charCodeAt()
    );
  }
};

// 下面是迭代的写法  下面的写法暂时通不过
/**
 * @param {number} k
 * @param {number[]} operations
 * @return {character}
 */
var kthCharacter = function (k, operations) {
  let inc = 0;
  for (i = 32 - Math.clz32(k - 1); i >= 0; i--) {
    if (k > 1 << i) {
      // k在右边
      inc += operations[i];
      k -= 1 << i;
    }
  }
  return String.fromCharCode((inc % 26) + 'a'.charCodeAt());
};
