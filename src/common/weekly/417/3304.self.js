/**
 * @param {number} k
 * @return {character}
 */
var kthCharacter = function (k) {
  const n = (k - 1).toString(2).length;
  let inc = 0;
  for (let i = n - 1; i >= 0; i--) {
    let m = 1 << i;
    if (k > m) {
      inc += 1;
      k -= m;
    }
  }
  return String.fromCharCode('a'.charCodeAt() + inc);
};
/**
 * @param {number} k
 * @return {character}
 */
var kthCharacter = function (k) {
  k--
  const n = k.toString(2).length;
  let inc = 0;
  for (let i = n - 1; i >= 0; i--) {
    let m = 1 << i;
    if (k >= m) {
      inc += 1;
      k -= m;
    }
  }
  return String.fromCharCode('a'.charCodeAt() + inc);
};
/**
 * @param {number} k
 * @return {character}
 */
var kthCharacter = function (k) {
  k--
  const n = k.toString(2).length;
  let inc = 0;
  for (let i = n - 1; i >= 0; i--) {
    let m = 1 << i;
    if (k >= m) {
      inc += 1;
      k -= m;
    }
  }
  return String.fromCharCode('a'.charCodeAt() + inc);
};

/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function (n) {
  let count = 0;
  while (n) {
    n &= n - 1;
    count++;
  }
  return count;
};
var kthCharacter = function (k) {
  k--
  
  let inc = hammingWeight(k)
  return String.fromCharCode('a'.charCodeAt() + inc);
};