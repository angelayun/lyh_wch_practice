package gridchart

import (
	"fmt"
	"maps"
	"math"
	"math/bits"
	"slices"
	"sort"
	"strconv"
	"strings"
	"unicode"
)

func findMaxFish(grid [][]int) (ans int) {
	m, n := len(grid), len(grid[0])
	var dfs func(i, j int) int
	var dirs = []struct{ x, y int }{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	dfs = func(i, j int) (ans int) {
		if grid[i][j] == 0 {
			return 0
		}
		ans += grid[i][j]
		grid[i][j] = 0
		for _, d := range dirs {
			ii, jj := i+d.x, j+d.y
			if ii >= 0 && jj >= 0 && ii < m && jj < n && grid[ii][jj] != 0 {
				ans += dfs(ii, jj)
			}
		}
		return ans
	}
	for i, rows := range grid {
		for j := range rows {
			ans = max(ans, dfs(i, j))
		}
	}
	return ans
}

func ballGame2(num int, plate []string) (ans [][]int) {
	var dirs = []struct{ x, y int }{{0, 1}, {1, 0}, {0, -1}, {-1, 0}} // 右下左上（顺时针）
	m, n := len(plate), len(plate[0])
	check := func(x, y, d int) bool {
		for left := num; plate[x][y] != 'O'; left-- {
			if left == 0 { // 无剩余步数
				return false
			}
			if plate[x][y] == 'W' { // 逆时针
				d = (d + 3) % 4
			} else if plate[x][y] == 'E' { // 顺时针
				d = (d + 1) % 4
			}
			x += dirs[d].x
			y += dirs[d].y
			if x < 0 || x >= m || y < 0 || y >= n { // 从另一边出去了
				return false
			}
		}
		return true
	}
	for i := 1; i < m-1; i++ {
		// 第一列  向右
		if plate[i][0] == '.' && check(i, 0, 0) {
			ans = append(ans, []int{i, 0})
		}
		// 最后一列 向左
		if plate[i][n-1] == '.' && check(i, n-1, 2) {
			ans = append(ans, []int{i, n - 1})
		}
	}
	for i := 1; i < n-1; i++ {
		// 第一行  向下
		if plate[0][i] == '.' && check(0, i, 1) {
			ans = append(ans, []int{0, i})
		}
		// 最后一行 向上
		if plate[m-1][i] == '.' && check(m-1, i, 3) {
			ans = append(ans, []int{m - 1, i})
		}
	}
	return ans
}

func findSafeWalk(grid [][]int, health int) bool {
	type pair struct{ x, y int }
	dirs := []pair{{0, 1}, {1, 0}, {0, -1}, {-1, 0}}
	m, n := len(grid), len(grid[0])
	dis := make([][]int, m)
	for i := range dis {
		dis[i] = make([]int, n)
		for j := range dis[i] {
			dis[i][j] = math.MaxInt
		}
	}
	dis[0][0] = grid[0][0]
	queue := [2][]pair{{{}}}
	for len(queue[0]) > 0 || len(queue[1]) > 0 {
		var first pair
		if len(queue[0]) > 0 {
			first, queue[0] = queue[0][len(queue[0])-1], queue[0][:len(queue[0])-1]
		} else {
			first, queue[1] = queue[1][0], queue[1][1:]
		}
		i, j := first.x, first.y
		for _, d := range dirs {
			x, y := i+d.x, j+d.y
			if x >= 0 && x < m && y >= 0 && y < n {
				cost := grid[x][y]
				if dis[x][y] > dis[i][j]+cost {
					dis[x][y] = dis[i][j] + cost
					queue[cost] = append(queue[cost], pair{x, y})
				}
			}
		}
	}
	return dis[m-1][n-1] < health
}

func isPossibleToCutPath(grid [][]int) bool {
	m, n := len(grid), len(grid[0])
	var dfs func(int, int) bool
	// 返回能否到达终点
	dfs = func(x, y int) bool {
		if x == m-1 && y == n-1 {
			return true
		}
		grid[x][y] = 0
		return x < m-1 && grid[x+1][y] > 0 && dfs(x+1, y) || y < n-1 && grid[x][y+1] > 0 && dfs(x, y+1)
	}
	// 优先走下轮廓  如果下轮廓都到达不了终点  那都不用删除点了
	// 如果走了下轮廓  然后把下轮廓上的点都置为了0  然后走任何一条路都到达不了终点...
	return !dfs(0, 0) || !dfs(0, 0)
}

type pair struct{ x, y int }

var dirs = []pair{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

func challengeOfTheKeeper(maze []string) int {
	m, n := len(maze), len(maze[0])

	// 1. 找到起点终点坐标
	var sx, sy, tx, ty int
	for i, row := range maze {
		for j, c := range row {
			if c == 'S' {
				sx, sy = i, j
			} else if c == 'T' {
				tx, ty = i, j
			}
		}
	}

	// 2. BFS 计算终点到其余点的最短距离
	disFromT := make([][]int, m)
	for i := range disFromT {
		disFromT[i] = make([]int, n)
		for j := range disFromT[i] {
			disFromT[i][j] = math.MaxInt
		}
	}
	disFromT[tx][ty] = 0
	q := []pair{{tx, ty}}
	for step := 1; len(q) > 0; step++ {
		tmp := q
		q = nil
		for _, p := range tmp {
			for _, d := range dirs {
				x, y := p.x+d.x, p.y+d.y
				if 0 <= x && x < m && 0 <= y && y < n && maze[x][y] != '#' && disFromT[x][y] == math.MaxInt {
					disFromT[x][y] = step
					q = append(q, pair{x, y})
				}
			}
		}
	}

	// 3. 剪枝：如果 S 无法到达 T，直接返回 -1
	if disFromT[sx][sy] == math.MaxInt {
		return -1
	}

	// 4. 二分答案 https://www.bilibili.com/video/BV1AP41137w7/
	vis := make([][]int, m)
	for i := range vis {
		vis[i] = make([]int, n)
	}
	ans := sort.Search(m*n+1, func(maxDis int) bool {
		// DFS，看能否在「附加负面效果」的情况下，移动不超过 maxDis 步到达终点
		var dfs func(int, int) bool
		dfs = func(i, j int) bool {
			if i < 0 || i >= m || j < 0 || j >= n || vis[i][j] == maxDis+1 || maze[i][j] == '#' {
				return false
			}
			if maze[i][j] == 'T' { // 到达终点
				return true
			}
			vis[i][j] = maxDis + 1 // 为避免反复创建 vis，用一个每次二分都不一样的数来标记
			if maze[i][j] == '.' {
				// 守护者使用卷轴传送小扣，如果小扣无法在 maxDis 步内到达终点，则返回 false
				if x, y := i, n-1-j; maze[x][y] != '#' && disFromT[x][y] > maxDis {
					return false
				}
				if x, y := m-1-i, j; maze[x][y] != '#' && disFromT[x][y] > maxDis {
					return false
				}
			}
			// 枚举四个方向
			for _, d := range dirs {
				if dfs(i+d.x, j+d.y) { // 到达终点
					return true
				}
			}
			return false // 无法到达终点
		}
		return dfs(sx, sy)
	})
	if ans > m*n { // 守护者使用卷轴传送小扣，可以把小扣传送到一个无法到达终点的位置
		return -1
	}
	return ans
}

func maxMoves22(grid [][]int) (ans int) {
	m, n := len(grid), len(grid[0])
	var dfs func(int, int)
	dfs = func(i, j int) {
		ans = max(ans, j)
		if ans == n-1 { // ans 已达到最大值
			return
		}
		// 向右上/右/右下走一步
		for k := max(i-1, 0); k < min(i+2, m); k++ {
			if grid[k][j+1] > grid[i][j] {
				dfs(k, j+1)
			}
		}
		grid[i][j] = 0
	}
	for i := range grid {
		dfs(i, 0) // 从第一列的任一单元格出发
	}
	return
}

func maxMoves(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	vis := make([]int, m)
	queue := make([]int, m)
	// 一开始把所有 (i,0) 都加入一个列表
	for i := range queue {
		queue[i] = i
	}
	// 遍历列表中的坐标，把右边这一列的能到达的格子坐标加入一个新列表。注意只有之前没入队的格子才能入队
	for j := 0; j < n-1; j++ {
		newQueue := []int{}
		for _, i := range queue {
			for k := max(0, i-1); k < min(m, i+2); k++ {
				if vis[k] != j+1 && grid[k][j+1] > grid[i][j] {
					vis[k] = j + 1
					newQueue = append(newQueue, k)
				}
			}
		}
		// 无法再往右走了
		if len(newQueue) == 0 {
			return j
		} else {
			queue = newQueue
		}
	}
	return n - 1
}

func ballGame(num int, plate []string) (ans [][]int) {
	var dirs = []struct{ x, y int }{{1, 0}, {0, 1}, {-1, 0}, {0, -1}} // 右下左上（顺时针）
	m, n := len(plate), len(plate[0])
	check := func(x, y, d int) bool {
		for left := num; plate[x][y] != 'O'; left-- {
			if left == 0 { // 无剩余步数
				return false
			}
			if plate[x][y] == 'W' { // 逆时针
				d = (d - 1 + 4) % 4
			} else if plate[x][y] == 'E' { // 顺时针
				d = (d + 1) % 4
			}
			x += dirs[d].y
			y += dirs[d].x
			if x < 0 || x >= m || y < 0 || y >= n { // 从另一边出去了
				return false
			}
		}
		return true
	}
	for i := 1; i < m-1; i++ {
		// 第一列  向右
		if plate[i][0] == '.' && check(i, 0, 0) {
			ans = append(ans, []int{i, 0})
		}
		// 最后一列 向左
		if plate[i][n-1] == '.' && check(i, n-1, 2) {
			ans = append(ans, []int{i, n - 1})
		}
	}
	for i := 1; i < n-1; i++ {
		// 第一行  向下
		if plate[0][i] == '.' && check(0, i, 1) {
			ans = append(ans, []int{0, i})
		}

		// 最后一行 向上
		if plate[m-1][i] == '.' && check(m-1, i, 3) {
			ans = append(ans, []int{m - 1, i})
		}
	}
	return ans
}

func findWordsContaining1(words []string, x byte) (ans []int) {
	for i, word := range words {
		for _, w := range word {
			if x == byte(w) {
				ans = append(ans, i)
				break
			}
		}
	}
	return
}
func findWordsContaining(words []string, x byte) (ans []int) {
	for i, s := range words {
		if strings.IndexByte(s, x) >= 0 {
			ans = append(ans, i)
		}
	}
	return
}

func swimInWater(grid [][]int) int {
	n := len(grid)
	type pair struct{ x, y int }
	var dirs = []pair{{1, 0}, {0, 1}, {-1, 0}, {0, -1}}

	check := func(mid int) bool {
		// mid代表数据的上界（也就是此时的水位）
		if grid[0][0] > mid {
			return false
		}
		// 默认每一个单元格都没访问过
		visited := make([][]bool, n)
		for i := range visited {
			visited[i] = make([]bool, n)
		}
		// 把起点加入队列中
		queue := [][]int{{0, 0}}
		visited[0][0] = true

		for len(queue) > 0 {
			// 出队首
			cur := queue[0]
			queue = queue[1:]

			for _, dir := range dirs {
				x := cur[0] + dir.x
				y := cur[1] + dir.y
				// 在范围内  且 值小于当前水位  还没有被访问过
				if x >= 0 && x < n && y >= 0 && y < n && grid[x][y] <= mid && !visited[x][y] {
					queue = append(queue, []int{x, y})
					visited[x][y] = true
				}
			}
		}

		return visited[n-1][n-1]
	}

	left, right := -1, n*n
	for left+1 < right {
		mid := left + (right-left)/2
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}

	return right
}

func nearestExit111(maze [][]byte, entrance []int) int {
	m, n := len(maze), len(maze[0])
	type pair struct{ x, y int }
	var dirs = []pair{{1, 0}, {0, 1}, {-1, 0}, {0, -1}}
	queue := []pair{{entrance[0], entrance[1]}}
	maze[entrance[0]][entrance[1]] = '-'
	step := 0
	for len(queue) > 0 {
		step++
		cur := queue[0]
		queue = queue[1:]
		for _, d := range dirs {
			i, j := d.x+cur.x, d.y+cur.y
			if i >= 0 && i < m && j >= 0 && j < n && maze[i][j] == '.' {
				if i == 0 || i == m-1 || j == 0 || j == n-1 && (i != entrance[0] && j != entrance[0]) {
					return step
				}
				maze[i][j] = '-'
				queue = append(queue, pair{i, j})
			}
		}
	}
	return -1
}

func nearestExit(maze [][]byte, entrance []int) int {
	type pair struct{ x, y int }
	var dirs = []pair{{1, 0}, {0, 1}, {-1, 0}, {0, -1}}
	m, n := len(maze), len(maze[0])
	// 使用队列存储待处理的坐标
	q := []pair{{entrance[0], entrance[1]}}
	maze[entrance[0]][entrance[1]] = '-'
	// 距离
	d := 0
	for len(q) > 0 {
		sz := len(q)
		// 处理当前层的所有节点
		for k := 0; k < sz; k++ {
			x, y := q[0].x, q[0].y
			q = q[1:]
			// 枚举四个方向
			for _, dir := range dirs {
				xx, yy := x+dir.x, y+dir.y
				// 如果坐标合法
				if xx >= 0 && xx < m && yy >= 0 && yy < n {
					// 是空地才加入队列
					if maze[xx][yy] == '.' {
						q = append(q, pair{xx, yy})
						maze[xx][yy] = '-'
					}
					// 如果坐标不合法，并且和入口不相等，那么说明是边界
				} else if x != entrance[0] || y != entrance[1] {
					return d
				}
			}
		}
		d++
	}
	return -1
}

func longestPalindrome(words []string) (ans int) {
	hasSame := false
	cnt := map[string]int{}
	sameCnt := [26]int{}
	for _, s := range words {
		revert := string([]byte{s[1], s[0]})
		ans += cnt[revert]
		cnt[s]++
		if s[0] == s[1] {
			sameCnt[s[0]-'a']++
		}
	}
	for _, c := range sameCnt {
		if c&1 == 1 {
			hasSame = true
			break
		}
	}
	if hasSame {
		return ans*4 + 2
	}
	return ans * 4
}

func largestPathValue(colors string, edges [][]int) (ans int) {
	n := len(colors)
	g := make([][]int, n)
	deg := make([]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
		if x == y {
			// 有自闭环
			return -1
		}
		g[x] = append(g[x], y)
		deg[y]++
	}
	q := make([]int, 0, n)
	for i, d := range deg {
		if d == 0 {
			// 所有入度为0的点入队
			q = append(q, i)
		}
	}
	f := make([][26]int, n)
	for len(q) > 0 {
		x := q[0]
		q = q[1:]
		ch := colors[x] - 'a'
		f[x][ch]++
		ans = max(ans, f[x][ch])
		for _, y := range g[x] {
			for i, cnt := range f[x] {
				f[y][i] = max(f[y][i], cnt)
			}
			deg[y]--
			if deg[y] == 0 {
				q = append(q, y)
			}
		}
	}
	if cap(q) > 0 {
		return -1
	}
	return
}

func minimumTime(n int, relations [][]int, time []int) (ans int) {
	deg := make([]int, n)
	g := make([][]int, n)
	for _, r := range relations {
		x, y := r[0]-1, r[1]-1
		g[x] = append(g[x], y)
		deg[y]++
	}
	q := []int{}
	for i, d := range deg {
		if d == 0 {
			// 所有入度为0的点入队
			q = append(q, i)
		}
	}
	f := make([]int, n)
	for len(q) > 0 {
		x := q[0]
		q = q[1:]
		f[x] += time[x]
		ans = max(ans, f[x])
		for _, y := range g[x] {
			f[y] = max(f[y], f[x])
			if deg[y]--; deg[y] == 0 {
				q = append(q, y)
			}
		}
	}
	return
}

func maxValue(n int, index int, maxSum int) int {
	// 正确的二分查找边界，元素至少为1
	left, right := 0, maxSum+1
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
	for left+1 < right {
		mid := left + (right-left)/2
		if check(mid) {
			left = mid
		} else {
			right = mid
		}
	}

	// 返回left，因为left是最后一个满足条件的值
	return left
}
func sortColors(nums []int) {
	n := len(nums)
	if n < 2 {
		return
	}
	i, zero, two := 0, 0, n-1
	for i < two {
		if nums[i] == 0 {
			nums[zero], nums[i] = nums[i], nums[zero]
			zero++
			i++
		} else if nums[i] == 1 {
			i++
		} else {
			nums[two], nums[i] = nums[i], nums[two]
			two--
		}
	}
}

func findEvenNumbers2(digits []int) (ans []int) {
	cnt := [10]int{}
	for _, d := range digits {
		cnt[d]++
	}
next:
	for i := 100; i < 1000; i += 2 {
		c := [10]int{}
		for x := i; x > 0; x /= 10 {
			d := x % 10
			c[d]++
			if c[d] > cnt[d] {
				continue next
			}
		}
		ans = append(ans, i)
	}
	return
}

func findEvenNumbers(digits []int) (ans []int) {
	cnt := [10]int{}
	for _, d := range digits {
		cnt[d]++
	}
	var dfs func(int, int)
	dfs = func(i, x int) {
		if i == 3 {
			ans = append(ans, x)
			return
		}
		for d, c := range cnt {
			if c > 0 && ((i == 0 && d != 0) || i == 1 || (i == 2 && d%2 == 0)) {
				cnt[d]--
				dfs(i+1, x*10+c)
				cnt[d]++
			}
		}
	}
	dfs(0, 0)
	return
}

func pathExistenceQueries1(n int, nums []int, maxDiff int, queries [][]int) []bool {
	idx := []int{}
	for i := 0; i < len(nums)-1; i++ {
		if nums[i+1]-nums[i] > maxDiff {
			idx = append(idx, i)
		}
	}
	ans := []bool{}
	for _, q := range queries {
		u, v := q[0], q[1]
		ans = append(ans, sort.SearchInts(idx, u) == sort.SearchInts(idx, v))
	}
	return ans
}

func pathExistenceQueries(n int, nums []int, maxDiff int, queries [][]int) []bool {
	idx := []int{}
	for i := 1; i < len(nums); i++ {
		if nums[i]-nums[i-1] > maxDiff {
			idx = append(idx, i+1)
		}
	}
	ans := []bool{}
	for _, q := range queries {
		u, v := q[0], q[1]
		ans = append(ans, sort.SearchInts(idx, u) == sort.SearchInts(idx, v))
	}
	return ans
}

func differenceOfSums(n int, m int) int {
	cnt := 0
	for i := 1; i <= n; i++ {
		if i%m == 0 {
			cnt += i
		} else {
			cnt -= i
		}
	}
	return cnt
}

func maximumSegmentSum(nums []int, removeQueries []int) []int64 {
	n := len(nums)
	fa := make([]int, n+1)
	for i := range fa {
		fa[i] = i
	}
	sum := make([]int64, n+1)
	var find func(int) int
	find = func(x int) int {
		if fa[x] != x {
			fa[x] = find(fa[x])
		}
		return fa[x]
	}
	ans := make([]int64, n)
	for i := n - 1; i > 0; i-- {
		x := removeQueries[i]
		to := find(x + 1)
		fa[x] = to
		sum[to] += sum[x] + int64(nums[x])
		ans[i-1] = max(ans[i], sum[to])
	}
	return ans
}

func numberOfGoodPaths(vals []int, edges [][]int) int {
	n := len(vals)
	g := make([][]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}
	fa := make([]int, n)
	// size[x] 表示节点值等于 vals[x] 的节点个数，如果按照节点值从小到大合并，size[x] 也是连通块内的等于最大节点值的节点个数
	size := make([]int, n)
	id := make([]int, n)
	for i := range fa {
		fa[i] = i
		size[i] = 1
		id[i] = i
	}
	var find func(int) int
	find = func(x int) int {
		if fa[x] != x {
			fa[x] = find(fa[x])
		}
		return fa[x]
	}
	ans := n // 单个节点的好路径
	sort.Slice(id, func(i, j int) bool { return vals[id[i]] < vals[id[j]] })
	for _, x := range id {
		vx := vals[x]
		fx := find(x)
		for _, y := range g[x] {
			fy := find(y)
			// 只考虑最大节点值不超过 vx 的连通块
			if fy == fx || vals[y] > vx {
				continue
			}
			if vals[fy] == vx {
				// 可以构成好路径
				ans += size[fx] * size[fy]
				size[fx] += size[fy] // 统计连通块内节点值等于 vx 的节点个数
			}
			fa[fy] = fx // 把小的节点值合并到大的节点值上
		}
	}
	return ans
}

func count(edges [][]int) (g [][]int, cnt [2]int) {
	g = make([][]int, len(edges)+1)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}

	var dfs func(int, int, int)
	dfs = func(x, fa, d int) {
		cnt[d]++
		for _, y := range g[x] {
			if y != fa {
				dfs(y, x, d^1)
			}
		}
	}
	dfs(0, -1, 0)
	return
}

func maxTargetNodes(edges1, edges2 [][]int) []int {
	_, cnt2 := count(edges2)
	max2 := max(cnt2[0], cnt2[1])

	g, cnt1 := count(edges1)
	ans := make([]int, len(g))
	var dfs func(int, int, int)
	dfs = func(x, fa, d int) {
		// 当前点在第一个集合就加上第一个点集合的大小（当前点在第二个集合谅加上第二个点集合的大小）
		ans[x] = cnt1[d] + max2
		for _, y := range g[x] {
			if y != fa {
				dfs(y, x, d^1)
			}
		}
	}
	dfs(0, -1, 0)
	return ans
}
func highestRankedKItems222(grid [][]int, pricing []int, start []int, k int) (ans [][]int) {
	m, n := len(grid), len(grid[0])
	low, high := pricing[0], pricing[1]
	type pair struct{ x, y int }
	var dir4 = []pair{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	queue := []pair{{start[0], start[1]}}
	if grid[start[0]][start[1]] >= low && grid[start[0]][start[1]] <= high {
		ans = append(ans, start)
	}
	grid[start[0]][start[1]] = -1
	for len(queue) > 0 {
		tmp := queue
		queue = nil
		for _, q := range tmp {
			for _, d := range dir4 {
				x, y := q.x+d.x, q.y+d.y
				if x >= 0 && x < m && y >= 0 && y < n {
					if grid[x][y] >= low && grid[x][y] <= high {
						queue = append(queue, pair{x, y})
						grid[x][y] = -1
						ans = append(ans, []int{x, y})
						if len(ans) >= k {
							return
						}
					}
				}
			}
		}
	}
	return
}

func highestRankedKItems(grid [][]int, pricing []int, start []int, k int) (ans [][]int) {
	m, n := len(grid), len(grid[0])
	low, high := pricing[0], pricing[1]
	sx, sy := start[0], start[1]
	type tuple struct{ step, val, x, y int }
	// 检查起点是否是有效物品
	validItems := []tuple{}
	if grid[sx][sy] >= low && grid[sx][sy] <= high {
		validItems = append(validItems, tuple{0, grid[sx][sy], sx, sy})
	}

	// 方向数组
	type pair struct{ x, y int }
	var dir4 = []pair{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	// 初始化距离数组
	dist := make([][]int, m)
	for i := range dist {
		dist[i] = make([]int, n)
		for j := range dist[i] {
			dist[i][j] = -1
		}
	}
	dist[sx][sy] = 0

	// BFS 队列
	queue := [][]int{{sx, sy}}

	for len(queue) > 0 {
		curr := queue[0]
		queue = queue[1:]
		x, y := curr[0], curr[1]

		for _, d := range dir4 {
			nx, ny := x+d.x, y+d.y
			// 检查边界和障碍物
			if nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] > 0 && dist[nx][ny] == -1 {
				dist[nx][ny] = dist[x][y] + 1
				// 检查是否为有效物品
				if grid[nx][ny] >= low && grid[nx][ny] <= high {
					validItems = append(validItems, tuple{dist[nx][ny], grid[nx][ny], nx, ny})
				}
				queue = append(queue, []int{nx, ny})
			}
		}
	}

	// 按题目要求排序
	sort.Slice(validItems, func(i, j int) bool {
		a, b := validItems[i], validItems[j]
		if a.step != b.step {
			return a.step < b.step // 距离优先
		}
		if a.val != b.val {
			return a.val < b.val // 价格其次
		}
		if a.x != b.x {
			return a.x < b.x // 行号再次
		}
		return a.y < b.y // 列号最后
	})

	// 取前 k 个
	for i := 0; i < len(validItems) && i < k; i++ {
		ans = append(ans, []int{validItems[i].x, validItems[i].y})
	}

	return ans
}

func closestMeetingNode(edges []int, node1 int, node2 int) int {
	// slices.Sort()
	// sort.Ints()
	n := len(edges)
	minDis := math.MaxInt
	ans := -1
	var calcDis func(int) []int
	calcDis = func(x int) []int {
		dis := make([]int, n)
		for i := range dis {
			dis[i] = math.MaxInt
		}
		d := 0
		for x != -1 && dis[x] == math.MaxInt {
			dis[x] = d
			d++
			x = edges[x]
		}
		return dis
	}
	d1 := calcDis(node1)
	d2 := calcDis(node2)
	for i, x := range d1 {
		d := max(x, d2[i])
		if d < minDis {
			minDis = d
			ans = i
		}
	}
	return ans
}

func largestArea(runes []string) (ans int) {
	m, n := len(runes), len(runes[0])
	grid := make([][]rune, m)
	for i := range grid {
		grid[i] = []rune(runes[i])
	}
	// 方向数组
	type pair struct{ x, y int }
	var dir4 = []pair{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	flag := true
	var dfs func(int, int, rune, *bool) int
	dfs = func(i, j int, ch rune, flag *bool) (res int) {
		if i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == 0 {
			*flag = false
			return
		}
		if grid[i][j] != ch {
			return 0
		}
		grid[i][j] = '6'
		res++
		for _, d := range dir4 {
			x, y := d.x+i, d.y+j
			res += dfs(x, y, ch, flag)
		}
		return
	}
	for i, rows := range grid {
		for j, col := range rows {
			if col != '0' && col != '6' {
				cnt := dfs(i, j, col, &flag)
				if flag {
					ans = max(ans, cnt)
				}
			}
		}
	}
	return
}

func islandPerimeter(grid [][]int) (ans int) {
	for i, rows := range grid {
		for j, col := range rows {
			if col == 1 {
				ans += 4
				if i > 0 && grid[i-1][j] == 1 {
					ans -= 2
				}
				if j > 0 && grid[i][j-1] == 1 {
					ans -= 2
				}
			}
		}
	}
	return
}

func colorBorder(grid [][]int, row int, col int, color int) [][]int {
	m, n := len(grid), len(grid[0])

	// 是否访问过的标记数组
	vis := make([][]bool, m)
	for i := range vis {
		vis[i] = make([]bool, n)
	}

	// 方向数组
	type pair struct{ x, y int }
	var dir4 = []pair{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	// dfs 函数，使用闭包写法模拟 C++ 中的 lambda
	var dfs func(int, int, int)
	dfs = func(i, j, c int) {
		vis[i][j] = true

		// 枚举四个方向
		for _, dir := range dir4 {
			x, y := i+dir.x, j+dir.y

			// 坐标合法的情况
			if x >= 0 && x < m && y >= 0 && y < n {
				// 访问过，无需再访问
				if vis[x][y] {
					continue
				}
				// 颜色相同，继续遍历
				if grid[x][y] == c {
					dfs(x, y, c)
				} else {
					// 颜色不同，代表了连通分量的边界，需要修改
					grid[i][j] = color
				}
			} else {
				// 上下左右位置有越界，也就是代表了当前位置是边界
				grid[i][j] = color
			}
		}
	}

	dfs(row, col, grid[row][col])
	return grid
}

func maxMove22s(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	queue := []int{}
	vis := make([]int, m)
	for i := range m {
		queue = append(queue, i)
	}
	for j := 0; j < n-1; j++ {
		newQueue := []int{}
		for _, i := range queue {
			for k := max(0, i-1); k < min(m, i+2); k++ {
				if vis[k] != j+1 && grid[k][j+1] > grid[i][j] {
					newQueue = append(newQueue, k)
					vis[k] = j + 1
				}
			}
		}
		if len(newQueue) == 0 {
			return j
		} else {
			queue = newQueue
		}
	}
	return n - 1
}

func checkEqualPartitions11(nums []int, target int64) bool {
	n := len(nums)
	tar := int(target)
	u := (1 << n) - 1
	for s := 1; s < u; s++ {
		num1, num2 := 1, 1
		for i, x := range nums {
			if (s>>i)&1 == 1 {
				num1 = min(num1*x, tar+1)
			} else {
				num2 = min(num2*n, tar+1)
			}
		}
		if num1 == tar && num2 == tar {
			return true
		}
	}
	return false
}

func minAbsDiff1(grid [][]int, k int) [][]int {
	m, n := len(grid), len(grid[0])
	ans := make([][]int, m-k+1)
	arr := make([]int, k*k)
	for i := range ans {
		ans[i] = make([]int, n-k+1)
		for j := range ans[i] {
			a := arr[:0] // 避免反复 make
			for _, row := range grid[i : i+k] {
				a = append(a, row[j:j+k]...)
			}
			slices.Sort(a)

			res := math.MaxInt
			for p := 1; p < len(a); p++ {
				if a[p] > a[p-1] {
					res = min(res, a[p]-a[p-1])
				}
			}
			if res < math.MaxInt {
				ans[i][j] = res
			}
		}
	}
	return ans
}
func smallestIndex(nums []int) int {
	for i, x := range nums {
		s := 0
		for ; x > 0; x /= 10 {
			s += x % 10
		}
		if s == i {
			return i
		}
	}
	return -1
}

func minMoves2(matrix []string) int {
	m, n := len(matrix), len(matrix[0])
	if matrix[m-1][n-1] == '#' {
		return -1
	}
	type pair struct{ x, y int }
	pos := ['Z' + 1][]pair{}
	for i, row := range matrix {
		for j, c := range row {
			if unicode.IsUpper(c) {
				pos[c] = append(pos[c], pair{i, j})
			}
		}
	}
	var dir4 = []pair{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	dis := make([][]int, m)
	for i := range dis {
		dis[i] = make([]int, n)
		for j := range dis[i] {
			dis[i][j] = math.MaxInt
		}
	}
	dis[0][0] = 0
	q0 := []pair{{}}
	q1 := []pair{}
	for len(q0) > 0 || len(q1) > 0 {
		var p pair
		if len(q0) > 0 {
			p, q0 = q0[len(q0)-1], q0[:len(q0)-1]
		} else {
			p, q1 = q1[0], q1[1:]
		}
		d := dis[p.x][p.y]
		if p.x == m-1 && p.y == n-1 {
			return d
		}

		if c := matrix[p.x][p.y]; c != '.' {
			for _, q := range pos[c] {
				x, y := q.x, q.y
				if d < dis[x][y] {
					dis[x][y] = d
					q0 = append(q0, pair{x, y})
				}
			}
			pos[c] = nil
		}
		for _, dir := range dir4 {
			x, y := p.x+dir.x, p.y+dir.y
			if x >= 0 && x < m && y >= 0 && y < n && matrix[x][y] != '#' && d+1 < dis[x][y] {
				dis[x][y] = d + 1
				q1 = append(q1, pair{x, y})
			}
		}
	}
	return -1
}

func eventualSafeNodes(graph [][]int) []int {
	n := len(graph)
	color := make([]int, n) // 0:未访问, 1:访问中, 2:安全
	var dfs func(int) bool
	dfs = func(x int) bool {
		if color[x] != 0 {
			// 如果访问过了 直接返回是否安全
			return color[x] == 2
		}
		color[x] = 1 // 标记为访问中
		for _, y := range graph[x] {
			if !dfs(y) {
				// 如果有邻居不安全 当前也不安全
				return false
			}
		}
		// 所有邻居都安全 当前节点也是安全的
		color[x] = 2
		return true
	}
	ans := []int{}
	for i := 0; i < n; i++ {
		if dfs(i) {
			ans = append(ans, i)
		}
	}
	return ans
}

func watchedVideosByFriends(watchedVideos [][]string, g [][]int, id int, level int) (ans []string) {
	// n := len(friends)
	queue := []int{id}
	step := 0
	for len(queue) > 0 {
		if step == level {
			cnt := map[string]int{}
			for _, u := range queue {
				for _, video := range watchedVideos[u] {
					cnt[video]++
				}
			}

			// 将map的键值对转换为切片
			type VideoCount struct {
				Video string
				Count int
			}
			var videoCounts []VideoCount
			for video, count := range cnt {
				videoCounts = append(videoCounts, VideoCount{video, count})
			}

			// 按Count升序，若Count相同则按Video字典序排序
			sort.Slice(videoCounts, func(i, j int) bool {
				a, b := videoCounts[i], videoCounts[j]
				return a.Count < b.Count || (a.Count == b.Count && a.Video < b.Video)
			})

			// 提取排序后的键
			ans = make([]string, len(videoCounts))
			for i, vc := range videoCounts {
				ans[i] = vc.Video
			}
			return
		}
		tmp := queue
		queue = nil
		cnt := map[string]int{}
		for _, q := range tmp {
			for _, y := range g[q] {
				for _, video := range watchedVideos[y] {
					cnt[video]++
				}
				queue = append(queue, y)
			}
		}
		step++
	}
	return []string{}
}

func maxCandies111(status []int, candies []int, keys [][]int, containedBoxes [][]int, initialBoxes []int) (ans int) {
	hasKey := status
	hasBox := make([]bool, len(status))
	for _, x := range initialBoxes {
		hasBox[x] = true
	}
	var dfs func(int)
	dfs = func(x int) {
		ans += candies[x]
		hasBox[x] = false // 避免找到钥匙后重新访问开着的盒子
		for _, y := range keys[x] {
			hasKey[y] = 1
			if hasBox[y] {
				dfs(y)
			}
		}
		for _, y := range containedBoxes[x] {
			hasBox[y] = true
			if hasKey[y] == 1 {
				dfs(y)
			}
		}
	}
	for _, x := range initialBoxes {
		// 又有盒子又有钥匙
		if hasBox[x] && hasKey[x] == 1 {
			dfs(x)
		}
	}
	return
}

func maxCandies(status []int, candies []int, keys [][]int, containedBoxes [][]int, initialBoxes []int) (ans int) {
	hasKeys := status
	hasBox := make([]bool, len(candies))
	var dfs func(int)
	dfs = func(x int) {
		hasBox[x] = false
		ans += candies[x]
		for _, y := range keys[x] {
			hasKeys[y] = 1
			if hasBox[y] {
				dfs(y)
			}
		}
		for _, y := range containedBoxes[x] {
			hasBox[y] = true
			if hasKeys[y] == 1 {
				dfs(y)
			}
		}
	}
	for _, x := range initialBoxes {
		hasBox[x] = true
	}
	for _, x := range initialBoxes {
		if hasBox[x] && hasKeys[x] == 1 {
			dfs(x)
		}
	}
	return
}

func numBusesToDestination(routes [][]int, source int, target int) int {
	stopToBuses := map[int][]int{}
	for i, route := range routes {
		for _, x := range route {
			stopToBuses[x] = append(stopToBuses[x], i)
		}
	}
	if stopToBuses[source] == nil || stopToBuses[target] == nil {
		if source != target {
			return -1
		}
		return 0
	}
	dis := map[int]int{source: 0}
	queue := []int{source}
	for len(queue) > 0 {
		x := queue[0]
		queue = queue[1:]
		disX := dis[x]
		for _, i := range stopToBuses[x] {
			for _, y := range routes[i] {
				if _, ok := dis[y]; !ok {
					dis[y] = disX + 1
					queue = append(queue, y)
				}
			}
			routes[i] = nil
		}
	}
	if d, ok := dis[target]; ok {
		return d
	}
	return -1
}
func findCircleNum(isConnected [][]int) (ans int) {
	n := len(isConnected)
	vis := make([]bool, n)
	var dfs func(int)
	dfs = func(x int) {
		vis[x] = true
		for y, v := range isConnected[x] {
			if v == 1 && !vis[y] {
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
	return ans
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
	dfs = func(i int) {
		path = append(path, i)
		if i == n-1 {
			ans = append(ans, slices.Clone(path))
		} else {
			for _, y := range graph[i] {
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
	for i, ok := range vis {
		if !ok {
			cnt := dfs(i)
			ans += visCnt * cnt
			visCnt += cnt
		}
	}
	return int64(ans)
}
func makeConnected(n int, connections [][]int) int {
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
			cnt++
		}
	}
	return cnt - 1
}
func minScore(n int, roads [][]int) (ans int) {
	type pair struct{ to, w int }
	g := make([][]pair, n)
	for _, e := range roads {
		x, y, w := e[0]-1, e[1]-1, e[2]
		g[x] = append(g[x], pair{y, w})
		g[y] = append(g[y], pair{x, w})
	}
	ans = math.MaxInt
	vis := make([]bool, n)
	var dfs func(int)
	dfs = func(x int) {
		vis[x] = true
		for _, next := range g[x] {
			ans = min(ans, next.w)
			if !vis[next.to] {
				dfs(next.to)
			}
		}
	}
	dfs(0)
	return
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
	var dfs func(int)
	vis := make([]bool, n)
	dfs = func(x int) {
		v++
		e += len(g[x])
		vis[x] = true
		for _, y := range g[x] {
			if !vis[y] {
				dfs(y)
			}
		}
	}
	for i, ok := range vis {
		if !ok {
			v = 0
			e = 0
			dfs(i)
			if e == v*(v-1) {
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
	for i := range ans {
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

func answerString(word string, k int) (ans string) {
	if k == 1 {
		return word
	}
	n := len(word)
	for i := range n {
		ans = max(ans, word[i:min(i+n-(k-1), n)])
	}
	return
}

/*
	 type pair1 struct {
		to   string
		rate float64
	}

	func calcAmount(pairs [][]string, rate []float64, curAmount string) map[string]float64 {
		g := map[string][]pair1{}
		for i, e := range pairs {
			x, y := e[0], e[1]
			r := rate[i]
			g[x] = append(g[x], pair1{y, r})
			g[y] = append(g[y], pair1{x, 1 / r})
		}
	}

func maxAmount(initialCurrency string, pairs1 [][]string, rates1 []float64, pairs2 [][]string, rates2 []float64) float64 {

}
*/

func minSumSquareDiff(a, nums2 []int, k1, k2 int) int64 {
	ans, sum := 0, 0
	for i, v := range a {
		a[i] = abs(v - nums2[i])
		sum += a[i]
		ans += a[i] * a[i]
	}
	k := k1 + k2
	if sum <= k {
		return 0 // 所有 a[i] 均可为 0
	}

	slices.SortFunc(a, func(a, b int) int { return b - a })
	a = append(a, 0) // 哨兵
	for i, v := range a {
		i++
		ans -= v * v // 撤销上面的 ans += a[i] * a[i]
		if c := i * (v - a[i]); c < k {
			k -= c
			continue
		}
		v -= k / i
		ans += k%i*(v-1)*(v-1) + (i-k%i)*v*v
		break
	}
	return int64(ans)
}

func maxWeight(pizzas []int) int64 {
	slices.SortFunc(pizzas, func(a, b int) int { return b - a })
	days := len(pizzas) / 4
	// 奇数个
	odd := (days + 1) / 2
	ans := 0
	for _, x := range pizzas[:odd] {
		ans += x
	}
	for i := range days / 2 {
		ans += pizzas[odd+(i*2)+1]
	}
	return int64(ans)
}
func maximumBags(capacity []int, rocks []int, additionalRocks int) (ans int) {
	for i, x := range capacity {
		capacity[i] = x - rocks[i]
	}
	slices.Sort(capacity)
	for i, x := range capacity {
		if additionalRocks >= x {
			additionalRocks -= x
			continue
		}
		return i
	}
	return len(capacity)
}

func minimumBoxes(apple []int, capacity []int) int {
	sum := 0
	for _, x := range apple {
		sum += x
	}
	// 按照从大到小排序
	slices.SortFunc(capacity, func(a, b int) int { return b - a })
	for i, x := range capacity {
		sum -= x
		if sum <= 0 {
			return i
		}
	}
	return -1
}

func maxIceCream(costs []int, coins int) int {
	slices.Sort(costs)
	for i, x := range costs {
		if coins >= x {
			coins -= x
		} else {
			return i
		}
	}
	return -1
}

/* func largestSumAfterKNegations111(nums []int, k int) (ans int) {
	const offSet = 100
	cnt := [2*offSet + 1]int{}
	for _, x := range nums {
		cnt[x+offSet]++
		ans += x
	}
	for i := 0; i < offSet; i++ {
		if cnt[i] > 0 {
			oper := min(cnt[i], k)
			ans += 2 * oper * (i - offSet) * -1
			if cnt[i] < k {
				k -= cnt[i]
				cnt[i] = 0
				break
			}
			k -= cnt[i]
			cnt[i] = 0
		}
	}
	if k>0 &&cnt[offSet]==0{

	}
} */

func findLeastNumOfUniqueInts(arr []int, k int) int {
	cnt := map[int]int{}
	for _, x := range arr {
		cnt[x]++
	}
	type pair struct{ val, cnt int }
	res := []pair{}
	for val, cnt := range cnt {
		res = append(res, pair{val, cnt})
	}
	// 按照个数从小到大排序
	slices.SortFunc(res, func(a, b pair) int { return a.cnt - b.cnt })
	for i, item := range res {
		if k > item.cnt {
			k -= item.cnt
		} else {
			return len(res) - i
		}
	}
	return -1
}
func minSubsequence(nums []int) (ans []int) {
	// 从大到小排序
	slices.SortFunc(nums, func(a, b int) int { return b - a })
	totalSum := 0
	for _, x := range nums {
		totalSum += x
	}
	s := 0
	// x+y=totalSum
	// y=totalSum-x
	for _, x := range nums {
		s += x
		ans = append(ans, x)
		if x > totalSum-s {
			return
		}
	}
	return
}
func minimumCost(nums []int) int {
	p := nums[1:]
	slices.Sort(p)
	return nums[0] + p[0] + p[1]
}
func minSetSize(arr []int) int {
	n := len(arr)
	cnt := map[int]int{}
	for _, x := range arr {
		cnt[x]++
	}
	type pair struct{ val, cnt int }
	ls := []pair{}
	for val, cnt := range cnt {
		ls = append(ls, pair{val, cnt})
	}
	// 按照出现次数从大到小排序
	slices.SortFunc(ls, func(a, b pair) int { return b.cnt - a.cnt })
	count := 0
	for i, item := range ls {
		count += item.cnt
		if count > n/2 {
			return i + 1
		}
	}
	return n
}

func maximumUnits(boxTypes [][]int, truckSize int) (ans int) {
	// 按照可装载的单元数量从大到小排序
	slices.SortFunc(boxTypes, func(a, b []int) int { return b[1] - a[1] })
	for _, x := range boxTypes {
		cnt, unitCnt := x[0], x[1]
		oper := min(cnt, truckSize)
		ans += oper * unitCnt
		if truckSize >= cnt {
			truckSize -= cnt
		} else {
			return ans
		}
	}
	return
}
func maximumHappinessSum(happiness []int, k int) int64 {
	// 从大到小排序
	slices.SortFunc(happiness, func(a, b int) int { return b - a })
	ans := 0
	for i, x := range happiness {
		val := max(0, x-i)
		ans += val
		if i+1 == k {
			break
		}
	}
	return int64(ans)
}
func maxCount(banned []int, n int, maxSum int) (ans int) {
	set := map[int]bool{}
	for _, x := range banned {
		set[x] = true
	}
	for i := 1; i <= n; i++ {
		if i > maxSum {
			break
		}
		if set[i] {
			continue
		}
		maxSum -= i
		ans++
	}
	return
}
func asteroidsDestroyed(mass int, asteroids []int) bool {
	slices.Sort(asteroids)
	for _, x := range asteroids {
		if mass >= x {
			mass += x
		} else {
			return false
		}
	}
	return true
}
func maxScore(nums []int) int {
	slices.SortFunc(nums, func(a, b int) int { return b - a })
	s := 0
	for i, x := range nums {
		s += x
		if s <= 0 {
			return i + 1
		}
	}
	return 0
}
func largestPerimeter(nums []int) int {
	// 按照从大到小的顺序排序
	slices.SortFunc(nums, func(a, b int) int { return b - a })
	for i, x := range nums[:len(nums)-2] {
		if x < nums[i+1]+nums[i+2] {
			return x + nums[i+1] + nums[i+2]
		}
	}
	return 0
}
func maxCoins(nums []int) (ans int) {
	// 按照从大到小的顺序排序
	slices.SortFunc(nums, func(a, b int) int { return b - a })
	n := len(nums) / 2
	for i := 0; i < n; i++ {
		ans += nums[i] + 1
	}
	return
}
func maxFreeTime22(eventTime int, k int, startTime []int, endTime []int) (ans int) {
	n := len(startTime)
	// 返回第0个空闲区段的长度
	get := func(i int) int {
		if i == 0 {
			return startTime[0]
		} else if i == n-1 {
			return eventTime - endTime[n-1]
		} else {
			return startTime[i] - endTime[i-1]
		}
	}
	s := 0
	for i := range n + 1 {
		s += get(i)
		if i < k {
			continue
		}
		ans = max(ans, s)
		s -= get(i - k)
	}
	return
}
func smallestEquivalentString111(s1 string, s2 string, baseStr string) string {
	fa := [26]byte{}
	for i := range fa {
		fa[i] = byte(i)
	}
	var find func(byte) byte
	find = func(x byte) byte {
		if fa[x] != x {
			fa[x] = find(fa[x])
		}
		return fa[x]
	}
	merge := func(x, y byte) {
		small, big := find(x), find(y)
		if small > big {
			small, big = big, small
		}
		// 把大的代表无指向小的代表元
		fa[big] = small
	}
	for i, x := range s1 {
		merge(byte(x)-'a', s2[i]-'a')
	}
	s := make([]byte, len(baseStr))
	for i, c := range baseStr {
		s[i] = find(byte(c)-'a') + 'a'
	}
	return string(s)
}
func maxFreeTime(eventTime int, startTime, endTime []int) (ans int) {
	n := len(startTime)
	get := func(i int) int {
		if i == 0 {
			return startTime[0]
		}
		if i == n {
			return eventTime - endTime[n-1]
		}
		return startTime[i] - endTime[i-1]
	}

	a, b, c := 0, -1, -1
	for i := 1; i <= n; i++ {
		sz := get(i)
		if sz > get(a) {
			a, b, c = i, a, b
		} else if b < 0 || sz > get(b) {
			b, c = i, b
		} else if c < 0 || sz > get(c) {
			c = i
		}
	}

	for i, e := range endTime {
		sz := e - startTime[i]
		if i != a && i+1 != a && sz <= get(a) ||
			i != b && i+1 != b && sz <= get(b) ||
			sz <= get(c) {
			ans = max(ans, get(i)+sz+get(i+1))
		} else {
			ans = max(ans, get(i)+get(i+1))
		}
	}
	return ans
}

func smallestEquivalentString(s1 string, s2 string, baseStr string) string {
	fa := make([]byte, 26)
	for i := range fa {
		fa[i] = byte(i)
	}
	var find func(byte) byte
	find = func(x byte) byte {
		if fa[x] != x {
			fa[x] = find(fa[x])
		}
		return fa[x]
	}
	merge := func(x, y byte) {
		small, big := find(x), find(y)
		if small > big {
			small, big = big, small
		}
		fa[big] = small
	}
	for i, x := range s1 {
		merge(byte(x)-'a', s2[i]-'a')
	}
	s := make([]byte, len(baseStr))
	for i, x := range s1 {
		s[i] = find(byte(x))
	}
	return string(s)
}

func minArraySum(nums []int, k int, op1 int, op2 int) int {
	n := len(nums)
	memo := make([][][]int, n)
	for i := range memo {
		memo[i] = make([][]int, op1+1)
		for j := range memo[i] {
			memo[i][j] = make([]int, op2+1)
			for k := range memo[i][j] {
				memo[i][j][k] = -1
			}
		}
	}
	var dfs func(int, int, int) int
	dfs = func(i, op1, op2 int) (res int) {
		if i < 0 {
			return 0
		}
		p := &memo[i][op1][op2]
		if *p != -1 {
			return *p
		}
		defer func() {
			memo[i][op1][op2] = res
		}()
		x := nums[i]
		// 两种操作都不做
		res = dfs(i-1, op1, op2) + x
		if op1 > 0 {
			res = min(res, dfs(i-1, op1-1, op2)+(x+1)/2)
		}
		if op2 > 0 && x >= k {
			res = min(res, dfs(i-1, op1, op2-1)+x-k)
			if op1 > 0 {
				var y int
				if (x+1)/2 >= k {
					y = (x+1)/2 - k
				} else {
					y = (x - k + 1) / 2
				}
				res = min(res, dfs(i-1, op1-1, op2-1)+y)
			}
		}
		return
	}
	return dfs(n-1, op1, op2)
}
func maximizeGreatne11ss(nums []int) int {
	slices.Sort(nums)
	i := 0
	for _, x := range nums {
		if x > nums[i] {
			i++
		}
	}
	return i
}
func maximizeGreatness(nums []int) int {
	cnt := map[int]int{}
	maxCnt := 0
	for _, x := range nums {
		cnt[x]++
		maxCnt = max(maxCnt, cnt[x])
	}
	return len(nums) - maxCnt
}
func maxNumOfMarkedIndices2(nums []int) int {
	n := len(nums)
	slices.Sort(nums)
	left, right := 0, n/2+1
	check := func(mid int) bool {
		// mid 表示可以匹配的对数
		// 前mid个与后mid个一一匹配
		for i := 0; i < mid; i++ {
			if 2*nums[i] > nums[n-1-i] {
				return false
			}
		}
		return true
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			left = mid
		} else {
			right = mid
		}
	}
	return left * 2
}
func maxNumOfMarkedIndices(nums []int) int {
	slices.Sort(nums)
	i := 0
	n := len(nums)
	// 上取整
	for _, x := range nums[(n+1)/2:] {
		if x >= nums[i]*2 {
			i++
		}
	}
	return i * 2
}

func makeSimilar(nums []int, target []int) int64 {
	var mySort func([]int)
	mySort = func(a []int) {
		for i, x := range a {
			if x&1 > 0 {
				// 奇数取反
				a[i] = -x
			}
		}
		slices.Sort(a)
	}
	mySort(nums)
	mySort(target)
	ans := 0
	for i, x := range nums {
		ans += abs(x - target[i])
	}
	return int64(ans / 4)
}
func robotWithString(s string) string {
	n := len(s)
	sufMin := make([]byte, n+1)
	// 哨兵
	sufMin[n] = math.MaxUint8
	for i := n - 1; i >= 0; i-- {
		sufMin[i] = min(sufMin[i+1], s[i])
	}
	ans := make([]byte, 0, n)
	st := []byte{}
	for i, ch := range s {
		st = append(st, byte(ch))
		for len(st) > 0 && st[len(st)-1] <= sufMin[i+1] {
			ans = append(ans, st[len(st)-1])
			st = st[:len(st)-1]
		}
	}
	return string(ans)
}
func minRectanglesToCoverPoints(points [][]int, w int) int {
	slices.SortFunc(points, func(a, b []int) int { return a[0] - b[0] })
	ans := 0
	x2 := -1
	for _, x := range points {
		if x[0] > x2 {
			ans += 1
			x2 = x[0] + w
		}
	}
	return ans
}
func removeAlmostEqualCharacters(s string) (ans int) {
	i := 1
	n := len(s)
	for i < n {
		if abs(int(s[i-1])-int(s[i])) <= 1 {
			ans++
			i += 2
		} else {
			i++
		}
	}
	return
}

func minOperations2(nums []int) (ans int) {
	n := len(nums)
	for i, x := range nums[:n-2] {
		if x == 0 {
			nums[i+1] ^= 1
			nums[i+2] ^= 1
			ans++
		}
	}
	if nums[n-1] == 0 || nums[n-2] == 0 {
		return -1
	}
	return
}
func minOperations222(nums []int) (k int) {
	for _, x := range nums {
		// 如果x是0 而之前的操作次数是偶数  那必须要操作
		// 如果x是1 而之前的操作次数是奇数（奇数+奇数是偶数  变成了0） 还是要操作变成1
		if x == k%2 {
			k++
		}
	}
	return
}
func maxArrayValue(nums []int) int64 {
	n := len(nums)
	ans := nums[n-1]
	for i := n - 2; i >= 0; i-- {
		if nums[i] < ans {
			ans += nums[i]
		} else {
			ans = nums[i]
		}
	}
	return int64(ans)
}
func maxOperation22s(s string) (ans int) {
	// 遇到1 就加上后面0的个数
	n := len(s)
	cnt1 := 0
	for i := n - 1; i >= 0; i-- {
		if s[i] == '1' {
			cnt1++
		} else if i > 0 && s[i-1] == '1' {
			ans += cnt1
		}
	}
	return
}

func maxOperations(s string) (ans int) {
	cnt1 := 0
	for i, x := range s {
		if x == '1' {
			cnt1++
		} else if i > 0 && s[i-1] == '1' {
			ans += cnt1
		}
	}
	return
}
func maximumGroups(grades []int) int {
	n := len(grades)
	return (int(math.Sqrt(float64(1+8*n))) - 1) / 2
}
func minIncrements222(n int, cost []int) (ans int) {
	for i := n / 2; i > 0; i-- { // 从最后一个非叶节点开始算
		left, right := cost[i*2-1], cost[i*2]
		if left > right { // 保证 left <= right
			left, right = right, left
		}
		ans += right - left // 两个子节点变成一样的
		cost[i-1] += right  // 累加路径和
	}
	return
}

func minIncrements(n int, cost []int) (ans int) {
	for i := n / 2; i > 0; i-- {
		// 最开始i是节点编号 从1开始
		// 转换成索引必须都得-1
		left, right := cost[i*2-1], cost[i*2]
		if left > right {
			// 保证左边的小于右边
			left, right = right, left
		}
		ans += right - left
		cost[i-1] += right
	}
	return ans
}

func minimumReplacement(nums []int) (ans int64) {
	m := nums[len(nums)-1]
	for i := len(nums) - 2; i >= 0; i-- {
		k := (nums[i] - 1) / m
		ans += int64(k)
		m = nums[i] / (k + 1)
	}
	return
}
func minCuttingCost(n int, m int, k int) int64 {
	ans := 0
	if n > k {
		ans += (n - k) * k
	}
	if m > k {
		ans += (m - k) * k
	}
	return int64(ans)
}

/*
	func resultingString(s string) string {

}
*/
func clearStars2(s string) string {
	st := [26][]int{}
	for i, ch := range s {
		if ch == '*' {
			for j, ls := range st {
				if len(ls) > 0 {
					st[j] = ls[:len(ls)-1]
					break
				}
			}
		} else {
			st[ch-'a'] = append(st[ch-'a'], i)
		}
	}
	ids := []int{}
	for _, ls := range st {
		for _, i := range ls {
			ids = append(ids, i)
		}
	}
	slices.Sort(ids)
	ans := []byte{}
	for _, i := range ids {
		ans = append(ans, s[i])
	}
	return string(ans)
}

func findValueOfPartition(nums []int) int {
	slices.Sort(nums)
	ans := math.MaxInt
	for i, x := range nums[:len(nums)-1] {
		ans = min(ans, abs(x-nums[i+1]))
	}
	return ans
}
func maximumPossibleSize(nums []int) int {
	ans, mx := 0, 0
	for _, x := range nums {
		if x > mx {
			ans++
			mx = x
		}
	}
	return ans
}
func maxJump(stones []int) int {
	ans := stones[1] - stones[0]
	for i := 0; i < len(stones)-2; i++ {
		ans = max(ans, stones[i+2]-stones[i])
	}
	return ans
}

func longestSubsequence1(s string, k int) int {
	n, m := len(s), bits.Len(uint(k))
	if n < m {
		return n
	}
	fmt.Println(n, m)
	ans := m
	if v, _ := strconv.ParseInt(s[n-m:], 2, 0); int(v) > k {
		ans--
	}
	fmt.Println(ans)
	return ans + strings.Count(s[:n-m], "0")
}
func longestSubsequence(s string, k int) int {
	n, m := len(s), bits.Len(uint(k))
	if m > n {
		return 0
	}
	ans := m
	if v, _ := strconv.ParseInt(s[n-m:], 2, 0); int(v) > k {
		ans--
	}
	return ans + strings.Count(s[:n-m], "0")
}
func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
func maxDistance(s string, k int) (ans int) {
	cnt := ['X']int{}
	for _, ch := range s {
		cnt[ch]++
		left := k
		fn := func(a, b int) int {
			mn := min(a, b, left)
			left -= mn
			return min(abs(a-b)) + 2*mn
		}
		ans = max(ans, fn(cnt['N'], cnt['S']), fn(cnt['E'], cnt['W']))
	}
	return ans
}
func maximumSetSize222(nums1 []int, nums2 []int) int {
	set1 := map[int]bool{}
	for _, x := range nums1 {
		set1[x] = true
	}
	set2 := map[int]bool{}
	for _, x := range nums2 {
		set2[x] = true
	}
	common := 0
	for x := range set1 {
		if set2[x] {
			common++
		}
	}
	n1, n2 := len(set1), len(set2)
	// 在没有删除的情况下
	ans := n1 + n2 - common
	// 需要删除m个
	m := len(nums1) / 2
	if n1 > m {
		// 如果交集元素少，那么全部移除，即移除 common 个元素。
		// 如果交集元素多，那么移除交集中的 n1−m 个元素
		mn := min(n1-m, common)
		ans -= n1 - mn - m
		common -= mn
	}
	if n2 > m {
		n2 -= min(n2-m, common)
		ans -= n2 - m
	}
	return ans
}

func checkEqualPartitions(nums []int, target int64) bool {
	n := len(nums)
	u := (1 << n) - 1
	tar := int(target)
	for s := 1; s < u; s++ {
		num1, num2 := 1, 1
		for j, x := range nums {
			if (s>>j)&1 == 1 {
				num1 = min(num1*x, tar+1)
			} else {
				num2 = min(num2*x, tar+1)
			}
		}
		if num1 == tar && num2 == tar {
			return true
		}
	}
	return false
}

func minAbsDiff(grid [][]int, k int) [][]int {
	m, n := len(grid), len(grid[0])
	ans := make([][]int, m-k+1)
	arr := make([]int, k*k)
	for i := range ans {
		ans[i] = make([]int, n-k+1)
		for j := range ans[i] {
			a := arr[:0] // 避免反复 make
			for _, row := range grid[i : i+k] {
				a = append(a, row[j:j+k]...)
			}
			slices.Sort(a)

			res := math.MaxInt
			for p := 1; p < len(a); p++ {
				if a[p] > a[p-1] {
					res = min(res, a[p]-a[p-1])
				}
			}
			if res < math.MaxInt {
				ans[i][j] = res
			}
		}
	}
	return ans
}

func minMoves(classroom []string, energy int) (ans int) {
	m, n := len(classroom), len(classroom[0])
	startX, startY := 0, 0
	// 当前垃圾编号
	curL := 0
	idx := make([][]int, m)
	for i, rows := range classroom {
		idx[i] = make([]int, n)
		for j, col := range rows {
			if col == 'S' {
				startX = i
				startY = j
			} else if col == 'L' {
				idx[i][j] = 1 << curL
				curL++
			}
		}
	}
	u := 1 << curL
	// 这里有种最短路的成份在
	maxEnergy := make([][][]int, m)
	for i := range maxEnergy {
		maxEnergy[i] = make([][]int, n)
		for j := range maxEnergy[i] {
			maxEnergy[i][j] = make([]int, u)
			for k := range maxEnergy[i][j] {
				maxEnergy[i][j][k] = -1
			}
		}
	}

	type pair struct{ x, y int }
	var dir4 = []pair{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	// mask表示当前收集的垃圾的
	type tuple struct{ x, y, energy, mask int }
	queue := []tuple{{startX, startY, energy, 0}}
	maxEnergy[startX][startY][0] = energy
	for ; len(queue) > 0; ans++ {

		tmp := queue
		queue = nil
		for _, top := range tmp {
			if top.mask == u-1 {
				return
			}
			if top.energy == 0 {
				continue
			}
			for _, d := range dir4 {
				x, y := d.x+top.x, d.y+top.y
				if x >= 0 && x < m && y >= 0 && y < n && classroom[x][y] != 'X' {
					newEnergy := top.energy - 1
					if classroom[x][y] == 'R' {
						newEnergy = energy
					}
					newMask := top.mask | idx[x][y]
					if newEnergy > maxEnergy[x][y][newMask] {
						maxEnergy[x][y][newMask] = newEnergy
						queue = append(queue, tuple{x, y, newEnergy, newMask})
					}
				}
			}
		}
	}
	return -1
}

func clearStars(s string) string {
	st := [26][]int{}
	for i, ch := range s {
		if ch == '*' {
			for j, ls := range st {
				if len(ls) > 0 {
					st[j] = ls[:len(ls)-1]
					break
				}
			}
		} else {
			st[ch-'a'] = append(st[ch-'a'], i)
		}
	}
	idx := []int{}
	for _, ls := range st {
		if len(ls) > 0 {
			for _, i := range ls {
				idx = append(idx, i)
			}
		}
	}
	slices.Sort(idx)
	ans := []byte{}
	for _, i := range idx {
		ans = append(ans, s[i])
	}
	return string(ans)
}

func maximumSetSize(nums1 []int, nums2 []int) int {
	set1 := map[int]bool{}
	for _, x := range nums1 {
		set1[x] = true
	}
	set2 := map[int]bool{}
	for _, x := range nums2 {
		set2[x] = true
	}
	common := 0
	for x := range set1 {
		if set2[x] {
			common++
		}
	}
	n1, n2 := len(set1), len(set2)
	// 在没有删除的情况下
	ans := n1 + n2 - common
	// 需要删除m个
	m := len(nums1) / 2
	if n1 > m {
		// 如果交集元素少，那么全部移除，即移除 common 个元素。
		// 如果交集元素多，那么移除交集中的 n1−m 个元素
		mn := min(n1-m, common)
		n1 -= mn
		common -= mn
		ans -= n1 - m
	}
	if n2 > m {
		mn := min(n1-m, common)
		n2 -= mn
		ans -= n2 - m
	}
	return ans
}
func uniqueXorTriplets(nums []int) int {
	n := len(nums)
	if n <= 2 {
		return n
	}
	return 1<<bits.Len(uint(n)) - 1
}

func recoverArray(nums []int) []int {
	slices.Sort(nums)
	for i, n := 1, len(nums); ; i++ {
		if nums[i] == nums[i-1] {
			continue
		}
		d := nums[i] - nums[0]
		if d&1 > 0 {
			continue
		}
		k := d / 2
		vis := make([]bool, n)
		vis[i] = true
		ans := []int{(nums[0] + nums[i]) / 2}
		for lo, hi := 0, i+1; hi < n; hi++ {
			for lo++; vis[lo]; lo++ {
			}
			for ; hi < n && nums[hi]-nums[lo] < 2*k; hi++ {
			}
			if hi == n || nums[hi]-nums[lo] > 2*k {
				break
			}
			vis[hi] = true
			ans = append(ans, (nums[lo]+nums[hi])/2)
		}
		if len(ans) == n/2 {
			return ans
		}
	}
}

func minimumPartition(s string, k int) (ans int) {
	sum := 0
	for _, ch := range s {
		v := int(ch - '0')
		if v > k {
			return -1
		}
		sum = sum*10 + v
		if sum > k {
			sum = v
			ans++
		}
	}
	return ans + 1
}

func minimumDeletions(word string, k int) int {
	cnt := [26]int{}
	for _, ch := range word {
		cnt[ch-'a']++
	}
	n := len(word)
	maxSave := 0
	slices.Sort(cnt[:])
	for i, base := range cnt {
		sum := 0
		for _, c := range cnt[i:] {
			sum += min(c, base+k)
		}
		maxSave = max(sum, maxSave)
	}
	return n - maxSave
}

func minGroupsForValidAssignment(balls []int) (ans int) {
	cnt := map[int]int{}
	for _, x := range balls {
		cnt[x]++
	}
	k := len(balls)
	for _, c := range cnt {
		k = min(k, c)
	}
	for ; ; k-- {
		ans := 0
		for _, c := range cnt {
			if c/k < c%k {
				ans = 0
				break
			}
			// 分出k+1份  向上取整
			ans += (c + k) / (k + 1)
		}
		if ans > 0 {
			return ans
		}
	}
}

/*
	 func lexicalOrder(n int) []int {
		ans := make([]int, n)
		j := 1
		for i := 0; i < n; i++ {
			ans[i] = j
			if j*10 <= n {
				j *= 10
			} else {
				for j%10 == 9 || j+1 > n {
					j /= 10
				}
				j++
			}
		}
		return ans
	}
*/
func lexicalOrder1(n int) (ans []int) {
	var dfs func(int, int)
	dfs = func(cur, limit int) {
		if cur > limit {
			return
		}
		ans = append(ans, cur)
		for i := 0; i <= 9; i++ {
			dfs(cur*10+i, limit)
		}
	}
	for i := 1; i <= 9; i++ {
		dfs(i, n)
	}
	return ans
}
func lexicalOrder2(n int) (ans []int) {
	j := 1
	for i := 0; i < n; i++ {
		ans = append(ans, j)
		if j*10 <= n {
			j *= 10
		} else {
			for j%10 == 9 || j+1 > n {
				j /= 10
			}
			j++
		}
	}
	return ans
}

func lexicalOrde3r(n int) (ans []int) {
	var dfs func(int, int)
	dfs = func(cur, limit int) {
		if cur > limit {
			return
		}
		ans = append(ans, cur)
		for i := 0; i <= 9; i++ {
			dfs(cur*10+i, limit)
		}
	}
	for i := 1; i <= n; i++ {
		dfs(i, n)
	}
	return
}
func lexicalOrder(n int) (ans []int) {
	j := 1
	for i := 0; i < n; i++ {
		ans = append(ans, j)
		if j*10 <= n {
			j *= 10
		} else {
			if j%10 == 9 || j+1 > n {
				j /= 10
			}
			j++
		}
	}
	return
}

func minProcessingTime(processorTime []int, tasks []int) (ans int) {
	slices.Sort(processorTime)
	// slices.Sort(tasks)
	slices.SortFunc(tasks, func(a, b int) int { return b - a })
	fmt.Println(tasks)
	n := len(processorTime)
	j := 0
	for i := 0; i < n; i++ {
		mx := 0
		for cnt := 0; cnt < len(tasks)/n; j++ {
			mx = max(mx, processorTime[i]+tasks[j])
			cnt++
		}
		ans = max(mx, ans)
	}
	return
}
func minDamage(power int, damage []int, health []int) int64 {
	type pair struct{ killTime, damage int }
	n := len(damage)
	a := make([]pair, n)
	for i, h := range health {
		a[i] = pair{(h + power - 1) / power, damage[i]}
	}
	slices.SortFunc(a, func(x, y pair) int { return x.killTime*y.damage - y.killTime*x.damage })
	s := 0
	ans := 0
	for _, p := range a {
		s += p.killTime
		ans += p.damage * s
	}
	return int64(ans)
}
func maxGoodNumber(nums []int) (ans int) {
	slices.SortFunc(nums, func(a, b int) int {
		lenA := bits.Len(uint(a))
		lenB := bits.Len(uint(b))
		return (b<<lenA | a) - (a<<lenB | b)
	})

	for _, x := range nums {
		ans = ans<<bits.Len(uint(x)) | x
	}
	return
}

func largestNumber(nums []int) string {
	// 从大到小顺序排列的
	slices.SortFunc(nums, func(a, b int) int {
		x, _ := strconv.Atoi(strconv.Itoa(a) + strconv.Itoa(b))
		y, _ := strconv.Atoi(strconv.Itoa(b) + strconv.Itoa(a))
		return y - x
	})
	// 特例判断 比方说[0,0]
	if nums[0] == 0 {
		return "0"
	}
	ans := []byte{}
	for _, x := range nums {
		ans = append(ans, strconv.Itoa(x)...)
	}
	return string(ans)
}
func minimumMoney(transactions [][]int) int64 {
	totalLose, mx := 0, 0
	for _, t := range transactions {
		// 花费的钱 赚回的钱
		cost, cashback := t[0], t[1]
		// 最多能亏多少钱
		totalLose += max(cost-cashback, 0)
		// 找一个赚钱里面cost最大的
		// 或者枚举亏钱的，假设它是亏钱里面的最后一个交易
		// totalLose -(cost - cashback) + cost = totalLose+cashback
		mx = max(mx, min(cost, cashback))
	}
	return int64(totalLose + mx)
}
func fn(nums []int, val int, left int) bool {
	n := len(nums)
	mul := 1
	for i, x := range nums {
		if x*mul == val {
			mul = 1
			continue
		}
		if left == 0 || i == n-1 {
			return false
		}
		left--
		// 下一个数要乘上-1
		mul = -1
	}
	return true
}
func canMakeEqual(nums []int, k int) bool {
	x := fn(nums, 1, k)
	y := fn(nums, -1, k)
	return x || y
}

func countPartitions11(nums []int, k int) (ans int) {
	n := len(nums)
	var dfs func(int, int, int)
	dfs = func(i, mx, mn int) {
		if i == n {
			ans++
			return
		}
		mx = max(mx, nums[i])
		mn = min(mn, nums[i])
		if mx-mn <= k {
			// 选择分割
			if i < n-1 {
				dfs(i+1, nums[i+1], nums[i+1])
			}
			// 选择不分割
			dfs(i+1, mx, mn)
		} else {
			// 必须得要分割了
			dfs(i, nums[i], nums[i])
		}
	}
	dfs(0, nums[0], nums[0])
	return ans
}

func countPartitions2(nums []int, k int) (ans int) {
	mx, mn := nums[0], nums[1]
	preI := 0
	const mod int = 1e9 + 7

	for i := 1; i < len(nums); i++ {
		x := nums[i]
		if abs(x-mx) > k || abs(mn-x) > k {
			diff := i - preI
			ans = (ans + diff*(diff-1)) % mod
			preI = i
			mx, mn = nums[i], nums[i]
		}
		mx = max(x, mx)
		mn = min(x, mn)
	}
	return ans
}

func minLengthAfterRemovals2(nums []int) int {
	n := len(nums)
	cnt := map[int]int{}
	maxCnt := 0
	for _, x := range nums {
		cnt[x]++
		maxCnt = max(maxCnt, cnt[x])
	}
	return max(2*maxCnt-n, n%2)
}

func minLengthAfterRemovals(nums []int) int {
	n := len(nums)
	x := nums[n/2]
	// 大于  减去  大于等于等于  左闭右开区间
	maxCnt := sort.SearchInts(nums, x+1) - sort.SearchInts(nums, x)
	return max(2*maxCnt-n, n%2)
}

func maxSumDistinctTriplet111(x []int, y []int) (ans int) {
	type pair struct{ x, y int }
	a := []pair{}
	for i, e := range x {
		a = append(a, pair{e, y[i]})
	}
	// 按照y的值从大到小排序
	slices.SortFunc(a, func(p, q pair) int { return q.y - p.y })
	ans = a[0].y
	j := 1
	cnt := map[int]bool{}
	cnt[a[0].x] = true
	for ; j < len(x) && len(cnt) < 3; j++ {
		if cnt[a[j].x] {
			continue
		}
		ans += a[j].y
		cnt[a[j].x] = true
	}
	if len(cnt) < 3 {
		return -1
	}
	return
}

func countPermutations(complexity []int) (ans int) {
	const mod = 1_000_000_007
	first := complexity[0]
	for i := 1; i < len(complexity); i++ {
		if complexity[i] <= first {
			return 0
		}
		ans = ans * i % mod
	}
	return
}

func countPartitions(nums []int, k int) int {
	const mod = 1_000_000_007
	n := len(nums)
	f := make([]int, n+1)
	var minQ, maxQ []int
	f[0] = 1
	sumF := 0
	left := 0
	for i, x := range nums {
		// 入
		sumF += f[i]
		// 保持单调队列有序性
		for len(minQ) > 0 && x <= nums[minQ[len(minQ)-1]] {
			minQ = minQ[:len(minQ)-1]
		}
		minQ = append(minQ, i)
		for len(maxQ) > 0 && x >= nums[maxQ[len(maxQ)-1]] {
			maxQ = maxQ[:len(maxQ)-1]
		}
		maxQ = append(maxQ, i)
		// 出
		for nums[maxQ[0]]-nums[minQ[0]] > k {
			sumF -= f[left]
			left++
			if minQ[0] < left {
				minQ = minQ[1:]
			}

			if maxQ[0] < left {
				maxQ = maxQ[1:]
			}

		}
		f[i+1] = sumF % mod
	}
	return f[n]
}

func maxSumDistinctTriplet(x []int, y []int) int {
	cnt := map[int]int{}
	for i, v := range x {
		cnt[v] = max(cnt[v], y[i])
	}
	if len(cnt) < 3 {
		return -1
	}
	a := slices.SortedFunc(maps.Values(cnt), func(x, y int) int { return y - x })
	return a[0] + a[1] + a[2]
}
func minimumOperations(grid [][]int) (ans int) {
	for j := range len(grid[0]) {
		prev := -1
		for _, rows := range grid {
			x := rows[j]
			v := max(x, prev+1)
			ans += v - x
			prev = v
		}
	}
	return
}

func minOperations(nums []int) (ans int) {
	prev := 0
	for _, x := range nums {
		v := max(x, prev+1)
		ans += v - x
		prev = x
	}
	return
}

func minimumMoves(s string) (ans int) {
	for i := 0; i < len(s); i++ {
		ch := s[i]
		if ch == 'X' {
			ans++
			i += 2
		}
	}
	return
}
func canPlaceFlowers22(flowerbed []int, n int) bool {
	// 前后各补一个0
	flowerbed = append(append([]int{0}, flowerbed...), 0)
	for i := 1; i < len(flowerbed)-1; i++ {
		if flowerbed[i-1] == 0 && flowerbed[i] == 0 && flowerbed[i+1] == 0 {
			n--
			if n == 0 {
				return true
			}
			i++
		}
	}
	return false
}

func canPlaceFlowers(flowerbed []int, n int) bool {
	if n == 0 {
		return true
	}
	m := len(flowerbed)
	for i := 0; i < m; i++ {
		x := flowerbed[i]
		if x == 0 && (i == 0 || flowerbed[i-1] == 0) && (i == m-1 || flowerbed[i+1] == 0) {
			n--
			if n == 0 {
				return true
			}
			i++
		}
	}
	return false
}
