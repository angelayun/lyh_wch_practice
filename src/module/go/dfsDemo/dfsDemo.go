package dfsdemo

import (
	"math"
	"math/bits"
	"slices"
	"sort"
	"strconv"
	"strings"
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
	haveSecret := map[int]bool{0: true, firstPerson: true}
	for i, n := 0, len(meetings); i < n; {
		t := meetings[i][2]
		// 每相同时间建图  图是用map存的邻接表
		g := map[int][]int{}
		for ; i < n && meetings[i][2] == t; i++ {
			x, y := meetings[i][0], meetings[i][1]
			g[x] = append(g[x], y)
			g[y] = append(g[y], x)
		}
		// 内部避免重复问题
		vis := map[int]bool{}
		var dfs func(int)
		dfs = func(x int) {
			vis[x] = true
			haveSecret[x] = true
			for _, y := range g[x] {
				if !vis[y] {
					dfs(y)
				}
			}
		}
		for v := range g {
			// 循环内部图 只有这个人知道秘密并且没有访问过就dfs
			if haveSecret[v] && !vis[v] {
				dfs(v)
			}
		}
	}
	// 把知道秘密的人输出为答案
	for i := range haveSecret {
		ans = append(ans, i)
	}
	return ans
}
func minOperations(nums []int, k int) int {
	mn := math.MaxInt
	cnt := map[int]struct{}{}
	for _, x := range nums {
		cnt[x] = struct{}{}
		mn = min(mn, x)
	}
	if k > mn {
		return -1
	}
	ans := len(cnt)
	if mn == k {
		return ans - 1
	}
	return ans
}
func canFinish(numCourses int, prerequisites [][]int) bool {
	g := make([][]int, numCourses)
	for _, e := range prerequisites {
		x, y := e[0], e[1]
		g[y] = append(g[y], x)
	}
	// 0表示未访问  1表示正在访问中  2表示访问已结束
	colors := make([]int, numCourses)
	var dfs func(int) bool
	dfs = func(x int) bool {
		colors[x] = 1
		for _, y := range g[x] {
			if colors[y] == 1 || (colors[y] == 0 && dfs(y)) {
				return true
			}
		}
		colors[x] = 2
		return false
	}
	for i, x := range colors {
		if x == 0 && dfs(i) {
			return false
		}
	}
	return true
}

func eventualSafeNodes(graph [][]int) (ans []int) {
	n := len(graph) // 获取图的节点数
	// cols 数组用于标记每个节点的访问状态：0 - 未访问, 1 - 正在访问, 2 - 已访问完成
	cols := make([]int, n)
	//  inloop 数组用于标记每个节点是否在环中：true - 在环中, false - 不在环中
	inloop := make([]bool, n)
	var dfs func(int) bool
	dfs = func(index int) bool {
		cols[index] = 1 // 标记当前节点为正在访问中（递归栈中的节点）
		// 遍历当前节点的所有邻接节点
		for _, i := range graph[index] {
			// 判断当前邻接节点是否有环，或者是否已经访问过且没有环
			if cols[i] == 1 || inloop[i] || (cols[i] == 0 && dfs(i)) {
				inloop[index] = true // 如果有环，标记当前节点也在环中
			}
		}
		cols[index] = 2      // 标记当前节点访问完成
		return inloop[index] // 返回当前节点是否在环中
	}
	// 遍历每个节点，进行深度优先搜索（DFS）
	for i := 0; i < n; i++ {
		if cols[i] == 0 { // 如果当前节点未被访问过
			dfs(i) // 从该节点开始进行 DFS
		}
		if !inloop[i] { // 如果该节点不在环中，说明它是安全节点
			ans = append(ans, i) // 将安全节点加入结果列表
		}
	}
	return // 返回所有安全节点
}

