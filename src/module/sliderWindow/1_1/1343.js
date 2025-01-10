/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} threshold
 * @return {number}
 */
var numOfSubarrays = function (arr, k, threshold) {
  const n = arr.length;
  let sum = 0;
  let cnt = 0;
  for (let left = 0, right = 0; right < n; right++) {
    sum += arr[right];
    while (right - left + 1 > k) {
      sum -= arr[left++];
    }
    if (right - left + 1 == k && sum / k >= threshold) {
      cnt++;
    }
  }
  return cnt;
};
/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} threshold
 * @return {number}
 */
var numOfSubarrays = function (arr, k, threshold) {
  const n = arr.length;
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += arr[i];
  }
  let cnt = sum / k >= threshold ? 1 : 0;
  for (let i = k; i < n; i++) {
    sum += arr[i] - arr[i - k];
    if (sum / k >= threshold) {
      cnt++
    }
  }
  return cnt
};
