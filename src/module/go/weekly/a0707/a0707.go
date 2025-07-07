package a0707

import (
	"fmt"
	"math"
	"slices"
	"strconv"
	"strings"
)

func maxEvents(events [][]int) int {
	slices.SortFunc(events, func(a, b []int) int {
		if a[1] != b[1] {
			return b[1] - a[1] // 右端点从大到小
		}
		return b[0] - a[0] // 右端点相同，左端点从大到小
	})
	fmt.Println(events)
	last := events[0][1]
	ans := 1
	for _, x := range events[1:] {
		if x[1] < last {
			ans++
			last = x[1]
		} else {
			for j := x[1] - 1; j >= x[0]; j++ {
				if j < last {
					ans++
					last = j
					break
				}
			}
		}
	}
	return ans
}
func concatHex36222(n int) string {
	str := strconv.FormatInt(int64(n*n), 16) + strconv.FormatInt(int64(n*n*n), 36)
	return strings.ToUpper(str)
}
func concatHex36(n int) string {
	fn := func(n int, radix int) string {
		ans := []byte{}
		for n > 0 {
			x := n % radix
			if x < 10 {
				ans = append(ans, byte(x+'0'))
			} else {
				ans = append(ans, byte(x-10+'A'))
			}
			n /= radix
		}
		slices.Reverse(ans)
		return string(ans)
	}
	return fn(n*n, 16) + fn(n*n*n, 36)
}

func minCost(m int, n int, waitCost [][]int) int64 {
	memo := make([][]int, m)
	for i := range memo {
		memo[i] = make([]int, n)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int) int
	dfs = func(i, j int) (res int) {
		if i < 0 || j < 0 {
			return math.MaxInt
		}
		if i == 0 && j == 0 {
			return 1
		}
		p := &memo[i][j]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		return min(dfs(i-1, j), dfs(i, j-1)) + waitCost[i][j] + (i+1)*(j+1)
	}
	return int64(dfs(m-1, n-1) - waitCost[m-1][n-1])
}

func maximumSafenessFactor(grid [][]int) (ans int) {
	type pair struct{ x, y int }
	var dir4 = []pair{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	n := len(grid)
	dis := make([][]int, n)
	queue := []pair{}
	for i, rows := range grid {
		dis[i] = make([]int, n)
		for j, col := range rows {
			if col == 1 {
				queue = append(queue, pair{i, j})
			} else {
				dis[i][j] = -1
			}
		}
	}
	groups := [][]pair{queue}
	for len(queue) > 0 {
		tmp := queue
		queue = nil
		for _, q := range tmp {
			for _, d := range dir4 {
				x, y := q.x+d.x, q.y+d.y
				if x >= 0 && x < n && y >= 0 && y < n && dis[x][y] == -1 {
					queue = append(queue, pair{x, y})
					dis[x][y] = len(groups)
				}
			}
		}
		groups = append(groups, queue)
	}
	fa := make([]int, n*n)
	for i := range fa {
		fa[i] = i
	}
	var find func(int) int
	find = func(x int) int {
		if fa[x] != x {
			fa[x] = find(fa[x])
		}
		return fa[x]
	}
	for ans = len(groups) - 2; ans >= 0; ans-- {
		for _, p := range groups[ans] {
			i, j := p.x, p.y
			for _, d := range dir4 {
				x, y := d.x+i, d.y+j
				if x >= 0 && x < n && y >= 0 && y < n && dis[x][y] > dis[i][j] {
					fa[x*n+y] = fa[i*n+j]
				}
			}
		}
		if find(0) == find(n*n-1) {
			return ans
		}
	}
	return 0
}
