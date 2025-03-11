package monotonicstack

// 2865
func maximumSumOfHeights1(a []int) (ans int64) {
	// 这是一个纯暴力的解法
	for i, x := range a {
		s, mn := x, x
		// 循环左边的
		for j := i - 1; j >= 0; j-- {
			y := a[j]
			// 如果y比mn小 取y 否则取mn
			mn = min(mn, y)
			s += mn
		}
		mn = x
		// 循环右边
		for _, y := range a[i+1:] {
			// 如果y比mn小 取y 否则取mn
			mn = min(mn, y)
			s += mn
		}
		ans = max(ans, int64(s))
	}
	return ans
}

// 2866
func maximumSumOfHeights(a []int) int64 {
	ans := 0
	n := len(a)
	suf := make([]int, n+1)
	st := []int{n} // 哨兵
	sum := 0
	for i := n - 1; i >= 0; i-- {
		x := a[i]
		for len(st) > 1 && x <= a[st[len(st)-1]] {
			j := st[len(st)-1]
			st = st[:len(st)-1]
			sum -= a[j] * (st[len(st)-1] - j) // 撤销之前加到 sum 中的
		}
		sum += x * (st[len(st)-1] - i) // 从 i 到 st[len(st)-1]-1 都是 x
		suf[i] = sum
		st = append(st, i)
	}
	ans = sum

	st = []int{-1} // 哨兵
	pre := 0
	for i, x := range a {
		for len(st) > 1 && x <= a[st[len(st)-1]] {
			j := st[len(st)-1]
			st = st[:len(st)-1]
			pre -= a[j] * (j - st[len(st)-1]) // 撤销之前加到 pre 中的
		}
		pre += x * (i - st[len(st)-1]) // 从 st[len(st)-1]+1 到 i 都是 x
		ans = max(ans, pre+suf[i+1])
		st = append(st, i)
	}
	return int64(ans)
}
