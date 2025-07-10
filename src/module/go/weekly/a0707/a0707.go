package a0707

import (
	"fmt"
	"math"
	"slices"
	"sort"
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
				if x >= 0 && x < n && y >= 0 && y < n && dis[x][y] >= dis[i][j] {
					fa[find(x*n+y)] = fa[find(i*n+j)]
				}
			}
		}
		if find(0) == find(n*n-1) {
			return ans
		}
	}
	return 0
}

func jobScheduling222(startTime []int, endTime []int, profit []int) int {
	n := len(startTime)
	type job struct{ start, end, profit int }
	jobs := make([]job, n)
	for i, x := range startTime {
		jobs[i] = job{x, endTime[i], profit[i]}
	}
	// 按照结束时间从小到大排序
	slices.SortFunc(jobs, func(a, b job) int { return a.end - b.end })
	f := make([]int, n+1)
	// 动态转移方程
	// f[i+1]=max(f[i],f[j+1]+profit[i])
	for i, job := range jobs {
		j := sort.Search(i, func(j int) bool { return jobs[j].end > job.start })
		f[i+1] = max(f[i], f[j]+job.profit)
	}
	return f[n]
}
func jobScheduling(startTime []int, endTime []int, profit []int) int {
	n := len(startTime)
	type job struct{ start, end, profit int }
	jobs := make([]job, n)
	for i, x := range startTime {
		jobs[i] = job{x, endTime[i], profit[i]}
	}
	// 按照结束时间 从小到大排序
	slices.SortFunc(jobs, func(x, y job) int { return x.end - y.end })
	f := make([]int, n+1)
	for i, job := range jobs {
		// j应该算出来的是>=job.start的右边界  也就是说j需要-1
		j := sort.Search(i, func(j int) bool { return jobs[j].end > job.start })
		// 动态转移方程
		// f[i+1]=max(f[i],f[j+1]+profit[i])
		f[i+1] = max(f[i], f[j]+job.profit)
	}
	return f[n]
}

func maxValue(events [][]int, k int) int {
	n := len(events)
	// 按照结束时间从小到大排序
	slices.SortFunc(events, func(a, b []int) int { return a[1] - b[1] })
	f := make([][]int, n+1)
	for i := range f {
		f[i] = make([]int, k+1)
	}
	for i, e := range events {
		start, value := e[0], e[2]
		// 应该是<  现在p算出来的是>= 还需要-1
		p := sort.Search(i, func(j int) bool { return events[j][1] >= start })
		for j := 1; j <= k; j++ {
			f[i+1][j] = max(f[i][j], f[p][j-1]+value)
		}
	}
	return f[n][k]
}
func maxTaxiEarnings(n int, rides [][]int) int64 {
	type pair struct{ start, profit int }
	groups := make([][]pair, n+1)
	for _, r := range rides {
		start, end, tip := r[0], r[1], r[2]
		groups[end] = append(groups[end], pair{start, end - start + tip})
	}
	memo := make([]int, n+1)
	for i := range memo {
		memo[i] = -1
	}
	var dfs func(int) int
	dfs = func(i int) (res int) {
		if i == 1 {
			return 0
		}
		p := &memo[i]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		res = dfs(i - 1)
		for _, p := range groups[i] {
			res = max(res, dfs(p.start)+p.profit)
		}
		return
	}
	return int64(dfs(n))
}

func minimumOperations222(nums []int) (ans int) {
	n := len(nums)
	if n <= 2 {
		return 0
	}
	for i := 2; i < n; i += 2 {
		if nums[i] != nums[i-2] {
			ans++
			nums[i] = nums[i-2]
		}
		if i+1 < n {
			if nums[i+1] != nums[i-1] {
				ans++
				nums[i+1] = nums[i-1]
			}
		}
	}
	return
}

func minimumOperations(nums []int) int {
	n := len(nums)
	type pair struct{ num, cnt int }
	var getMaxCnt2 func(map[int]int) []pair
	getMaxCnt2 = func(cnt map[int]int) []pair {
		a := make([]pair, 0, max(2, len(cnt)))
		for num, c := range cnt {
			a = append(a, pair{num, c})
		}
		// 按照cnt从大到小排序
		slices.SortFunc(a, func(x, y pair) int { return y.cnt - x.cnt })
		return a[:2]
	}
	cnt := [2]map[int]int{{}, {}}
	for i, num := range nums {
		cnt[i&1][num]++
	}
	a0 := getMaxCnt2(cnt[0])
	a1 := getMaxCnt2(cnt[1])
	if a0[0].num != a1[0].num {
		return n - a0[0].cnt - a1[0].cnt
	}
	return n - max(a0[0].cnt+a1[1].cnt, a0[1].cnt+a1[0].cnt)
}


func calcEquation(equations [][]string, values []float64, queries [][]string) []float64 {
	type pair struct {
		label string
		value float64
	}
	// 构建图
	g := make(map[string][]pair)
	for i, eq := range equations {
		x, y := eq[0], eq[1]
		v := values[i]
		g[x] = append(g[x], pair{y, v})
		g[y] = append(g[y], pair{x, 1.0 / v})
	}

	var results []float64
	visited := make(map[string]bool)
	var dfs func(string, string) float64
	dfs = func(start, end string) (res float64) {
		if start == end {
			return
		}
		visited[start] = true
		for _, item := range g[start] {
			if !visited[item.label] {
				res *= dfs(item.label, end)
			}
		}
		return
	}
	for _, query := range queries {
		start, end := query[0], query[1]
		res := -1.0
		clear(visited)
		if _, ok1 := g[start]; ok1 {
			if _, ok2 := g[end]; ok2 {
				res = dfs(start, end)
			}
		}
		results = append(results, res)
	}
	return results
}
