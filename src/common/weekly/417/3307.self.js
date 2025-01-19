/**
 * @param {number} k
 * @param {number[]} operations
 * @return {character}
 */
var kthCharacter = function (k, operations) {
  if (operations.length == 0) return 'a';
  k = BigInt(k);
  let n = operations.length;
  let op = operations.pop(); // operations[n-1]
  let m = 1n << BigInt(n - 1);
  if (k <= m) {
    // k 在左半边
    return kthCharacter(k, operations);
  } else {
    // k 在右半边
    let ans = kthCharacter(k - m, operations);
    let x = (ans.charCodeAt() - 'a'.charCodeAt() + op) % 26;
    return String.fromCharCode('a'.charCodeAt() + x);
  }
};

/**
 * @param {number} k
 * @param {number[]} operations
 * @return {character}
 */
var kthCharacter = function (k, operations) {
  // 本质 是'a'需要增加多少次
  // k 在右半边有多少次
  // 也就是说k > m  出现了多少次
  k = BigInt(k);
  let inc = 0;
  // let n = Math.min(operations.length, 60);
  let n = (k - 1n).toString(2).length;
  for (let i = n; i >= 0; i--) {
    // let op = operations.pop(); // operations[n-1]
    let op = operations[i];
    let m = 1n << BigInt(i);
    if (k > m) {
      inc += op;
      k -= m;
    }
  }
  return String.fromCharCode('a'.charCodeAt() + (inc % 26));
};
