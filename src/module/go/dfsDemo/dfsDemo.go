package dfsdemo

import (
	"math"
	"slices"
)

func findCircleNum(isConnected [][]int) (ans int) {
	n := len(isConnected)
	vis := make([]bool, n)
	var dfs func(int)
	dfs = func(i int) {
		vis[i] = true
		for j, ok := range isConnected[i] {
			if j != i && ok == 1 && !vis[j] {
				dfs(j)
			}
		}
	}
	for i := range n {
		if !vis[i] {
			ans++
			dfs(i)
		}
	}
	return ans
}
func validPath(n int, edges [][]int, source int, destination int) bool {
	// 建立邻接表
	g := make([][]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}
	vis := make([]bool, n)
	var dfs func(int) bool
	dfs = func(x int) bool {
		if x == destination {
			return true
		}
		vis[x] = true
		for _, y := range g[x] {
			if !vis[y] {
				if dfs(y) {
					return true
				}
			}
		}
		return false
	}
	return dfs(source)
}
func minimumOperations(nums []int) int {
	n := len(nums)
	set := map[int]struct{}{}
	for i := n - 1; i >= 0; i-- {
		x := nums[i]
		if _, ok := set[x]; !ok {
			set[nums[i]] = struct{}{}
		} else {
			return (i + 3) / 3
		}
	}
	return 0
}
func allPathsSourceTarget(graph [][]int) (ans [][]int) {
	n := len(graph)
	path := []int{}
	var dfs func(int)
	dfs = func(x int) {
		path = append(path, x)
		if x == n-1 {
			ans = append(ans, slices.Clone(path))
			return
		} else {
			for _, y := range graph[x] {
				dfs(y)
			}
		}
		path = path[:len(path)-1]
	}
	dfs(0)
	return ans
}
func canVisitAllRooms(rooms [][]int) bool {
	n := len(rooms)
	// 标记房间是否被访问过
	visited := make([]bool, n)
	visited[0] = true
	var dfs func(int)
	dfs = func(x int) {
		for _, y := range rooms[x] {
			if !visited[y] {
				visited[y] = true
				dfs(y)
			}
		}
	}
	dfs(0)
	// 检查是否所有房间都被访问过
	for _, ok := range visited {
		if !ok {
			return false
		}
	}
	return true
}
func countPairs(n int, edges [][]int) (ans int64) {
	g := make([][]int, n)
	// 建立邻接表
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}
	vis := make([]bool, n)
	var dfs func(int) int
	dfs = func(x int) int {
		vis[x] = true
		sum := 1
		for _, y := range g[x] {
			if !vis[y] {
				sum += dfs(y)
			}
		}
		return sum
	}
	visitedCnt := 0
	for i, ok := range vis {
		if !ok {
			cnt := dfs(i)
			ans += int64(visitedCnt) * int64(cnt)
			visitedCnt += cnt
		}
	}
	return ans
}
func makeConnected(n int, connections [][]int) int {
	// n个点至少需要n-1条边
	if len(connections) < n-1 {
		return -1
	}
	g := make([][]int, n)
	for _, e := range connections {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}
	vis := make([]bool, n)
	var dfs func(int)
	dfs = func(x int) {
		vis[x] = true
		for _, y := range g[x] {
			if !vis[y] {
				dfs(y)
			}
		}
	}
	// 联通块的个数
	cnt := 0
	for i, ok := range vis {
		if !ok {
			cnt++
			dfs(i)
		}
	}
	return cnt - 1
}

