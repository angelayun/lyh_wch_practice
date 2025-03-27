package bitdemo

// 2680
func maximumOr(nums []int, k int) (ans int64) {
	n := len(nums)
	// suf[i] 表示 nums[i+1] 到 nums[n-1] 的 OR
	suffix := make([]int, n)
	for i := n - 2; i >= 0; i-- {
		suffix[i] |= suffix[i+1] | nums[i+1]
	}
	prefix := 0
	for i, x := range nums {
		cur := x >> k
		curSum := int64(prefix | cur | suffix[i])
		if curSum > ans {
			ans = int64(curSum)
		}
		prefix |= x
	}
	return
}
