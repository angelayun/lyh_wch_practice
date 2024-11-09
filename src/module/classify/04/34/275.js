/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
  const n = citations.length
  // 肯定有0篇论文的引用次数大于0 [1,n]
  let left = 1, right = n;
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    // console.log(mid, citations[mid])
    // mid=1 5-1=4  后面有1个元素 比1刚刚好大  只要判断这个元素值是否比mid1
    if (citations[n - mid] >= mid) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return left - 1
};