func minScore1(n int, roads [][]int) int {
	type pair struct{ y, w int }
	g := make([][]pair, n)
	for _, e := range roads {
		x, y, w := e[0]-1, e[1]-1, e[2]
		g[x] = append(g[x], pair{y, w})
		g[y] = append(g[y], pair{x, w})
	}
	vis := make([]bool, n)
	vis[0] = true
	var dfs func(int) int
	dfs = func(x int) int {
		res := math.MaxInt
		for _, e := range g[x] {
			y, w := e.y, e.w
			if y == n-1 {
				return min(res, w)
			} else {
				if !vis[y] {
					vis[y] = true
					res = min(res, dfs(y))
				}
			}
		}
		return res
	}
	return dfs(0)
}
func minScore(n int, roads [][]int) (ans int) {
	ans = math.MaxInt
	type pair struct{ y, w int }
	g := make([][]pair, n)
	for _, e := range roads {
		x, y, w := e[0]-1, e[1]-1, e[2]
		g[x] = append(g[x], pair{y, w})
		g[y] = append(g[y], pair{x, w})
	}
	vis := make([]bool, n)
	var dfs func(int)
	dfs = func(x int) {
		vis[x] = true
		for _, e := range g[x] {
			ans = min(ans, e.y)
			if !vis[e.y] {
				dfs(e.y)
			}
		}
	}
	dfs(0)
	return
}
func minimumCost1(n int, edges [][]int, query [][]int) []int {
	type pair struct{ to, w int }
	g := make([][]pair, n)
	for _, e := range edges {
		x, y, w := e[0], e[1], e[2]
		g[x] = append(g[x], pair{y, w})
		g[y] = append(g[y], pair{x, w})
	}
	// 记录每个点所在联通图的编号
	ids := make([]int, n)
	for i := range ids {
		ids[i] = -1
	}
	// 存储对应联通图的 &值
	ccAnd := []int{}
	var dfs func(int) int
	dfs = func(x int) int {
		ids[x] = len(ccAnd)
		and := -1
		for _, p := range g[x] {
			y, w := p.to, p.w
			and &= w
			if ids[y] < 0 {
				and &= dfs(y)
			}
		}
		return and
	}
	for i, v := range ids {
		if v < 0 {
			ccAnd = append(ccAnd, dfs(i))
		}
	}
	m := len(query)
	ans := make([]int, m)
	for i, q := range query {
		s, t := q[0], q[1]
		if ids[s] == ids[t] {
			ans[i] = ccAnd[ids[s]]
		} else {
			ans[i] = -1
		}
	}
	return ans
}

func minimumCost(n int, edges [][]int, query [][]int) []int {
	type pair struct{ to, w int }
	g := make([][]pair, n)
	for _, e := range edges {
		x, y, w := e[0], e[1], e[2]
		g[x] = append(g[x], pair{y, w})
		g[y] = append(g[y], pair{x, w})
	}
	ids := make([]int, n)
	for i := range ids {
		ids[i] = -1
	}
	ccAnd := []int{}
	var dfs func(int) int
	dfs = func(x int) int {
		ids[x] = len(ccAnd)
		and := -1
		for _, obj := range g[x] {
			y, w := obj.to, obj.w
			and &= w
			if ids[y] < 0 {
				and &= dfs(y)
			}
		}
		return and
	}
	for i, v := range ids {
		if v < 0 {
			ccAnd = append(ccAnd, dfs(i))
		}
	}
	m := len(query)
	ans := make([]int, m)
	for i, q := range query {
		s, e := q[0], q[1]
		if ids[s] == ids[e] {
			ans[i] = ccAnd[ids[s]]
		} else {
			ans[i] = -1
		}
	}
	return ans
}
func findAllPeople(n int, meetings [][]int, firstPerson int) (ans []int) {
	// 按照时间排序
	slices.SortFunc(meetings, func(x, y []int) int {
		return x[2] - y[2]
	})
	// sort.Slice(meetings, func(i, j int) bool { return meetings[i][2] < meetings[j][2] }) // 按照时间排序

	haveSecret := map[int]bool{0: true, firstPerson: true}
	for i, n := 0, len(meetings); i < n; {
		t := meetings[i][2]
		g := map[int][]int{}
		for ; i < n && meetings[i][2] == t; i++ {
			x, y := meetings[i][0], meetings[i][1]
			g[x] = append(g[x], y)
			g[y] = append(g[y], x)
		}
		vis := map[int]bool{}
		var dfs func(int)
		dfs = func(x int) {
			vis[x] = true
			haveSecret[x] = true
			for y := range g[x] {
				if !vis[y] {
					dfs(y)
				}
			}
		}
		for v := range g {
			if haveSecret[v] && !vis[v] {
				dfs(v)
			}
		}
	}
	for i := range haveSecret {
		ans = append(ans, i)
	}
	return ans
}
