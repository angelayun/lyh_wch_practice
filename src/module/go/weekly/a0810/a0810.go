package a0810

import (
	"cmp"
	"math"
	"slices"
)

func reverseSubmatrix1(grid [][]int, x int, y int, k int) [][]int {
	xN, xM := len(grid), len(grid[0])
	g := make([][]int, xN-x)

	rowIndex := 0
	for i, rows := range grid {
		if i >= x {
			g[rowIndex] = make([]int, xM-y)
			for j, col := range rows {
				if j >= y {
					g[rowIndex] = append(g[rowIndex], col)
				}
			}
			rowIndex++
		}
	}
	n := len(g)
	for i := 0; i < k/2; i++ {
		for j := 0; j < k; j++ {
			g[i][j], g[n-1-i][j] = g[n-1-i][j], g[i][j]
		}
	}
	return grid
}

func reverseSubmatrix111(grid [][]int, x int, y int, k int) [][]int {
	for index, i := 0, x; i < x+k/2; i++ {
		for j := y; j < y+k; j++ {
			grid[i][j], grid[i+k-index-1][j] = grid[i+k-index-1][j], grid[i][j]
		}
		index++
	}
	return grid
}
func reverseSubmatrix(grid [][]int, x int, y int, k int) [][]int {
	left, right := x, x+k-1
	for left < right {
		for j := y; j < y+k; j++ {
			grid[left][j], grid[right][j] = grid[right][j], grid[left][j]
		}
		left++
		right--
	}
	return grid
}
func sortPermutation(nums []int) (ans int) {
	ls := []int{}
	for i, x := range nums {
		if x != i {
			ls = append(ls, x)
		}
	}
	slices.Sort(ls)
	if len(ls) > 0 {
		ans = math.MaxInt
		for i := 0; i < len(ls); i++ {
			for j := i + 1; j < len(ls); j++ {
				ans = min(ans, ls[i]&ls[j])
			}
		}
		return ans
	}
	return 0
}
func sortPermutation222(nums []int) (ans int) {
	// key是值 value是index
	cnt := map[int]int{}
	for i, x := range nums {
		if x != i+1 {
			cnt[x] = i
		}
	}
	validate := map[int]bool{}
	for i, x := range nums {
		if x != i+1 && !validate[i] {
			for key, index := range cnt {
				if x&key > 0 {
					ans++
					delete(cnt, key)
					validate[index] = true
					break
				}
			}
		}
	}
	return 0
}

func maxTotal222(value []int, limit []int) int64 {
	type pair struct{ limit, value int }
	a := []pair{}
	for i, x := range value {
		a = append(a, pair{limit: limit[i], value: x})
	}
	// 按照limit从小到大排序   如果limit相同的情况下value从大到小排序
	slices.SortFunc(a, func(x, y pair) int {
		return cmp.Or(cmp.Compare(x.limit, y.limit), cmp.Compare(y.value, x.value))
	})
	activeCnt := 0
	ans := 0
	for _, item := range a {
		if activeCnt < item.limit {
			ans += item.value
			activeCnt++
		}
	}
	return int64(ans)
}

func maxTotal(value []int, limit []int) int64 {
	n := len(limit)
	groups := make([][]int, n+1)
	for i, lim := range limit {
		groups[lim] = append(groups[lim], value[i])
	}
	ans := 0
	for lim, a := range groups {
		slices.SortFunc(a, func(x, y int) int { return y - x })
		if len(a) > lim {
			a = a[:lim]
		}
		for _, x := range a {
			ans += x
		}
	}
	return int64(ans)
}
