/**
 * @param {number[]} encoded
 * @param {number} first
 * @return {number[]}
 */
var decode = function (encoded, first) {
  const n = encoded.length
  let ans = [first]
  for (let i = 0; i < n; i++) {
    ans.push(ans[ans.length - 1] ^ encoded[i])
  }
  return ans
};