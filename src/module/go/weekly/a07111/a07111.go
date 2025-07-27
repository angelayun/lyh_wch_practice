package a07111

import (
	"fmt"
	"math"
	"math/big"
	"math/bits"
	"strconv"
)

func popcountDepth222(n int64, k int) int64 {
	N := int(n)
	ans := 0
	for i := 1; i <= N; i++ {
		if bits.OnesCount(uint(i)) == k && i > k {
			ans++
		}
	}
	return int64(ans)
}

func popcountDepth222333(n int64, k int) int64 {
	if n <= int64(k) {
		return 0
	}
	nBig := big.NewInt(n)
	bits := nBig.Bytes()
	binaryStr := make([]byte, 0, len(bits)*8)

	for i := len(bits) - 1; i >= 0; i-- {
		b := bits[i]
		for j := 7; j >= 0; j-- {
			if b&(1<<uint(j)) != 0 {
				binaryStr = append(binaryStr, '1')
			} else {
				binaryStr = append(binaryStr, '0')
			}
		}
	}
	for len(binaryStr) > 0 && binaryStr[0] == '0' {
		binaryStr = binaryStr[1:]
	}

	m := len(binaryStr)
	ans := 0
	for t := k + 1; t < m; t++ {
		if t < k {
			continue
		}
		ans += combination(t-1, k)
	}
	ones := 0
	for i := 0; i < m; i++ {
		if binaryStr[i] == '1' {
			remainingBits := m - i - 1
			remainingOnes := k - ones - 1

			if remainingOnes >= 0 {
				ans += combination(remainingBits, remainingOnes)
			}

			ones++

			if ones > k {
				break
			}
		}
	}

	return int64(ans)
}
func combination(n, k int) int {
	if k < 0 || k > n {
		return 0
	}
	if k == 0 || k == n {
		return 1
	}
	k = min(k, n-k)
	res := 1
	for i := 0; i < k; i++ {
		res = res * (n - i) / (i + 1)
	}
	return res
}

func findMaxPathScore(edges [][]int, online []bool, k int64) (ans int) {
	n := len(online)
	type pair struct{ to, w int }
	g := make([][]pair, n)
	for _, e := range edges {
		x, y, w := e[0], e[1], e[2]
		g[x] = append(g[x], pair{y, w})
	}
	ans = math.MaxInt
	vis := make([]bool, n)
	// 返回sum 和最小值
	var dfs func(int) (int, int)
	dfs = func(x int) (sum int, mn int) {
		mn = math.MaxInt
		vis[x] = true
		if x == n-1 {
			return
		}
		for _, item := range g[x] {
			y, w := item.to, item.w
			sum += w
			mn = min(mn, w)
			if !vis[y] && online[y] {
				subSum, subMn := dfs(y)
				sum += subSum
				mn = min(mn, subMn)
			}
		}
		return
	}

	for i, b := range vis {
		if !b && online[i] {
			sum, mn := dfs(i)
			if sum <= int(k) {
				ans = min(ans, mn)
			}
			vis[0] = false
			vis[n-1] = false
		}
	}
	if ans == math.MaxInt {
		return -1
	}
	return
}

/*
	 func makeFancyString(s string) string {
		ans := []byte{}
		for i, n := 0, len(s); i < n; {
			i0 := i
			for i++; i < n && s[i] == s[i-1]; i++ {
			}
			ans = append(ans, s[i0:min(i0+2,i)]...)
		}
		return string(ans)
	}
*/
func makeFancyString(s string) string {
	ans := []byte{}
	for i := 0; i < len(s); {
		i0 := i
		for i++; i < len(s) && s[i] == s[i-1]; i++ {
		}
		ans = append(ans, s[i0:min(i0+2, i)]...)
	}
	return string(ans)
}

func countKReducibleNumbers(s string, k int) (ans int) {
	const mod = 1_000_000_007
	n := len(s)
	memo := make([][]int, n)
	for i := range memo {
		memo[i] = make([]int, n)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int, bool) int
	// 当前索引是i 剩余left 是否受到限制
	dfs = func(i, left int, isLimit bool) (res int) {
		if i == n {
			if !isLimit && left == 0 {
				return 1
			}
			return
		}
		if !isLimit {
			p := &memo[i][left]
			if *p != -1 {
				return *p
			}
			defer func() {
				*p = res
			}()
		}
		up := 1
		if isLimit {
			up = int(s[i] - '0')
		}
		for d := 0; d <= min(up, left); d++ {
			res += dfs(i+1, left-d, isLimit && d == up)
		}
		return res % mod
	}
	f := make([]int, n)
	for i := 1; i < n; i++ {
		f[i] = f[bits.OnesCount(uint(i))] + 1
		if f[i] <= k {
			// 计算有多少个二进制数恰好有i个1
			ans += dfs(0, i, true)
		}
	}
	return ans % mod
}

