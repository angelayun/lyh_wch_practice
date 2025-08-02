package a0730aa

func longestSubarray(nums []int) (ans int) {
	mx, cnt := 0, 0
	for _, x := range nums {
		if x > mx {
			mx = x
			cnt = 1
			ans = 1
		} else if x == mx {
			cnt++
			ans = max(ans, cnt)
		} else {
			cnt = 0
		}
	}
	return
}

func gcd(a, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}
func minStable(nums []int, maxC int) int {
	n := len(nums)
	left, right := -1, n/(maxC+1)
	check := func(mid int) bool {
		// mid 表示最大的上界
		// 子数组的gcd  最小的左端点
		type interval struct{ gcd, left int }
		intervals := []interval{{1, 0}}
		c := maxC
		for i, x := range nums {
			// 计算以i为右端点的子数组的gcd
			for j, p := range intervals {
				intervals[j].gcd = gcd(p.gcd, x)
			}
			// nums[i]单独作为一个数作为子数组
			intervals = append(intervals, interval{x, i})
			// 去重（合并相同的gcd区间）
			idx := 1
			for j := 1; j < len(intervals); j++ {
				// idx是索引位置  不相同的就加入  相同的就忽略掉了
				if intervals[j].gcd != intervals[j-1].gcd {
					intervals[idx] = intervals[j]
					idx++
				}
			}
			// intervals 的性质：越靠左，GCD 越小
			intervals = intervals[:idx]
			// intervals[0] 的 GCD >= 2 且最长，取其区间左端点作为子数组的最小左端点
			if len(intervals) > 1 && i-intervals[1].left+1 > mid {
				if c == 0 {
					return false
				}
				c--
				// 修改后gcd均为1 直接清空
				intervals = intervals[:1]
			}
		}
		return true
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	return right
}

func generate(numRows int) [][]int {
	ans := make([][]int, numRows)
	ans[0] = append(ans[0], 1)
	for i := 1; i < numRows; i++ {
		ans[i] = append(ans[i], 1)
		for j := 1; j < i; j++ {
			ans[i] = append(ans[i], ans[i-1][j-1]+ans[i-1][j])
		}
		ans[i] = append(ans[i], 1)
	}
	return ans
}