func maximumDetonation(bombs [][]int) (ans int) {
	n := len(bombs)
	g := make([][]int, n)
	for i, p := range bombs {
		x, y, r := p[0], p[1], p[2]
		for j, q := range bombs {
			dx := x - q[0]
			dy := y - q[1]
			if i != j && dx*dx+dy*dy <= r*r {
				g[i] = append(g[i], j)
			}
		}
	}
	vis := make([]bool, n)
	var dfs func(int) int
	dfs = func(x int) int {
		cnt := 1
		vis[x] = true
		for _, y := range g[x] {
			if !vis[y] {
				cnt += dfs(y)
			}
		}
		return cnt
	}
	for i := range g {
		clear(vis)
		ans = max(ans, dfs(i))
		if ans == n {
			return
		}
	}
	return
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
			for email := range emailSet {
				res = append(res, email)
			}
			slices.Sort(res[1:])
			ans = append(ans, res)
		}
	}
	return
}
func numberOfPowerfulInt(start int64, finish int64, limit int, s string) int64 {
	low := strconv.FormatInt(start, 10)
	// low := strconv.Itoa(int(start))
	high := strconv.FormatInt(finish, 10)
	n := len(high)
	low = strings.Repeat("0", n-len(low)) + low
	diff := n - len(s)
	memo := make([]int64, n)
	for i := range memo {
		memo[i] = -1
	}
	var dfs func(int, bool, bool) int64
	dfs = func(i int, limitLow, limitHigh bool) (res int64) {
		if i == n {
			return 1
		}
		if !limitLow && !limitHigh {
			p := &memo[i]
			if *p >= 0 {
				return *p
			}
			defer func() {
				*p = res
			}()
		}
		lo := 0
		if limitLow {
			lo = int(low[i] - '0')
		}
		hi := 9
		if limitHigh {
			hi = int(high[i] - '0')
		}
		if i < diff {
			for d := lo; d <= min(hi, limit); d++ {
				res += dfs(i+1, limitLow && d == lo, limitHigh && d == hi)
			}
		} else {
			x := int(s[i-diff] - '0')
			if lo <= x && x < min(hi, limit) {
				res += dfs(i+1, limitLow && x == lo, limitHigh && x == hi)
			}
		}
		return
	}
	return dfs(0, true, true)
}
func minCosts(cost []int) []int {
	n := len(cost)
	ans := make([]int, n)
	ans[0] = cost[0]
	for i := 1; i < n; i++ {
		ans[i] = min(ans[i-1], cost[i])
	}
	return ans
}
func reverseDegree(s string) (ans int) {
	for i, ch := range s {
		c := 26 - int(ch-'a')
		ans += c * (i + 1)
	}
	return ans
}

func numDupDigitsAtMostN1(n int) int {
	s := strconv.Itoa(n)
	m := len(s)
	// 1 <= n <= 10^9
	memo := make([][1 << 10]int, m)
	for i := range memo {
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int, bool, bool) int
	dfs = func(i, mask int, isLimit, isNum bool) (res int) {
		if i >= m {
			if isNum {
				return 1
			}
			return 0
		}
		if !isLimit && isNum {
			p := &memo[i][mask]
			if *p != -1 {
				return *p
			}
			defer func() {
				*p = res
			}()
		}
		if !isNum {
			res += dfs(i+1, mask, false, false)
		}
		d := 0
		if !isNum {
			d = 1
		}
		up := 9
		if isLimit {
			up = int(s[i] - '0')
		}
		for ; d <= up; d++ {
			if mask>>d&1 == 0 {
				res += dfs(i+1, mask|1<<d, isLimit && d == up, true)
			}
		}
		return res
	}
	return n - dfs(0, 0, true, false)
}
func numDupDigitsAtMostN(n int) int {
	s := strconv.Itoa(n)
	m := len(s)
	memo := make([][1 << 10]int, m)
	for i := range memo {
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int, bool, bool) int
	dfs = func(i, mask int, isLimit, isNum bool) (res int) {
		if i >= m {
			if isNum {
				return 1
			}
			return 0
		}
		if !isLimit && isNum {
			p := &memo[i][mask]
			if *p != -1 {
				return *p
			}
			defer func() {
				*p = res
			}()
		}
		if !isNum {
			res += dfs(i+1, mask, false, false)
		}
		d := 0
		if !isNum {
			d = 1
		}
		hi := 9
		if isLimit {
			hi = int(s[i] - '0')
		}
		for ; d <= hi; d++ {
			if mask>>d&1 == 0 {
				res += dfs(i+1, mask|1<<d, isLimit && d == hi, true)
			}
		}
		return res
	}
	return n - dfs(0, 0, true, false)
}

