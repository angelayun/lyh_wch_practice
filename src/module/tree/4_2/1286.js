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
const decode = (code, characters) => {
  let sb = new Array();
  let idx = 0;
  let len = characters.length;
  while (code != 0) {
    if (code & 1) {
      sb.push(characters[len - idx - 1]);
    }
    idx++;
    code = code >> 1;
  }
  return sb.reverse().join('');
};
/**
 * @param {string} characters
 * @param {number} combinationLength
 */
var CombinationIterator = function (characters, combinationLength) {
  this.charArr = characters.split('');
  this.len = characters.length;
  this.code = (1 << this.len) - 1;
  this.size = combinationLength;
};

/**
 * @return {string}
 */
CombinationIterator.prototype.next = function () {
  while (this.code > 0 && hammingWeight(this.code) != this.size) {
    this.code--;
  }
  let next = decode(this.code, this.charArr);
  this.code--;
  return next;
};

/**
 * @return {boolean}
 */
CombinationIterator.prototype.hasNext = function () {
  while (this.code > 0 && hammingWeight(this.code) != this.size) {
    this.code--;
  }
  return this.code > 0;
};

/**
 * Your CombinationIterator object will be instantiated and called as such:
 * var obj = new CombinationIterator(characters, combinationLength)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
