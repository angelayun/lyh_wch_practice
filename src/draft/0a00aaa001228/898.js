/**
 * @param {number[]} arr
 * @return {number}
 */
var subarrayBitwiseORs = function (arr) {
  const n = arr.length;
  let set = new Set();
  for (let right = 0; right < n; right++) {
    set.add(arr[right]);
    for (let left = right - 1; left >= 0; left--) {
      if ((arr[left] | arr[right]) == arr[left]) break;
      arr[left] |= arr[right];
      set.add(arr[left]);
    }
  }
  return set.size
};