func countSpecialNumbers(n int) int {
	s := strconv.Itoa(n)
	m := len(s)
	memo := make([][1 << 10]int, m)
	for i := range memo {
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int, bool, bool) int
	dfs = func(i, mask int, isLimit, isNum bool) (res int) {
		if i >= m {
			if isNum {
				return 1
			}
			return 0
		}
		if !isLimit && isNum {
			p := &memo[i][mask]
			if *p != -1 {
				return *p
			}
			defer func() {
				*p = res
			}()
		}
		if !isNum {
			res += dfs(i+1, mask, false, false)
		}
		d := 0
		if !isNum {
			d = 1
		}
		hi := 9
		if isLimit {
			hi = int(s[i] - '0')
		}
		for ; d <= hi; d++ {
			if mask>>d&1 == 0 {
				res += dfs(i+1, mask|1<<d, isLimit && d == hi, true)
			}
		}
		return res
	}
	return dfs(0, 0, true, false)
}
func findIntegers(n int) int {
	m := bits.Len(uint(n))
	memo := make([][2]int, m)
	for i := range memo {
		memo[i] = [2]int{-1, -1}
	}
	var dfs func(int, int, bool) int
	dfs = func(i, pre int, isLimit bool) (res int) {
		if i < 0 {
			return 1
		}
		if !isLimit {
			p := &memo[i][pre]
			if *p != -1 {
				return *p
			}
			defer func() {
				*p = res
			}()
		}
		up := 1
		if isLimit {
			up = n >> i & 1
		}
		res += dfs(i-1, 0, isLimit && up == 0)
		if pre == 0 && up == 1 {
			res += dfs(i-1, 1, isLimit)
		}
		return res
	}
	return dfs(m-1, 0, true)
}
func count(num1 string, num2 string, min_sum int, max_sum int) int {
	const mod int = 1e9 + 7
	n := len(num2)
	num1 = strings.Repeat("0", n-len(num1)) + num1
	memo := make([][]int, n)
	for i := range memo {
		memo[i] = make([]int, min(n*9, max_sum)+1)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int, bool, bool) int
	dfs = func(i, sum int, lowLimit, highLimit bool) (res int) {
		if sum > max_sum {
			return
		}
		if i >= n {
			if sum >= min_sum {
				return 1
			}
			return 0
		}
		if !lowLimit && !highLimit {
			p := &memo[i][sum]
			if *p != -1 {
				return *p
			}
			defer func() {
				*p = res
			}()
		}
		lo := 0
		if lowLimit {
			lo = int(num1[i] - '0')
		}
		hi := 9
		if highLimit {
			hi = int(num2[i] - '0')
		}
		for d := lo; d <= hi; d++ {
			res = (res + dfs(i+1, sum+d, lowLimit && d == lo, highLimit && d == hi)) % mod
		}
		return res
	}
	return dfs(0, 0, true, true)
}
func countBalls(lowLimit int, highLimit int) (ans int) {
	highS := strconv.Itoa(highLimit)
	n := len(highS)
	lowS := strconv.Itoa(lowLimit)
	lowS = strings.Repeat("0", n-len(lowS)) + lowS
	m := int(highS[0]-'0') + (n-1)*9
	memo := make([][]int, n)
	for i := range memo {
		memo[i] = make([]int, m+1)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int, bool, bool) int
	dfs = func(i, left int, limitLow, limitHigh bool) (res int) {
		if i == n {
			if left == 0 {
				return 1
			}
			return 0
		}
		if !limitHigh && !limitLow {
			p := &memo[i][left]
			if *p != -1 {
				return *p
			}
			defer func() {
				*p = res
			}()
		}
		lo := 0
		if limitLow {
			lo = int(lowS[i] - '0')
		}
		hi := 9
		if limitHigh {
			hi = int(highS[i] - '0')
		}
		for d := lo; d <= min(hi, left); d++ {
			res += dfs(i+1, left-d, limitLow && d == lo, limitHigh && d == hi)
		}
		return res
	}
	for j := 1; j <= m; j++ {
		ans = max(ans, dfs(0, j, true, true))
	}
	return
}
func rotatedDigits(n int) int {
	// 是0的表示翻转成自己了 是1表示翻转成对应了
	var diffs = [10]int{0, 0, 1, -1, -1, 1, 1, -1, 0, 1}
	s := strconv.Itoa(n)
	m := len(s)
	memo := make([][2]int, m)
	for i := range memo {
		memo[i] = [2]int{-1, -1}
	}
	var dfs func(int, int, bool) int
	dfs = func(i, isDiff int, isLimit bool) (res int) {
		if i == m {
			return isDiff
		}
		if !isLimit {
			p := &memo[i][isDiff]
			if *p != -1 {
				return *p
			}
			defer func() {
				*p = res
			}()
		}
		hi := 9
		if isLimit {
			hi = int(s[i] - '0')
		}
		for d := 0; d <= hi; d++ {
			if diffs[d] != -1 {
				res += dfs(i+1, isDiff|diffs[d], isLimit && d == hi)

			}
		}
		return
	}
	return dfs(0, 0, true)
}
func beautifulNumbers(l int, r int) int {
	low := strconv.Itoa(l)
	high := strconv.Itoa(r)
	n := len(high)
	diffLH := n - len(low)
	type pair struct{ i, m, s int }
	memo := map[pair]int{}
	var dfs func(int, int, int, bool, bool) int
	dfs = func(i, m, s int, limitLow bool, limitHigh bool) (res int) {
		if i == n {
			if s == 0 || m%s != 0 {
				return 0
			}
			return 1
		}
		if !limitLow && !limitHigh {
			t := pair{i, m, s}
			if v, ok := memo[t]; ok {
				return v
			}
			defer func() {
				memo[t] = res
			}()
		}
		lo := 0
		if limitLow && i >= diffLH {
			lo = int(low[i-diffLH] - '0')
		}
		hi := 9
		if limitHigh {
			hi = int(high[i] - '0')
		}
		d := lo
		if limitLow && i < diffLH {
			res += dfs(i+1, 1, 0, true, false)
			d = 1
		}
		for ; d <= hi; d++ {
			res += dfs(i+1, m*d, s+d, limitLow && d == lo, limitHigh && d == hi)
		}
		return
	}
	return dfs(0, 1, 0, true, true)
}

