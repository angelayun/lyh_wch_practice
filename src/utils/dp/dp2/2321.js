
/* var maximumsSplicedArray = function (nums1, nums2) {
  let sum1 = nums1.reduce((pre, cur) => pre + cur)
  let sum2 = nums2.reduce((pre, cur) => pre + cur)

  const n = nums1.length
  const diffMax = (nums1, nums2) => {
    const n = nums1.length
    let diff = new Array(n).fill(0)
    for (let i = 0; i < n; i++) {
      diff[i] = nums2[i] - nums1[i]
    }
    let ans = 0
    let dp = 0
    for (let i = 0; i < n; i++) {
      dp = Math.max(dp, 0) + diff[i]
      ans = Math.max(ans, dp)
    }
    return ans
  }
  let diff1 = diffMax(nums1, nums2)
  let diff2 = diffMax(nums2, nums1)
  // console.log(sum, ans)
  return Math.max(sum1, sum2, diff1 + sum1, diff2 + sum2)
}; */



var maximumsSplicedArray = function (nums1, nums2) {
  const n = nums1.length
  const diffMax = (nums1, nums2) => {
    const n = nums1.length
    // 这个是整个数组的和
    let s = 0
    let ans = 0
    let dp = 0
    for (let i = 0; i < n; i++) {
      s += nums1[i]
      // 如果我加上还比0小了  那还不如不加呢
      dp += nums2[i] - nums1[i]
      if (dp < 0) dp = 0
      ans = Math.max(ans, dp)
    }
    // 最小替换的是 ans  
    return ans + s
  }
  let diff1 = diffMax(nums1, nums2)
  let diff2 = diffMax(nums2, nums1)
  return Math.max(diff1, diff2)
};