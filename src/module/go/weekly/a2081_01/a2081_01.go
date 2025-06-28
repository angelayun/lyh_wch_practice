package a208101

import (
	"fmt"
	"math"
	"math/bits"
	"slices"
	"strconv"
	"strings"
	"unicode"
)

const maxN = 30

var ans [10][]int

// 力扣 9. 回文数
func isKPalindrome(x, k int) bool {
	if x%k == 0 {
		return false
	}
	rev := 0
	for rev < x/k {
		rev = rev*k + x%k
		x /= k
	}
	return rev == x || rev == x/k
}

func doPalindrome(x int) bool {
	done := true
	for k := 2; k < 10; k++ {
		if len(ans[k]) < maxN && isKPalindrome(x, k) {
			ans[k] = append(ans[k], x)
		}
		if len(ans[k]) < maxN {
			done = false
		}
	}
	if !done {
		return false
	}

	for k := 2; k < 10; k++ {
		// 计算前缀和
		for i := 1; i < maxN; i++ {
			ans[k][i] += ans[k][i-1]
		}
	}
	return true
}

func init2() {
	for k := 2; k < 10; k++ {
		ans[k] = make([]int, 0, maxN) // 预分配空间
	}
	for base := 1; ; base *= 10 {
		// 生成奇数长度回文数，例如 base = 10，生成的范围是 101 ~ 999
		for i := base; i < base*10; i++ {
			x := i
			for t := i / 10; t > 0; t /= 10 {
				x = x*10 + t%10
			}
			if base == 10 {
				fmt.Println("奇数", x)
			}
			if doPalindrome(x) {
				return
			}
		}
		// 生成偶数长度回文数，例如 base = 10，生成的范围是 1001 ~ 9999
		for i := base; i < base*10; i++ {
			x := i
			if base == 10 {
				fmt.Println("偶数", x)
			}
			for t := i; t > 0; t /= 10 {
				x = x*10 + t%10
			}
			if doPalindrome(x) {
				return
			}
		}
	}
}

func kMirror(k, n int) int64 {
	return int64(ans[k][n-1])
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
			op := min(a, b, left)
			left -= op
			return abs(a-b) + 2*op
		}
		ans = max(ans, fn(cnt['N'], cnt['S'])+fn(cnt['E'], cnt['W']))
	}
	return
}