// countSteppingNumbers 计算区间 [low, high] 内步进数字的数量
func countSteppingNumbers(low, high string) int {
	const mod = 1e9 + 7
	n := len(high)
	// 补齐 low 长度，使其与 high 长度相同
	low = strings.Repeat("0", n-len(low)) + low
	// memo 数组用于记忆化搜索
	memo := make([][]int, n)
	for i := range memo {
		memo[i] = make([]int, 10)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	// 定义递归函数 dfs
	var dfs func(i, pre int, limitLow, limitHigh, isNum bool) int
	dfs = func(i, pre int, limitLow, limitHigh, isNum bool) (res int) {
		if i == n {
			if isNum {
				return 1
			}
			return 0
		}
		if !limitLow && !limitHigh && isNum {
			p := &memo[i][pre]
			if *p != -1 {
				return *p
			}
			defer func() {
				*p = res
			}()
		}
		lo := 0
		if limitLow {
			lo = int(low[i] - '0')
		}
		hi := 9
		if limitHigh {
			hi = int(high[i] - '0')
		}
		// 处理前导零情况
		if !isNum && lo == 0 {
			res += dfs(i+1, 0, true, false, false)
		}
		start := lo
		if !isNum {
			if lo < 1 {
				start = 1
			}
		}
		for d := start; d <= hi; d++ {
			if isNum {
				if abs(pre-d) == 1 {
					res = (res + dfs(i+1, d, limitLow && d == lo, limitHigh && d == hi, true)) % mod
				}
			} else {
				res = (res + dfs(i+1, d, limitLow && d == lo, limitHigh && d == hi, true)) % mod
			}
		}
		return res
	}
	return dfs(0, 0, true, true, false)
}

// abs 计算整数的绝对值
func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
func maximumSum00(arr []int) int {
	n := len(arr)
	memo := make([][2]int, n)
	for i := range memo {
		memo[i] = [2]int{math.MinInt, math.MinInt}
	}
	var dfs func(int, int) int
	dfs = func(i, canDelete int) (res int) {
		if i < 0 {
			return math.MinInt / 2
		}
		p := &memo[i][canDelete]
		if *p != math.MinInt {
			return *p
		}
		defer func() {
			*p = res
		}()
		if canDelete == 0 {
			// 不能删除  递归到前面依旧是不能删除
			// 需要跟0取max 过滤不合法的情况
			return max(dfs(i-1, 0), 0) + arr[i]
		}
		// 递归到前面依旧可以删除  / 删除当前元素 递归到前面不可以删除
		return max(dfs(i-1, 1)+arr[i], dfs(i-1, 0))
	}
	ans := math.MinInt
	for i := range arr {
		ans = max(ans, dfs(i, 0), dfs(i, 1))
	}
	return ans
}
func maximumSum(arr []int) int {
	n := len(arr)
	dp := make([][2]int, n+1)
	dp[0] = [2]int{math.MinInt / 2, math.MinInt / 2}
	ans := math.MinInt
	for i := range arr {
		dp[i+1][0] = max(dp[i][0], 0) + arr[i]
		dp[i+1][1] = max(dp[i][1]+arr[i], dp[i][0])
		ans = max(ans, dp[i+1][0], dp[i+1][1])
	}
	return ans
}
func trap1(height []int) (ans int) {
	n := len(height)
	suffix := make([]int, n)
	suffix[n-1] = height[n-1]
	for i := n - 2; i >= 0; i-- {
		suffix[i] = max(suffix[i+1], height[i])
	}
	prefix := 0
	for i := 0; i < n; i++ {
		prefix = max(prefix, height[i])
		ans += min(suffix[i], prefix) - height[i]
	}
	return
}
func trap(height []int) (ans int) {
	st := []int{}
	for i, h := range height {
		for len(st) > 0 && h >= height[st[len(st)-1]] {
			bottomHeight := height[st[len(st)-1]]
			st = st[:len(st)-1]
			if len(st) == 0 {
				break
			}
			left := st[len(st)-1]
			ans += (min(h, height[left]) - bottomHeight) * (i - left + 1)
		}
		st = append(st, i)
	}
	return
}
func differenceOfDistinctValues(grid [][]int) [][]int {
	m, n := len(grid), len(grid[0])
	ans := make([][]int, m)
	for i := range ans {
		ans[i] = make([]int, n)
	}
	set := map[int]struct{}{}

	// 第一排在右上，最后一排在左下
	// 每排从左上到右下
	// 令 k=i-j+n，那么右上角 k=1，左下角 k=m+n-1
	for k := 1; k < m+n; k++ {
		// 核心：计算 j 的最小值和最大值
		minJ := max(n-k, 0)       // i=0 的时候，j=n-k，但不能是负数
		maxJ := min(m+n-1-k, n-1) // i=m-1 的时候，j=m+n-1-k，但不能超过 n-1

		clear(set)
		for j := minJ; j <= maxJ; j++ {
			i := k + j - n
			ans[i][j] = len(set) // topLeft[i][j] == len(set)
			set[grid[i][j]] = struct{}{}
		}

		clear(set)
		for j := maxJ; j >= minJ; j-- {
			i := k + j - n
			ans[i][j] = abs(ans[i][j] - len(set)) // bottomRight[i][j] == len(set)
			set[grid[i][j]] = struct{}{}
		}
	}
	return ans
}

func minSumOfLengths(arr []int, target int) int {
	n := len(arr)
	pre := make([]int, n+1)
	for i := range pre {
		pre[i] = math.MaxInt32
	}
	l := 0
	res := math.MaxInt32
	// 求前缀和
	s := make([]int, n+1)
	for i := 0; i < n; i++ {
		s[i+1] = s[i] + arr[i]
	}
	for r := 0; r < n; r++ {
		// 前缀和大于target 缩减窗口
		for s[r+1]-s[l] > target {
			l++
		}
		if s[r+1]-s[l] == target {
			// 前缀和因为偏移了1位
			res = min(res, pre[l]+r-l+1)
			// 左边窗口的最短长度
			pre[r+1] = min(pre[r], r-l+1)
		} else {
			pre[r+1] = pre[r]
		}
	}
	if res < math.MaxInt32 {
		return res
	}
	return -1
}
func gcd(a int, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}
func lcm(a int, b int) int {
	return a / gcd(a, b) * b
}
func maxScore(nums []int) int64 {
	n := len(nums)
	suffixGcd := make([]int, n+1)
	suffixLcm := make([]int, n+1)
	suffixLcm[n] = 1
	for i := n - 1; i >= 0; i-- {
		suffixLcm[i] = lcm(suffixLcm[i+1], nums[i])
		suffixGcd[i] = gcd(suffixGcd[i+1], nums[i])
	}
	prefixGcd, prefixLcm := 0, 1
	ans := suffixGcd[0] * suffixLcm[0]
	for i := 0; i < n; i++ {
		ans = max(ans, gcd(prefixGcd, suffixGcd[i+1])*lcm(prefixLcm, suffixLcm[i+1]))
		prefixGcd = gcd(prefixGcd, nums[i])
		prefixLcm = lcm(prefixLcm, nums[i])
	}
	return int64(ans)
}
func lengthOfLIS111(nums []int) (ans int) {
	n := len(nums)
	memo := make([]int, n)
	for i := range memo {
		memo[i] = -1
	}
	var dfs func(int) int
	dfs = func(i int) (res int) {
		if i <= 0 {
			return 1
		}
		p := &memo[i]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		for j := range nums[:i] {
			if nums[j] < nums[i] {
				res = max(dfs(j), res)
			}
		}
		return res + 1
	}
	for i := range nums {
		ans = max(ans, dfs(i))
	}
	return
}
func lengthOfLIS(nums []int) (ans int) {
	n := len(nums)
	dp := make([]int, n)
	for i := range nums {
		for j := range nums[:i] {
			if nums[j] < nums[i] {
				dp[i] = max(dp[j], dp[i])
			}
		}
		dp[i]++
		ans = max(ans, dp[i])
	}
	return
}

// 定义 g[i] 表示长为 i+1 的上升子序列的末尾元素的最小值。
func lengthOfLIS2(nums []int) int {
	g := []int{}
	for _, x := range nums {
		j := sort.SearchInts(g, x)
		if j == len(g) {
			g = append(g, x)
		} else {
			g[j] = x
		}
	}
	return len(g)
}
func minimumMountainRemovals(nums []int) int {
	n := len(nums)
	suffix := make([]int, n+1)
	g := []int{}
	for i := n - 1; i >= 0; i-- {
		x := nums[i]
		j := sort.SearchInts(g, x)
		if j == len(g) {
			g = append(g, x)
		} else {
			g[j] = x
		}
		// 从 nums[i] 开始的最长严格递减子序列的长度
		suffix[i] = j + 1
	}
	mx := 0
	g = []int{}
	for i := 0; i < n; i++ {
		x := nums[i]
		j := sort.SearchInts(g, x)
		if j == len(g) {
			g = append(g, x)
		} else {
			g[j] = x
		}
		pre := j + 1
		if pre >= 2 && suffix[i] >= 2 {
			mx = max(mx, pre+suffix[i]-1)
		}
	}
	return n - mx
}
func numberOfSubsequences_gar(nums []int) int64 {
	//
	//
	n := len(nums)
	ans := 0
	// 用于存储比例及其出现次数的映射
	cnt := make(map[float64]int)
	for i := 4; i < n-2; i++ {
		c := nums[i]
		b := nums[i-2]
		for j := 0; j < i-3; j++ {
			a := nums[j]
			// 计算比例 a/b 并更新其出现次数
			ratio := float64(a) / float64(b)
			cnt[ratio] = cnt[ratio] + 1
		}
		for k := i + 2; k < n; k++ {
			d := nums[k]
			curKey := float64(d) / float64(c)
			// 累加满足条件的子序列数量
			ans += cnt[curKey]
		}
		// 清空 cnt 以便下次使用
		for key := range cnt {
			delete(cnt, key)
		}
	}
	return int64(ans)
}
func numberOfSubsequences_mod(nums []int) (ans int64) {
	// a*c= b*d
	// a/b=d/c
	n := len(nums)
	cnt := map[float32]int{}
	// 枚举 b 和 c
	for i := 4; i < n-2; i++ {
		// 增量式更新，本轮循环只需枚举 b=nums[i-2] 这一个数
		// 至于更前面的 b，已经在前面的循环中添加到 cnt 中了，不能重复添加
		b := float32(nums[i-2])
		// 枚举 a
		for _, a := range nums[:i-3] {
			cnt[float32(a)/b]++
		}

		c := float32(nums[i])
		// 枚举 d
		for _, d := range nums[i+2:] {
			ans += int64(cnt[float32(d)/c])
		}
	}
	return
}
func numberOfSubsequences(nums []int) (ans int64) {
	// a*c=b*d
	// a/b=d/c
	n := len(nums)
	cnt := map[float32]int{}
	for i := 4; i < n-2; i++ {
		b := float32(nums[i-2])
		for _, a := range nums[:i-3] {
			cnt[float32(a)/b]++
		}
		c := nums[i]
		for _, d := range nums[i+2:] {
			v := float32(d) / float32(c)
			ans += int64(cnt[v])
		}
	}
	return ans
}

// countQuadruplets 用于统计满足特定条件的四元组数量
// @param nums 整数切片
// @return 满足条件的四元组数量
func countQuadruplets(nums []int) (ans int64) {
	// 枚举j和k 先预先统计j左边比它小的数的个数  和 k 右边比它大的数的个数
	n := len(nums)
	// great 数组用于记录每个位置 k 右边比某个数小的数的个数
	great := make([][]int, n)
	for i := range great {
		great[i] = make([]int, n+1)
	}
	for k := n - 2; k >= 2; k-- {
		copy(great[k], great[k+1])
		for x := 1; x < nums[k+1]; x++ {
			great[k][x]++
		}
	}
	// less 数组用于记录每个位置 j 左边比某个数大的数的个数
	less := make([]int, n+1)
	for j := 1; j < n-2; j++ {
		for x := nums[j-1] + 1; x <= n; x++ {
			less[x]++
		}
		for k := j + 1; k < n-1; k++ {
			if nums[j] > nums[k] {
				ans += int64(less[nums[k]]) * int64(great[k][nums[j]])
			}
		}
	}
	return ans
}
func minimumTime(s string) (ans int) {
	n := len(s)
	suffix := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		ch := s[i]
		if ch == '1' {
			suffix[i] = min(suffix[i+1]+2, n-i)
		} else {
			suffix[i] = suffix[i+1]
		}
	}
	pre := 0
	ans = suffix[0]
	for i, ch := range s {
		if ch == '1' {
			pre = min(pre+2, i+1)
			ans = min(ans, pre+suffix[i+1])
		}
	}
	return
}
func countPalindromicSubsequence(s string) (ans int) {
	var pre, suf, has [26]int
	for _, ch := range s[1:] {
		suf[ch-'a']++
	}
	for i := 1; i < len(s)-1; i++ { // 枚举回文子序列的中间字符
		pre[s[i-1]-'a']++
		suf[s[i]-'a']--
		for j := 0; j < 26; j++ { // 枚举中间字符的左右字符
			if pre[j] > 0 && suf[j] > 0 { // 找到了一个回文子序列
				has[s[i]-'a'] |= 1 << j
			}
		}
	}
	for _, mask := range has {
		ans += bits.OnesCount(uint(mask)) // 累加二进制中 1 的个数即为答案
	}
	return
}
func countPalindromes1(s string) (ans int) {
	const mod int = 1e9 + 7
	n := len(s)
	suf := [10]int{}
	suf2 := [10][10]int{}
	for i := n - 1; i >= 0; i-- {
		d := s[i] - '0'
		for j, c := range suf {
			suf2[d][j] += c
		}
		suf[d]++
	}

	pre := [10]int{}
	pre2 := [10][10]int{}
	for _, d := range s[:n-1] {
		d -= '0'
		suf[d]--
		for j, c := range suf {
			suf2[d][j] -= c // 撤销
		}
		for j, sf := range suf2 {
			for k, c := range sf {
				ans += pre2[j][k] * c // 枚举所有字符组合
			}
		}
		for j, c := range pre {
			pre2[d][j] += c
		}
		pre[d]++
	}
	return ans % mod
}
func countPalindromes(s string) (ans int) {
	const mod = 1e9 + 7
	n := len(s)
	suf := [10]int{}
	suf2 := [10][10]int{}
	for i := n - 1; i >= 0; i-- {
		d := s[i] - '0'
		for j, c := range suf {
			suf2[d][j] += c
		}
		suf[d]++
	}
	pre := [10]int{}
	pre2 := [10][10]int{}
	for _, d := range s[:n-1] {
		d -= '0'
		suf[d]--
		for j, c := range suf {
			suf2[d][j] -= c
		}
		for j, sf := range suf2 {
			for k, c := range sf {
				ans += pre2[j][k] * c
			}
		}
		for j, c := range pre {
			pre2[d][j] += c
		}
		pre[d]++
	}
	return
}

