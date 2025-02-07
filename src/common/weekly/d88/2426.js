/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} diff
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, diff) {
  let a = [];
  for (let i = 0; i < nums1.length; i++) {
    a.push(nums1[i] - nums2[i]);
  }
  const mergeSort = (arr) => {
    if (arr.length <= 1) {
      return 0;
    }
    let mid = arr.length >> 1;
    let a = arr.slice(0, mid);
    let b = arr.slice(mid);
    let cnt = mergeSort(a) + mergeSort(b);
    let i = 0,
      n = a.length;
    for (let x of b) {
      while (i < n && a[i] <= x + diff) {
        i += 1;
      }
      cnt += i;
    }
    i = 0;
    let cur = 0,
      j = 0;
    let m = b.length;
    while (i < n && j < m) {
      if (a[i] < b[j]) {
        arr[cur] = a[i];
        cur += 1;
        i++;
      } else {
        arr[cur] = b[j];
        cur += 1;
        j++;
      }
    }
    if (i == n) {
      while (j < m) {
        arr[cur] = b[j];
        cur += 1;
        j++;
      }
    } else {
      while (i < n) {
        arr[cur] = a[i];
        cur += 1;
        i++;
      }
    }
    return cnt;
  };
  return mergeSort(a);
};
