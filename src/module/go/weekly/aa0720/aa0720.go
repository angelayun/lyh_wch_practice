package aa0720

import (
	"math"
	"slices"
)

const mx = 1e5 + 1

var np = [mx]bool{0: true, 1: true}

// 也可以写成下面这样
// var np = [mx]bool{true, true} // 0 和 1 不是质数
func init222() {
	// 质数=false，非质数=true
	for i := 2; i*i < mx; i++ {
		if !np[i] {
			for j := i * i; j < mx; j += i {
				np[j] = true
			}
		}
	}
}

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
func splitArray(nums []int) int64 {
	ans := 0
	for i, x := range nums {
		if np[i] {
			ans += x
		} else {
			ans -= x
		}
	}
	return int64(abs(ans))
}

func findMaxPathScore(edges [][]int, online []bool, k int64) int {
	n := len(online)
	type edge struct{ to, wt int }
	g := make([][]edge, n)
	mxWt := 0
	for _, e := range edges {
		x, y, wt := e[0], e[1], e[2]
		// 在这里就直接判断online
		if online[x] && online[y] {
			g[x] = append(g[x], edge{y, wt})
			mxWt = max(mxWt, wt)
		}
	}
	left, right := -1, mxWt+1
	check := func(mid int) bool {
		memo := make([]int, n)
		for i := range memo {
			memo[i] = -1
		}
		var dfs func(int) int
		// dfs(x) 表示从 x 到 n−1 的有效路径的总恢复成本的最小值
		dfs = func(x int) (res int) {
			if x == n-1 { // 到达终点
				return 0
			}
			p := &memo[x]
			if *p != -1 {
				return *p
			}
			defer func() {
				*p = res
			}()
			res = math.MaxInt / 2
			for _, e := range g[x] {
				y := e.to
				if e.wt >= mid {
					res = min(res, dfs(y)+e.wt)
				}
			}
			return res
		}
		return dfs(0) <= int(k)
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			left = mid
		} else {
			right = mid
		}
	}
	return left
}

func checkDivisibility(n int) bool {
	sum, prod := 0, 1
	for v := n; v > 0; v /= 10 {
		x := v % 10
		sum += x
		prod *= x
	}
	return n%(sum+prod) == 0
}

func countTrapezoids(points [][]int) (ans int) {
	const mod = 1_000_000_007
	cnt := map[int]int{}
	for _, p := range points {
		y := p[1]
		cnt[y]++
	}
	s := 0
	for _, c := range cnt {
		v := c * (c - 1) / 2
		ans = (ans + (v*s)%mod) % mod
		s += v
	}
	return
}

func hasValidPath(grid [][]int) bool {
	type pair struct{ x, y int }
	m, n := len(grid), len(grid[0])
	// 使用 pair 类型替代二维数组方式
	directions := map[int][]pair{
		1: {{0, -1}, {0, 1}},  // 左右
		2: {{-1, 0}, {1, 0}},  // 上下
		3: {{0, -1}, {1, 0}},  // 左下
		4: {{0, 1}, {1, 0}},   // 右下
		5: {{0, -1}, {-1, 0}}, // 左上
		6: {{0, 1}, {-1, 0}},  // 右上
	}
	// 判断两个格子方向是否能连接
	canConnect := func(b int, dir pair) bool {
		for _, d := range directions[b] {
			if d.x == -dir.x && d.y == -dir.y {
				return true
			}
		}
		return false
	}
	var dfs func(int, int)
	dfs = func(i, j int) {
		old := grid[i][j]
		grid[i][j] = 0
		for _, d := range directions[old] {
			x, y := i+d.x, j+d.y
			if x >= 0 && x < m && y >= 0 && y < n {
				if grid[x][y] != 0 && canConnect(grid[x][y], d) {
					dfs(x, y)
				}
			}
		}
	}
	dfs(0, 0)
	return grid[m-1][n-1] == 0
}

func shortestPathBinaryMatrix(grid [][]int) int {
	n := len(grid)
	if grid[0][0] == 1 || grid[n-1][n-1] == 1 {
		return -1
	}
	type pair struct{ x, y int }
	var dir8 = []pair{{-1, 0}, {1, 0}, {0, -1}, {0, 1}, {-1, 1}, {1, -1}, {1, 1}, {-1, -1}}
	queue := []pair{{0, 0}}
	grid[0][0] = 1 // 标记入口为已访问
	step := 1
	for len(queue) > 0 {
		tmp := queue
		queue = nil
		for _, q := range tmp {
			for _, d := range dir8 {
				x, y := q.x+d.x, q.y+d.y
				if x >= 0 && x < n && y >= 0 && y < n && grid[x][y] == 0 {
					if x == n-1 && y == n-1 {
						return step
					}
					queue = append(queue, pair{x, y})
					grid[x][y] = 1
				}
			}
		}
		step++
	}
	return -1
}

func numTriplets(nums1 []int, nums2 []int) (ans int) {
	cnt1 := map[int]int{}
	for _, x := range nums1 {
		cnt1[x*x]++
	}
	cnt2 := map[int]int{}
	for _, x := range nums2 {
		cnt2[x*x]++
	}
	// n1, n2 := len(nums1), len(nums2)
	for i, x := range nums1 {
		for _, v := range nums1[i+1:] {
			val := x * v
			ans += cnt2[val]
		}
	}
	for i, x := range nums2 {
		for _, v := range nums2[i+1:] {
			val := x * v
			ans += cnt1[val]
		}
	}
	return
}

func threeSumMulti(arr []int, target int) (ans int) {
	const MOD = 1e9 + 7
	slices.Sort(arr)
	n := len(arr)
	for i := 0; i < n; i++ {
		T := target - arr[i]
		j := i + 1
		k := n - 1
		for j < k {
			sum := arr[j] + arr[k]
			if sum < T {
				j++
			} else if sum > T {
				k--
			} else {
				// 这三个数据的和刚好等于target的情况
				if arr[j] != arr[k] {
					// left记录左边等于arr[j]的元素个数
					left := 1
					// right记录右边等于arr[k]的元素个数
					right := 1
					for j < k && arr[j+1] == arr[j] {
						j++
						left++
					}
					for j < k && arr[k-1] == arr[k] {
						right++
						k--
					}
					ans = (ans + (left * right)) % MOD
					// 算完之后同样需要j++ k--来进入下一轮
					j++
					k--
				} else {
					m := k - j + 1
					ans = (ans + m*(m-1)/2) % MOD
					// 这里可以直接break 因为只有第一个指针元素是不同的  后俩指针之间的元素都相同
					break
				}
			}
		}
	}
	return ans
}
