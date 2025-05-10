package binarysearchdemo

func maxValue(n int, index int, maxSum int) int {
	// 正确的二分查找边界，元素至少为1
	left, right := 1, maxSum

	// 计算以x为峰值，长度为cnt的数组的总和
	sum := func(x, cnt int) int {
		if cnt == 0 {
			return 0
		}
		if x > cnt {
			// 等差数列求和：x + (x-1) + ... + (x-cnt+1)
			return (x + x - cnt + 1) * cnt / 2
		} else {
			// 前x项从1到x，后面补1
			return (x+1)*x/2 + (cnt - x)
		}
	}

	// 检查当峰值为mid时，总和是否不超过maxSum
	check := func(mid int) bool {
		// 左侧sum(mid-1, index)：峰值左侧的递减序列
		// 右侧sum(mid, n-index-1)：峰值及其右侧的递减序列
		total := sum(mid-1, index) + sum(mid, n-index)
		return total <= maxSum
	}

	// 二分查找模板
	for left <= right {
		mid := left + (right-left)/2
		if check(mid) {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}

	// 返回right，因为right是最后一个满足条件的值
	return right
}
