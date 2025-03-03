package daily

import "slices"

// 3462
func maxSum(grid [][]int, limits []int, k int) (ans int64) {
	temp := []int{}
	cmp := func(a, b int) int { return b - a }
	for i, rows := range grid {
		slices.SortFunc(rows, cmp)
		for _, col := range rows {
			if limits[i] > 0 {
				temp = append(temp, col)
				limits[i]--
			} else {
				break
			}
		}
	}
	slices.SortFunc(temp, cmp)
	for _, v := range temp[:k] {
		ans += int64(v)
	}
	return ans
}
