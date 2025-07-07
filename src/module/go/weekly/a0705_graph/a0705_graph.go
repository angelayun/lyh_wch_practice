package a0705graph

import (
	"fmt"
	"math"
	"slices"
	"sort"
	"strconv"
	"strings"
	"unicode"
)

func findCircleNum(isConnected [][]int) (ans int) {
	fmt.Println("test")
	n := len(isConnected)
	vis := make([]bool, n)
	var dfs func(int)
	dfs = func(x int) {
		vis[x] = true
		for y, ok := range isConnected[x] {
			if ok == 1 && !vis[y] {
				dfs(y)
			}
		}
	}
	for i := range n {
		if !vis[i] {
			ans++
			dfs(i)
		}
	}
	return
}
func validPath(n int, edges [][]int, source int, destination int) bool {
	g := make([][]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}
	vis := make([]bool, n)
	var dfs func(int) bool
	dfs = func(x int) bool {
		vis[x] = true
		if x == destination {
			return true
		}
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

func allPathsSourceTarget(graph [][]int) (ans [][]int) {
	n := len(graph)
	path := []int{}
	var dfs func(int)
	dfs = func(x int) {
		path = append(path, x)
		if x == n-1 {
			ans = append(ans, slices.Clone(path))
		} else {
			for _, y := range graph[x] {
				dfs(y)
			}
		}
		path = path[:len(path)-1]
	}
	dfs(0)
	return
}
func canVisitAllRooms(rooms [][]int) bool {
	n := len(rooms)
	vis := make([]bool, n)
	var dfs func(int)
	dfs = func(x int) {
		vis[x] = true
		for _, y := range rooms[x] {
			if !vis[y] {
				dfs(y)
			}
		}
	}
	dfs(0)
	for _, ok := range vis {
		if !ok {
			return false
		}
	}
	return true
}

func countPairs(n int, edges [][]int) int64 {
	g := make([][]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}
	vis := make([]bool, n)
	var dfs func(int) int
	dfs = func(x int) (res int) {
		vis[x] = true
		res = 1
		for _, y := range g[x] {
			if !vis[y] {
				res += dfs(y)
			}
		}
		return
	}
	ans, visCnt := 0, 0
	for i := range vis {
		if !vis[i] {
			cnt := dfs(i)
			ans += visCnt * cnt
			visCnt += cnt
		}
	}
	return int64(ans)
}
func mseakeConnected(n int, connections [][]int) int {
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
	cnt := 0
	for i, ok := range vis {
		if !ok {
			dfs(i)
			cnt = 1
		}
	}
	return cnt - 1
}
func minScore(n int, roads [][]int) int {
	type pair struct{ to, w int }
	g := make([][]pair, n)
	for _, e := range roads {
		x, y, w := e[0]-1, e[1]-1, e[2]
		g[x] = append(g[x], pair{y, w})
		g[y] = append(g[y], pair{x, w})
	}
	ans := math.MaxInt
	vis := make([]bool, n)
	var dfs func(int)
	dfs = func(x int) {
		vis[x] = true
		for _, p := range g[x] {
			ans = min(ans, p.w)
			if !vis[p.to] {
				dfs(p.to)
			}
		}
	}
	dfs(0)
	return ans
}
func remainingMethods(n int, k int, invocations [][]int) (ans []int) {
	g := make([][]int, n)
	for _, e := range invocations {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
	}
	del := make([]bool, n)
	var dfs func(int)
	dfs = func(x int) {
		del[x] = true
		for _, y := range g[x] {
			if !del[y] {
				dfs(y)
			}
		}
	}
	dfs(k)
	for _, e := range invocations {
		x, y := e[0], e[1]
		if !del[x] && del[y] {
			for i := range n {
				ans = append(ans, i)
			}
			return
		}
	}
	for i, ok := range del {
		if !ok {
			ans = append(ans, i)
		}
	}
	return
}

func countCompleteComponents(n int, edges [][]int) (ans int) {
	g := make([][]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}
	var v, e int
	vis := make([]bool, n)
	var dfs func(int)
	dfs = func(x int) {
		vis[x] = true
		v++
		e += len(g[x])
		for _, y := range g[x] {
			if !vis[y] {
				dfs(y)
			}
		}
	}
	for i, ok := range vis {
		if !ok {
			dfs(i)
			if v*(v-1) == e {
				ans++
			}
		}
	}
	return
}

func getAncestors(n int, edges [][]int) [][]int {
	g := make([][]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
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
	ans := make([][]int, n)
	for i := range n {
		clear(vis)
		dfs(i)
		vis[i] = false
		for j, ok := range vis {
			if ok {
				ans[i] = append(ans[i], j)
			}
		}
	}
	return ans
}

type tuple struct {
	to   string
	rate float64
}

func calcAmount(initialCurrency string, pairs [][]string, rates []float64) map[string]float64 {
	g := map[string][]tuple{}
	for i, p := range pairs {
		x, y, r := p[0], p[1], rates[i]
		g[x] = append(g[x], tuple{y, r})
		g[y] = append(g[y], tuple{x, 1 / r})
	}
	cnt := map[string]float64{}
	var dfs func(string, float64)
	dfs = func(x string, curAmout float64) {
		cnt[x] = curAmout
		for _, e := range g[x] {
			if cnt[e.to] == 0 {
				dfs(e.to, curAmout*e.rate)
			}
		}
	}
	dfs(initialCurrency, 1)
	return cnt
}
func maxAmount(initialCurrency string, pairs1 [][]string, rates1 []float64, pairs2 [][]string, rates2 []float64) (ans float64) {
	amount1 := calcAmount(initialCurrency, pairs1, rates1)
	amount2 := calcAmount(initialCurrency, pairs2, rates2)
	for x, d2 := range amount2 {
		ans = max(ans, amount1[x]/d2)
	}
	return
}

func minMalwareSpread333(graph [][]int, initial []int) int {
	n := len(graph)
	isInitial := make([]bool, n)
	for _, i := range initial {
		isInitial[i] = true
	}
	vis := make([]bool, n)
	var nodeId, size int
	var dfs func(int)
	dfs = func(x int) {
		vis[x] = true
		size++
		if nodeId != -2 && isInitial[x] {
			if nodeId < 0 {
				nodeId = x
			} else {
				nodeId = -2
			}
		}
		for y, ok := range graph[x] {
			if ok == 1 && !vis[y] {
				dfs(y)
			}
		}
	}
	ans := -1
	maxSize := 0
	for _, x := range initial {
		if !vis[x] {
			nodeId = -1
			size = 0
			dfs(x)
			if nodeId >= 0 && (size > maxSize || size == maxSize && nodeId < ans) {
				ans = nodeId
				maxSize = size
			}
		}
	}
	if ans < 0 {
		return slices.Min(initial)
	}
	return ans
}
func minMalwareSpread444(graph [][]int, initial []int) int {
	n := len(graph)
	isInitial := make([]bool, n)
	for _, i := range initial {
		isInitial[i] = true
	}
	vis := make([]bool, n)
	var nodeId, size int
	var dfs func(int)
	dfs = func(x int) {
		vis[x] = true
		size++
		if nodeId != -2 && isInitial[x] {
			if nodeId < 0 {
				nodeId = x
			} else {
				nodeId = -2
			}
		}
		for y, ok := range graph[x] {
			if ok == 1 && !vis[y] {
				dfs(y)
			}
		}
	}
	ans := -1
	maxSize := 0
	for _, x := range initial {
		if !vis[x] {
			nodeId = -1
			size = 0
			dfs(x)
			if nodeId >= 0 && (size > maxSize || size == maxSize && nodeId < ans) {
				ans = nodeId
				maxSize = size
			}
		}
	}
	if ans < 0 {
		return slices.Min(initial)
	}
	return ans
}

func maximumDetonation(bombs [][]int) (ans int) {
	n := len(bombs)
	g := make([][]int, n)
	for i, bo := range bombs {
		x, y, r := bo[0], bo[1], bo[2]
		for j, bo2 := range bombs {
			dx, dy := x-bo2[0], y-bo2[1]
			if i != j && dx*dx+dy*dy <= r*r {
				g[i] = append(g[i], j)
			}
		}
	}
	vis := make([]bool, n)
	var dfs func(int) int
	dfs = func(x int) (res int) {
		res++
		vis[x] = true
		for _, y := range g[x] {
			if !vis[y] {
				res += dfs(y)
			}
		}
		return
	}
	for i := range n {
		clear(vis)
		ans = max(ans, dfs(i))
		if ans == n {
			return
		}
	}
	return ans
}

func accountsMerge(accounts [][]string) (ans [][]string) {
	n := len(accounts)
	emailToIdx := map[string][]int{}
	for i, acc := range accounts {
		for _, email := range acc[1:] {
			emailToIdx[email] = append(emailToIdx[email], i)
		}
	}
	vis := make([]bool, n)
	emailSet := map[string]struct{}{}
	var dfs func(int)
	dfs = func(x int) {
		vis[x] = true
		for _, email := range accounts[x][1:] {
			if _, ok := emailSet[email]; !ok {
				emailSet[email] = struct{}{}
				for _, j := range emailToIdx[email] {
					if !vis[j] {
						dfs(j)
					}
				}
			}
		}
	}
	for i, ok := range vis {
		if !ok {
			clear(emailSet)
			dfs(i)
			res := make([]string, 1, len(emailSet)+1)
			res[0] = accounts[i][0]
			for key := range emailSet {
				res = append(res, key)
			}
			slices.Sort(res[1:])
			ans = append(ans, res)
		}
	}
	return
}
func canFinish(numCourses int, prerequisites [][]int) bool {
	g := make([][]int, numCourses)
	colors := make([]int, numCourses)
	for _, e := range prerequisites {
		x, y := e[0], e[1]
		g[y] = append(g[y], x)
	}
	// 如果有环就返回true
	var dfs func(int) bool
	dfs = func(x int) bool {
		colors[x] = 1
		for _, y := range g[x] {
			if colors[y] == 1 || colors[y] == 0 && dfs(y) {
				return true
			}
		}
		colors[x] = 2
		return false
	}
	for i := range numCourses {
		if colors[i] == 0 && dfs(i) {
			return false
		}
	}
	return true
}

func rearrangeArray(nums []int) []int {
	n := len(nums)
	ans := make([]int, n)
	i, j := 0, 1
	for _, x := range nums {
		if x > 0 {
			ans[i] = x
			i += 2
		} else {
			ans[j] = x
			j += 2
		}
	}
	return ans
}

/*
	 func countVowels(word string) (ans int64) {
		for i, ch := range word {
			if strings.ContainsRune("aeiou", ch) {
				ans += int64(i+1) * int64(len(word)-i)
			}
		}
		return
	}
*/
func countVowels(word string) int64 {
	ans := 0
	n := len(word)
	for i, ch := range word {
		if strings.ContainsRune("aeiou", ch) {
			ans += (i + 1) * (n - i)
		}
	}
	return int64(ans)
}

func averageWaitingTime(customers [][]int) float64 {
	last := customers[0][0]
	total := 0
	for _, item := range customers {
		start, time := item[0], item[1]
		total += max(time, last+time-start)
		last = last + time
	}
	// fmt.Println(total)
	return float64(total) / float64(len(customers))
}

func eventualSafeNodes(graph [][]int) (ans []int) {
	n := len(graph)
	colors := make([]int, n)
	// 如果有环就返回true
	var dfs func(int) bool
	dfs = func(x int) bool {
		if colors[x] != 0 {
			return colors[x] == 2
		}
		colors[x] = 1
		for _, y := range graph[x] {
			if !dfs(y) {
				return false
			}
		}
		colors[x] = 2
		return true
	}
	for i := range n {
		if dfs(i) {
			ans = append(ans, i)
		}
	}
	return ans
}

func minMalwareSpread12356(graph [][]int, initial []int) int {
	n := len(graph)
	vis := make([]bool, n)
	isInitial := make([]bool, n)
	for _, x := range initial {
		isInitial[x] = true
	}
	var nodeId, size int
	var dfs func(int)
	dfs = func(x int) {
		vis[x] = true
		size++
		if nodeId != -2 && isInitial[x] {
			if nodeId < 0 {
				nodeId = x
			} else {
				nodeId = -2
			}
		}
		for y, ok := range graph[x] {
			if ok == 1 && !vis[y] {
				dfs(y)
			}
		}
	}
	ans := -1
	maxSize := 0
	for _, x := range initial {
		if !vis[x] {
			nodeId = -1
			size = 0
			dfs(x)
			if nodeId >= 0 && (size > maxSize || size == maxSize && nodeId < ans) {
				ans = nodeId
				maxSize = size
			}
		}
	}
	if ans == -1 {
		return slices.Min(initial)
	}
	return ans
}

func minMalwareSpread222(graph [][]int, initial []int) int {
	n := len(graph)
	vis := make([]bool, n)
	isInitial := make([]bool, n)
	for _, x := range initial {
		isInitial[x] = true
	}
	var nodeId, size int
	var dfs func(int)
	dfs = func(x int) {
		vis[x] = true
		size++
		for y, conn := range graph[x] {
			if conn == 0 {
				continue
			}
			if isInitial[y] {
				if nodeId != -1 && nodeId != y {
					if nodeId == -1 {
						nodeId = x
					} else {
						nodeId = -2
					}
				}
			} else if !vis[y] {
				dfs(y)
			}
		}
	}
	cnt := make([]int, n)
	for i, seen := range vis {
		if seen || isInitial[i] {
			continue
		}
		nodeId = -1
		size = 0
		dfs(i)
		if nodeId >= 0 {
			cnt[nodeId] += size
		}
	}
	maxCnt := 0
	minNodeId := -1
	for i, c := range cnt {
		if c > maxCnt {
			maxCnt = cnt[i]
			minNodeId = i
		}
	}
	if minNodeId >= 0 {
		return minNodeId
	}
	return slices.Min(initial)
}

func minMalwareSpread(graph [][]int, initial []int) int {
	n := len(graph)
	isInitial := make([]bool, n)
	for _, x := range initial {
		isInitial[x] = true
	}
	vis := make([]bool, n)
	var nodeId, size int
	cnt := make([]int, n)
	var dfs func(int)
	dfs = func(x int) {
		vis[x] = true
		size++
		for y, ok := range graph[x] {
			if ok == 1 {
				if isInitial[y] {
					if nodeId != -2 && nodeId != y {
						if nodeId == -1 {
							nodeId = y
						} else {
							nodeId = -2
						}
					}
				} else if !vis[y] {
					dfs(y)
				}
			}
		}
	}
	for i, ok := range vis {
		if ok || isInitial[i] {
			continue
		}
		nodeId = -1
		size = 0
		dfs(i)
		if nodeId >= 0 {
			cnt[nodeId] += size
		}
	}
	maxCnt, minNodeId := 0, -1
	for i, c := range cnt {
		if c > 0 {
			if c > maxCnt {
				maxCnt = c
				minNodeId = i
			}
		}
	}
	if minNodeId >= 0 {
		return minNodeId
	}
	return slices.Min(initial)
}

func findAllPeople222(n int, meetings [][]int, firstPerson int) (ans []int) {
	slices.SortFunc(meetings, func(a, b []int) int { return a[2] - b[2] })
	have := map[int]bool{0: true, firstPerson: true}
	m := len(meetings)
	for i := 0; i < m; {
		t := meetings[i][2]
		g := map[int][]int{}
		for ; i < m && meetings[i][2] == t; i++ {
			x, y := meetings[i][0], meetings[i][1]
			g[x] = append(g[x], y)
			g[y] = append(g[y], x)
		}
		vis := map[int]bool{}
		var dfs func(int)
		dfs = func(x int) {
			have[x] = true
			vis[x] = true
			for _, y := range g[x] {
				if !vis[y] {
					dfs(y)
				}
			}
		}
		for v := range g {
			if have[v] && !vis[v] {
				dfs(v)
			}
		}
	}
	for i := range have {
		ans = append(ans, i)
	}
	return
}

func findAllPeople(n int, meetings [][]int, firstPerson int) (ans []int) {
	slices.SortFunc(meetings, func(a, b []int) int { return a[2] - b[2] })
	m := len(meetings)
	have := map[int]bool{0: true, firstPerson: true}
	for i := 0; i < m; {
		t := meetings[i][2]
		g := map[int][]int{}
		for ; i < m && meetings[i][2] == t; i++ {
			x, y := meetings[i][0], meetings[i][1]
			g[x] = append(g[x], y)
			g[y] = append(g[y], x)
		}
		vis := map[int]bool{}
		var dfs func(int)
		dfs = func(x int) {
			vis[x] = true
			have[x] = true
			for _, y := range g[x] {
				if !vis[y] {
					dfs(y)
				}
			}
		}
		for x := range g {
			if have[x] && !vis[x] {
				dfs(x)
			}
		}
	}
	for k := range have {
		ans = append(ans, k)
	}
	return
}
func minimumCost(n int, edges [][]int, query [][]int) []int {
	type pair struct{ to, w int }
	g := make([][]pair, n)
	for _, e := range edges {
		x, y, w := e[0], e[1], e[2]
		g[x] = append(g[x], pair{y, w})
		g[y] = append(g[y], pair{x, w})
	}
	idx := make([]int, n)
	for i := range idx {
		idx[i] = -1
	}
	ccAnd := []int{}
	var dfs func(int) int
	dfs = func(x int) int {
		and := -1
		idx[x] = len(ccAnd)
		for _, item := range g[x] {
			y, w := item.to, item.w
			and &= w
			if idx[y] < 0 {
				and &= dfs(y)
			}
		}
		return and
	}
	for i, v := range idx {
		if v < 0 {
			ccAnd = append(ccAnd, dfs(i))
		}
	}
	m := len(query)
	ans := make([]int, m)
	for i, q := range query {
		start, end := q[0], q[1]
		if idx[start] == idx[end] {
			ans[i] = ccAnd[idx[start]]
		} else {
			ans[i] = -1
		}
	}
	return ans
}
func shortestDistanceAfterQueries(n int, queries [][]int) []int {
	g := make([][]int, n-1)
	for i := range g {
		g[i] = append(g[i], i+1)
	}
	vis := make([]int, n-1)
	var bfs func(int) int
	bfs = func(i int) int {
		queue := []int{0}
		vis[0] = i
		for step := 1; ; step++ {
			tmp := queue
			queue = nil
			for _, x := range tmp {
				for _, y := range g[x] {
					if y == n-1 {
						return step
					}
					if vis[y] != i {
						vis[y] = i
						queue = append(queue, y)
					}
				}
			}
		}
		return -1
	}
	m := len(queries)
	ans := make([]int, m)
	for i, q := range queries {
		x, y := q[0], q[1]
		g[x] = append(g[x], y)
		ans[i] = bfs(i + 1)
	}
	return ans
}

func concatHex36111(n int) string {
	two := n * n
	three := two * n
	fn := func(n int, radix int) string {
		ans := []byte{}
		for n > 0 {
			x := n % radix
			if x <= 9 {
				ans = append(ans, byte(x+'0')) // 使用x而不是n
			} else {
				ans = append(ans, byte(x-10+'A')) // 正确的字符转换
			}
			n /= radix
		}
		// 反转字节切片
		for i, j := 0, len(ans)-1; i < j; i, j = i+1, j-1 {
			ans[i], ans[j] = ans[j], ans[i]
		}
		return string(ans)
	}
	return fn(two, 16) + fn(three, 36)
}

func minCost22(m int, n int, waitCost [][]int) int64 {
	type pair struct {
		i int
		j int
		// 为true表示奇数
		flag int
		val  int
	}
	queue := []pair{{0, 0, 0, 1 * 1}}

	for len(queue) > 0 {
		tmp := queue
		queue = nil
		for _, p := range tmp {
			i, j, flag, val := p.i, p.j, p.flag, p.val
			if i == m-1 && j == n-1 {
				return int64(val)
			}
			if flag == 0 {
				// 进入等待
				if j+1 < n {
					queue = append(queue, pair{i, j + 1, flag ^ 1, val + (i+1)*(j+2)})
				}
				if i+1 < m {
					queue = append(queue, pair{i + 1, j, flag ^ 1, val + (i+2)*(j+1)})

				}
			} else {
				queue = append(queue, pair{i, j, flag ^ 1, val + waitCost[i][j]})
			}
		}
	}
	return -1
}

func concatHex36(n int) string {
	str := strconv.FormatInt(int64(n*n), 16) + strconv.FormatInt(int64(n*n*n), 36)
	return strings.ToUpper(str)
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
func IsAlphaNumUnderscore(s string) bool {
	for _, r := range s {
		if !unicode.IsLetter(r) && !unicode.IsDigit(r) && r != '_' {
			return false
		}
	}
	return true
}
func IsCategoryWord(s string) bool {
	categories := []string{"electronics", "grocery", "pharmacy", "restaurant"}
	for _, cat := range categories {
		if cat == s {
			return true
		}
	}
	return false
}
func validateCoupons(code []string, businessLine []string, isActive []bool) (ans []string) {
	// electronics grocery pharmacy restaurant
	cnt := map[string][]string{}
	for i, str := range code {
		if len(str) > 0 && isActive[i] && IsCategoryWord(businessLine[i]) && IsAlphaNumUnderscore(str) {
			cnt[businessLine[i]] = append(cnt[businessLine[i]], str)
		}
	}
	for key, ls := range cnt {
		// slices.Sort(ls)
		sort.Strings(ls)
		cnt[key] = ls
	}
	ans = append(ans, cnt["electronics"]...)
	ans = append(ans, cnt["grocery"]...)
	ans = append(ans, cnt["pharmacy"]...)
	ans = append(ans, cnt["restaurant"]...)
	return
}

func processQueries(c int, connections [][]int, queries [][]int) (ans []int) {
	isAlive := make([]bool, c)
	for i := range isAlive {
		isAlive[i] = true
	}
	g := make([][]int, c)
	for _, e := range connections {
		x, y := e[0]-1, e[1]-1
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}
	idx := make([]int, c)
	for i := range idx {
		idx[i] = -1
	}
	uniqueKey := 0
	cnt := map[int][]int{}
	var dfs func(int)
	dfs = func(x int) {
		idx[x] = uniqueKey
		cnt[uniqueKey] = append(cnt[uniqueKey], x)
		for _, y := range g[x] {
			if idx[y] < 0 {
				dfs(y)
			}
		}
	}

	for i, v := range idx {
		if v < 0 {
			dfs(i)
			slices.Sort(cnt[uniqueKey])
			uniqueKey++
		}
	}
	for _, q := range queries {
		t, x := q[0], q[1]-1
		if t == 1 {
			if isAlive[x] {
				ans = append(ans, x+1)
			} else {
				flag := false
				for _, i := range cnt[idx[x]] {
					if isAlive[i] {
						flag = true
						ans = append(ans, i+1)
						break
					}
				}
				if flag == false {
					ans = append(ans, -1)
				}
			}
		} else {
			isAlive[x] = false
		}
	}
	return
}

func minTime(n int, edges [][]int, k int) int {
	type pair struct{ y, t int }
	g := make([][]pair, n)
	maxT := math.MinInt
	for _, e := range edges {
		x, y, t := e[0], e[1], e[2]
		g[x] = append(g[x], pair{y, t})
		g[y] = append(g[y], pair{x, t})
		maxT = max(maxT, t)
	}
	left, right := -1, maxT+1
	check := func(mid int) bool {
		cnt := 0
		// mid为最大上界时间
		vis := make([]bool, n)
		var dfs func(int)
		dfs = func(x int) {
			vis[x] = true
			for _, item := range g[x] {
				if mid < item.t && !vis[item.y] {
					dfs(item.y)
				}
			}
		}
		for i := range vis {
			if !vis[i] {
				dfs(i)
				cnt++
			}
		}
		// fmt.Println(mid, cnt)
		return cnt >= k
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		// fmt.Println("mid是些啥", mid)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	if right<0{
		return 0
	}
	return right
}