func popcountDepth(n int64, k int) (ans int64) {
	if k == 0 {
		return 1
	}

	// 注：也可以不转成字符串，下面 dfs 用位运算取出 n 的第 i 位
	// 但转成字符串的通用性更好
	s := strconv.FormatInt(n, 2)
	m := len(s)
	if k == 1 {
		return int64(m - 1)
	}

	memo := make([][]int64, m)
	for i := range memo {
		memo[i] = make([]int64, m+1)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}

	var dfs func(int, int, bool) int64
	dfs = func(i, left1 int, isLimit bool) (res int64) {
		if i == m {
			if left1 == 0 {
				return 1
			}
			return
		}
		if !isLimit {
			p := &memo[i][left1]
			if *p >= 0 {
				return *p
			}
			defer func() { *p = res }()
		}

		up := 1
		if isLimit {
			up = int(s[i] - '0')
		}
		for d := 0; d <= min(up, left1); d++ {
			res += dfs(i+1, left1-d, isLimit && d == up)
		}
		return
	}

	f := make([]int, m+1)
	for i := 1; i <= m; i++ {
		f[i] = f[bits.OnesCount(uint(i))] + 1
		if f[i] == k {
			// 计算有多少个二进制数恰好有 i 个 1
			ans += dfs(0, i, true)
		}
	}
	return
}

func countTrapezoids(points [][]int) (ans int) {
	type pair struct{ x, y int }
	// 斜率 -> 截距  -> 个数
	cnt := map[float64]map[float64]int{}
	// 中点 -> 斜率 -> 个数
	cnt2 := map[pair]map[float64]int{}

	for i, p := range points {
		x, y := p[0], p[1]
		for _, q := range points[:i] {
			x2, y2 := q[0], q[1]
			dy := y - y2
			dx := x - x2
			// 斜率
			k := math.MaxFloat64
			// 截距
			b := float64(x)
			if dx != 0 {
				k = float64(dy) / float64(dx)
				b = float64(y*dx-dy*x) / float64(dx)
			}
			if _, ok := cnt[k]; !ok {
				cnt[k] = map[float64]int{}
			}
			// 按照 斜率 -> 截距 分组
			cnt[k][b]++

			mid := pair{x + x2, y + y2}
			if _, ok := cnt2[mid]; !ok {
				cnt2[mid] = map[float64]int{}
			}
			// 按照 中点 -> 斜率 分组
			cnt2[mid][k]++
		}
	}
	for _, m := range cnt {
		s := 0
		for _, c := range m {
			ans += s * c
			s += c
		}
	}
	// 平行四边形会统计二次  减去多统计的一次
	for _, m := range cnt2 {
		s := 0
		for _, c := range m {
			ans -= s * c
			s += c
		}
	}
	return
}

func largestArea(runes []string) (res int) {
	m, n := len(runes), len(runes[0])
	grid := make([][]rune, m)
	// 先转换成rune
	for i := range grid {
		grid[i] = []rune(runes[i])
	}
	type pair struct{ x, y int }
	dirs := []pair{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}
	var flag bool
	var dfs func(int, int, rune) int
	dfs = func(i, j int, ch rune) (ans int) {
		if grid[i][j] != ch {
			return 0
		}
		// 标记访问过了
		grid[i][j] = '6'
		ans++
		for _, d := range dirs {
			x, y := d.x+i, d.y+j
			if x >= 0 && x < m && y >= 0 && y < n && grid[i][j] != '0' {
				ans += dfs(x, y, ch)
			} else {
				// 超出边界或碰到'0'，说明区域不封闭
				flag = false
			}
		}
		return
	}
	for i, rows := range grid {
		for j, col := range rows {
			if col != '0' && col != '6' {
				flag = true
				count := dfs(i, j, col)
				if flag {
					res = max(res, count)
				}
			}
		}
	}
	return
}

func solve(board [][]byte) {
	m, n := len(board), len(board[0])
	if m < 3 || n < 3 {
		return
	}
	var closed bool
	var dfs func(int, int, byte, byte)
	dfs = func(x, y int, old, new byte) {
		if x == 0 || x == m-1 || y == 0 || y == n-1 {
			if board[x][y] == 'O' { // 到达边界
				closed = false
			}
			return
		}
		if board[x][y] != old {
			return
		}
		board[x][y] = new // 标记 (x,y) 被访问，避免重复访问
		dfs(x-1, y, old, new)
		dfs(x+1, y, old, new)
		dfs(x, y-1, old, new)
		dfs(x, y+1, old, new)
	}

	for i := 1; i < m-1; i++ {
		for j := 1; j < n-1; j++ {
			if board[i][j] == 'O' { // 从没有访问过的 0 出发
				// fmt.Println("aaa进入这里了么")
				closed = true
				dfs(i, j, 'O', 'Y')
				if closed {
					// fmt.Println("进入这里了么")
					// dfs(i,j)
					dfs(i, j, 'Y', 'X')
				}
			}
		}
	}
	fmt.Println(board)
}
