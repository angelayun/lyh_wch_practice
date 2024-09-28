/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function (letters, target) {
  let left = 0, right = letters.length - 1
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    // 'a'
    if (letters[mid].charCodeAt() <= target.charCodeAt()) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return left == letters.length ? letters[0] : letters[left]
};