func minimizeMax(nums []int, p int) int {
	slices.Sort(nums)
	n := len(nums)
	left, right := -1, nums[n-1]-nums[0]
	// mid定义为差值
	check := func(mid int) bool {
		cnt, i := 0, 1
		for i+1 < n {
			if nums[i]-nums[i-1] <= mid {
				cnt++
				i += 2
			} else {
				i++
			}
		}
		return cnt >= p
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	return right
}

func maximumPossibleSize(nums []int) int {
	ans, mx := 0, 0

	for _, x := range nums {
		if x >= mx {
			ans++
			mx = x
		}
	}
	return ans
}
func maxJump(stones []int) int {
	ans := stones[1] - stones[0]
	n := len(stones)
	for i := 0; i < n-2; i++ {
		ans = max(ans, stones[i+2]-stones[i])
	}
	return ans
}
func longestSubsequence11(s string, k int) int {
	n, m := len(s), bits.Len(uint(k))
	if n < m {
		return n
	}
	ans := m
	str, _ := strconv.ParseInt(s[n-m:], 2, 0)
	if int(str) > k {
		ans--
	}
	return ans + strings.Count(s[:n-m], "0")
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
	for k := range set1 {
		if set2[k] {
			common++
		}
	}
	n1, n2 := len(set1), len(set2)
	ans := n1 + n2 - common
	m := len(nums1) / 2
	if n1 >= m {
		mn := min(n1-m, common)
		common -= mn
		n1 -= mn
		ans -= n1 - m
	}
	if n2 >= m {
		mn := min(n2-m, common)
		n2 -= mn
		ans -= n2 - m
	}
	return ans
}

func findKDistantIndices333(nums []int, key int, k int) []int {
	n := len(nums)
	ans := []int{}
	for i := range nums {
		flag := false
		for j := i; j < min(i+k, n); j++ {
			if nums[j] == key {
				flag = true
				break
			}
		}
		if !flag {
			for j := i - 1; j >= max(0, i-k-1); j-- {
				if nums[j] == key {
					flag = true
					break
				}
			}
		}
		if flag {
			ans = append(ans, i)
		}
	}
	return ans
}

func findKDistantIndices(nums []int, key int, k int) []int {
	n := len(nums)
	last := -k - 1
	for i := k - 1; i >= 0; i-- {
		if nums[i] == key {
			last = i
			break
		}
	}
	ans := []int{}
	for i := range nums {
		if i+k < n && nums[i+k] == key {
			last = i + k
		}
		if last >= i-k {
			ans = append(ans, i)
		}
	}
	return ans
}

func buildArray(target []int, n int) (ans []string) {
	m := len(target)
	j := 0
	for i := 1; i <= n; i++ {
		if i == target[j] {
			ans = append(ans, "Push")
		} else if i < target[j] {
			ans = append(ans, "Push")
			ans = append(ans, "Pop")
		}
		j++
		if j == m {
			break
		}
	}
	return
}

func calPoints(operations []string) (ans int) {
	st := []int{}
	for _, op := range operations {
		switch op {
		case "+":
			st = append(st, st[len(st)-1]+st[len(st)-2])
			break
		case "D":
			st = append(st, st[len(st)-1]*2)
			break
		case "C":
			st = st[:len(st)-1]
			break
		default:
			cur, _ := strconv.Atoi(op)
			st = append(st, cur)
			break
		}
	}
	for _, x := range st {
		ans += x
	}
	return
}

func maximumProfit(prices []int, k int) int64 {
	n := len(prices)
	memo := make([][][]int, n)
	for i := range memo {
		memo[i] = make([][]int, k+1)
		for j := range memo[i] {
			memo[i][j] = make([]int, 3)
			for k := range memo[i][j] {
				memo[i][j][k] = -1
			}
		}
	}
	var dfs func(int, int, int) int
	dfs = func(i, j, endState int) (res int) {
		if j < 0 {
			return math.MinInt / 2
		}
		if i < 0 {
			if endState == 1 {
				return math.MinInt / 2
			}
			return
		}
		p := &memo[i][j][endState]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		price := prices[i]
		if endState == 0 {
			return max(dfs(i-1, j, 0), dfs(i-1, j, 1)+price, dfs(i-1, j, 2)-price)
		} else if endState == 1 {
			// 上一次未持有  现在持有了 所以操作了一次（持有的话需要花钱）
			return max(dfs(i-1, j, 1), dfs(i-1, j-1, 0)-price)
		} else {
			// 上一次未持有  现在做空 所以操作了一次（做空的话赚了钱）
			return max(dfs(i-1, j, 2), dfs(i-1, j-1, 0)+price)
		}
	}
	ans := dfs(n-1, k, 0)
	return int64(ans)
}

func minimumPairRemoval(nums []int) (ans int) {
	n := len(nums)
	for i := n - 1; i > 0; i-- {
		if nums[i] < nums[i-1] {
			nums[i-1] += nums[i]
			ans++
		}
	}
	return
}

func maxSum(nums []int) (ans int) {
	mx := math.MinInt
	set := map[int]bool{}
	for _, x := range nums {
		if x < 0 {
			mx = max(mx, x)
		} else {
			if !set[x] {
				ans += x
			} else {
				set[x] = true
			}
		}
	}
	if len(set) == 0 {
		return mx
	}
	return
}

func kthSmallest(matrix [][]int, k int) int {
	n := len(matrix)
	left, right := matrix[0][0]-1, matrix[n-1][n-1]+1
	check := func(mid int) bool {
		// 上界是mid的情况下 是否有k个元素满足条件
		cnt := 0
		i, j := 0, n-1
		for i < n && j >= 0 {
			if matrix[i][j] < mid {
				cnt += j
				i++
			} else {
				j--
			}
		}
		return cnt >= k
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	return right
}

func findKthNumber(m int, n int, k int) int {
	// 左边不满足  右边满足
	left, right := 0, m*n
	// 上界是mid
	check := func(mid int) bool {
		cnt := 0
		for i := 0; i < m; i++ {
			cnt += min(n, mid/i)
		}
		return cnt >= k
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	return right
}

func gcd(a, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}
func lcm(a int, b int) int {
	return a / gcd(a, b) * b
}
func findKthSmallest(coins []int, k int) int64 {
	n := len(coins)
	mn := slices.Min(coins)
	left, right := k-1, mn*k
	check := func(mid int) bool {
		cnt := 0
	next:
		for i := 1; i < 1<<n; i++ {
			lcmRes := 1
			for j := range n {
				if (i >> j & 1) == 1 {
					lcmRes = lcm(lcmRes, coins[j])
					if lcmRes > mid {
						continue next
					}
				}
			}
			if bits.OnesCount(uint(i))%2 == 1 {
				cnt += mid / lcmRes
			} else {
				cnt -= mid / lcmRes
			}
		}
		return cnt >= k
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	return int64(right)
}
func medianOfUniquenessArray111(nums []int) int {
	n := len(nums)
	totalCnt := (1 + n) * n / 2
	k := (totalCnt + 1) / 2
	left, right := -1, n
	check := func(mid int) bool {
		left := 0
		freq := map[int]int{}
		cnt := 0
		for right, x := range nums {
			freq[x]++
			if len(freq) > mid {
				freq[nums[left]]--
				if freq[nums[left]] == 0 {
					delete(freq, nums[left])
				}
				left++
			}
			cnt += right - left + 1
		}
		return cnt >= k
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	return right
}

func medianOfUniquenessArray(nums []int) int {
	n := len(nums)
	totalCnt := (1 + n) * n / 2
	k := (totalCnt + 1) / 2
	left, right := -1, n
	check := func(upper int) bool {
		cnt := 0
		left := 0
		freq := map[int]int{}
		for right, v := range nums {
			freq[v]++
			// 当唯一度超过 upper 时，移动左指针
			for len(freq) > upper {
				freq[nums[left]]--
				if freq[nums[left]] == 0 {
					delete(freq, nums[left])
				}
				left++
			}
			// 统计满足条件的子数组数量
			cnt += right - left + 1
			if cnt >= k {
				return true
			}
		}
		return false
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	return right
}

func longestSubsequence(s string, k int) int {
	n, m := len(s), bits.Len(uint(k))
	if n < m {
		return n
	}
	ans := m
	str, _ := strconv.ParseInt(s[n-m:], 2, 0)
	if int(str) > k {
		ans--
	}
	return ans + strings.Count(s[:n-m], "0")
}

func minMoves(matrix []string) int {
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

	dirs := []pair{{0, -1}, {0, 1}, {-1, 0}, {1, 0}}
	dis := make([][]int, m)
	for i := range dis {
		dis[i] = make([]int, n)
		for j := range dis[i] {
			dis[i][j] = math.MaxInt
		}
	}
	dis[0][0] = 0

	// 两个 slice 头对头，模拟 deque
	q0 := []pair{{}}
	q1 := []pair{}

	for len(q0) > 0 || len(q1) > 0 {
		// 弹出队首
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
			// 使用所有传送门
			for _, q := range pos[c] {
				x, y := q.x, q.y
				if d < dis[x][y] {
					dis[x][y] = d
					q0 = append(q0, pair{x, y}) // 加到队首
				}
			}
			pos[c] = nil // 避免重复使用传送门
		}

		// 下面代码和普通 BFS 是一样的
		for _, dir := range dirs {
			x, y := p.x+dir.x, p.y+dir.y
			if 0 <= x && x < m && 0 <= y && y < n && matrix[x][y] != '#' && d+1 < dis[x][y] {
				dis[x][y] = d + 1
				q1 = append(q1, pair{x, y}) // 加到队尾
			}
		}
	}

	return -1
}

func minimumObstacles(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	dis := make([][]int, m)
	for i := range dis {
		dis[i] = make([]int, n)
		for j := range dis[i] {
			dis[i][j] = math.MaxInt
		}
	}
	dis[0][0] = 0
	type pair struct{ x, y int }
	// 两个 slice 头对头，模拟 deque
	q0 := []pair{{}}
	q1 := []pair{}
	dirs := []pair{{0, -1}, {0, 1}, {-1, 0}, {1, 0}}

	for len(q0) > 0 || len(q1) > 0 {
		// 弹出队首
		var p pair
		if len(q0) > 0 {
			p, q0 = q0[len(q0)-1], q0[:len(q0)-1]
		} else {
			p, q1 = q1[0], q1[1:]
		}
		d := dis[p.x][p.y]
		for _, dir := range dirs {
			x, y := p.x+dir.x, p.y+dir.y
			if x >= 0 && x < m && y >= 0 && y < n && d+grid[x][y] < dis[x][y] {
				dis[x][y] = d + grid[x][y]
				if grid[x][y] == 1 {
					q1 = append(q1, pair{x, y})
				} else {
					q0 = append(q0, pair{x, y})
				}
			}
		}
	}
	return dis[m-1][n-1]
}
func findSafeWalk(grid [][]int, health int) bool {
	m, n := len(grid), len(grid[0])
	dis := make([][]int, m)
	for i := range dis {
		dis[i] = make([]int, n)
		for j := range dis[i] {
			dis[i][j] = math.MaxInt
		}
	}
	dis[0][0] = 0
	type pair struct{ x, y int }
	// 两个 slice 头对头，模拟 deque
	q0 := []pair{{}}
	q1 := []pair{}
	dirs := []pair{{0, -1}, {0, 1}, {-1, 0}, {1, 0}}

	for len(q0) > 0 || len(q1) > 0 {
		// 弹出队首
		var p pair
		if len(q0) > 0 {
			p, q0 = q0[len(q0)-1], q0[:len(q0)-1]
		} else {
			p, q1 = q1[0], q1[1:]
		}
		d := dis[p.x][p.y]
		for _, dir := range dirs {
			x, y := p.x+dir.x, p.y+dir.y
			if x >= 0 && x < m && y >= 0 && y < n && d+grid[x][y] < dis[x][y] {
				dis[x][y] = d + grid[x][y]
				if grid[x][y] == 1 {
					q1 = append(q1, pair{x, y})
				} else {
					q0 = append(q0, pair{x, y})
				}
			}
		}
	}
	return dis[m-1][n-1] <= health
}

func minCost(grid [][]int) int {
	m, n := len(grid), len(grid[0])

	// 初始化距离数组，初始值为无穷大
	dis := make([][]int, m)
	for i := range dis {
		dis[i] = make([]int, n)
		for j := range dis[i] {
			dis[i][j] = math.MaxInt
		}
	}
	dis[0][0] = 0
	type pair struct{ x, y int }
	// 两个 slice 头对头，模拟 deque
	q0 := []pair{{}}
	q1 := []pair{}
	dirs := []pair{
		// 右 1
		{0, 1},
		// 左 2
		{0, -1},
		// 下
		{1, 0},
		// 左
		{-1, 0},
	}

	for len(q0) > 0 || len(q1) > 0 {
		// 弹出队首
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
		for idx, dir := range dirs {
			x, y := dir.x+p.x, dir.y+p.y
			if x < 0 || x >= m || y < 0 || y >= n {
				continue
			}
			newD := d
			arrowDir := grid[p.x][p.y] - 1
			if arrowDir != idx {
				newD++
			}
			if newD < dis[x][y] {
				dis[x][y] = newD
				if arrowDir == idx {
					q0 = append(q0, pair{x, y})
				} else {
					q1 = append(q1, pair{x, y})
				}
			}
		}
	}
	return dis[m-1][n-1]
}

func conveyorBelt(matrix []string, start []int, end []int) int {
	m, n := len(matrix), len(matrix[0])

	// 初始化距离数组，初始值为无穷大
	dis := make([][]int, m)
	for i := range dis {
		dis[i] = make([]int, n)
		for j := range dis[i] {
			dis[i][j] = math.MaxInt
		}
	}
	cntMap := map[byte]int{
		'>': 0,
		'<': 1,
		'v': 2,
		'^': 3,
	}
	dis[0][0] = 0
	type pair struct{ x, y int }
	// 两个 slice 头对头，模拟 deque
	q0 := []pair{{}}
	q1 := []pair{}
	dirs := []pair{
		// 右 1
		{0, 1},
		// 左 2
		{0, -1},
		// 下
		{1, 0},
		// 左
		{-1, 0},
	}

	for len(q0) > 0 || len(q1) > 0 {
		// 弹出队首
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
		for idx, dir := range dirs {
			x, y := dir.x+p.x, dir.y+p.y
			if x < 0 || x >= m || y < 0 || y >= n {
				continue
			}
			newD := d
			arrowDir :=cntMap[matrix[p.x][p.y]]  - 1
			if arrowDir != idx {
				newD++
			}
			if newD < dis[x][y] {
				dis[x][y] = newD
				if arrowDir == idx {
					q0 = append(q0, pair{x, y})
				} else {
					q1 = append(q1, pair{x, y})
				}
			}
		}
	}
	return dis[m-1][n-1]
}
