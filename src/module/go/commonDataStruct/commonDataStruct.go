package commondatastruct

import (
	"fmt"
	"math"
	"slices"

	"github.com/emirpasic/gods/v2/trees/redblacktree"
)

// 1
func twoSum(nums []int, target int) []int {
	cnt := map[int]int{}
	for i, v := range nums {
		// if语句里面可以两句话并做一句话
		if j, ok := cnt[target-v]; ok {
			return []int{j, i}
		}
		cnt[v] = i
	}
	// 可以直接返回nil
	return nil
}

// 1512
func numIdenticalPairs(nums []int) (ans int) {
	cnt := map[int]int{}
	for _, v := range nums {
		ans += cnt[v]
		cnt[v]++
	}
	return
}

// 2342
func getNSum(x int) (ans int) {
	// 获得x的数位和
	for x > 0 {
		ans += x % 10
		x /= 10
	}
	return
}
func maximumSum(nums []int) (ans int) {
	ans = -1
	cnt := map[int]int{}
	for _, x := range nums {
		s := getNSum(x)
		// fmt.Println(x, s)
		if y, ok := cnt[s]; ok {
			ans = max(ans, y+x)
		}
		cnt[s] = max(cnt[s], x)
	}
	return
}

// 121
func maxProfit(prices []int) (ans int) {
	minPrice := prices[0]
	for i := 1; i < len(prices); i++ {
		ans = max(ans, prices[i]-minPrice)
		minPrice = min(minPrice, prices[i])
	}
	return
}

// 2001
func interchangeableRectangles2(rectangles [][]int) (ans int64) {
	cnt := map[float64]int{}
	for _, v := range rectangles {
		x, y := v[0], v[1]
		z := float64(x) / float64(y)
		fmt.Println(z)
		ans += int64(cnt[z])
		cnt[z]++
	}
	return
}

// 2260
func minimumCardPickup(cards []int) (ans int) {
	ans = math.MaxInt
	// key是值 value是index
	cnt := map[int]int{}
	for i, v := range cards {
		if y, ok := cnt[v]; ok {
			diff := i - y + 1
			if diff < ans {
				ans = diff
			}
		}
		cnt[v] = max(cnt[v], i)
	}
	if ans == math.MaxInt {
		return -1
	}
	return
}

// 2815
func maxSum(nums []int) (ans int) {
	ans = -1
	cnt := [10]int{}
	for _, v := range nums {
		bit := 0
		x := v
		for x > 0 {
			bit = max(bit, x%10)
			x /= 10
		}
		if cnt[bit] != 0 {
			ans = max(ans, cnt[bit]+v)
		}
		cnt[bit] = max(cnt[bit], v)
	}
	return
}

// 1679
func maxOperations(nums []int, k int) (ans int) {
	cnt := map[int]int{}
	for _, v := range nums {
		if cnt[k-v] > 0 {
			ans++
			cnt[k-v]--
		} else {
			cnt[v]++
		}
	}
	return
}

// 219
func containsNearbyDuplicate(nums []int, k int) bool {
	cnt := map[int]int{}
	for i, x := range nums {
		if j, ok := cnt[x]; ok {
			if i-j <= k {
				return true
			}
		}
		cnt[x] = i
	}
	return false
}

// 2506
func similarPairs(words []string) (ans int) {
	cnt := map[int]int{}
	for _, w := range words {
		mask := 0
		for _, c := range w {
			mask |= 1 << (c - 'a')
		}
		ans += cnt[mask]
		cnt[mask]++
	}
	return
}

// 624
func maxDistance(arrays [][]int) (ans int) {
	// 本质上是从两个数组中选择最大值-最小值
	minVal := math.MaxInt / 2
	maxVal := math.MinInt / 2
	for _, a := range arrays {
		curMn := a[0]
		curMx := a[len(a)-1]
		ans = max(ans, maxVal-curMn, curMx-minVal)
		maxVal = max(maxVal, curMx)
		minVal = min(minVal, curMn)
	}
	return
}

// 1010
func numPairsDivisibleBy60(time []int) (ans int) {
	cnt := map[int]int{}
	for _, v := range time {
		x := v % 60
		ans += cnt[(60-x)%60]
		cnt[x]++
	}
	return
}

// 3185
func countCompleteDayPairs(hours []int) (ans int64) {
	cnt := map[int]int{}
	for _, v := range hours {
		x := v % 24
		ans += int64(cnt[(24-x)%24])
		cnt[x]++
	}
	return
}

// 2748
func gcd2(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
func countBeautifulPairs(nums []int) (ans int) {
	cnt := [10]int{}
	for _, x := range nums {
		n := x
		for n > 10 {
			n /= 10
		}
		for i := 2; i < 10; i++ {
			if gcd(x%10, i) == 1 {
				ans += cnt[i]
			}
		}
		fmt.Println("当前数是", x, "最后一个数字是", x%10, "第一个数字是", n)
		cnt[n]++
	}
	return
}

// 2874
func maximumTripletValue(nums []int) (ans int64) {
	ans = 0
	maxI := 0
	maxDiff := 0
	for _, x := range nums {
		ans = max(ans, int64(maxDiff*x))
		maxDiff = max(maxDiff, maxI-x)
		maxI = max(maxI, x)
	}
	return
}

// 3364
func minimumSumSubarray(nums []int, l int, r int) int {
	// 找到一个小于 s[j] 的最大前缀和 s[i]，满足 l≤j−i≤r
	// 枚举 j，那么 i 需要满足 j−r≤i≤j−l。
	// 用有序集合维护这个范围内的 s[i]。
	ans := math.MaxInt
	n := len(nums)
	s := make([]int, n+1)
	cnt := redblacktree.New[int, int]()
	for j := 1; j <= n; j++ {
		// 求前缀和
		s[j] = s[j-1] + nums[j-1]
		if j < l {
			continue
		}
		c, _ := cnt.Get(s[j-l])
		cnt.Put(s[j-l], c+1)
		if lower, ok := cnt.Floor(s[j] - 1); ok {
			ans = min(ans, s[j]-lower.Key)
		}
		if j >= r {
			v := s[j-r]
			c, _ := cnt.Get(v)
			if c == 1 {
				cnt.Remove(v)
			} else {
				cnt.Put(v, c-1)
			}
		}
	}
	if ans == math.MaxInt {
		return -1
	}
	return ans
}

// 2242
func maximumScore(scores []int, edges [][]int) int {
	type nb struct{ to, s int }
	g := make([][]nb, len(scores))
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], nb{y, scores[y]})
		g[y] = append(g[y], nb{x, scores[x]})
	}
	for i, ls := range g {
		if len(ls) > 3 {
			// 从大到小
			slices.SortFunc(ls, func(x, y nb) int {
				return y.s - x.s
			})
			g[i] = ls[:3]

		}
	}
	ans := -1
	for _, e := range edges {
		x, y := e[0], e[1]
		for _, p := range g[x] {
			for _, q := range g[y] {
				if p.to != y && q.to != x && p.to != q.to {
					ans = max(ans, p.s+q.s+scores[x]+scores[y])
				}
			}
		}
	}
	return ans
}

// 2536
func rangeAddQueries1(n int, queries [][]int) (ans [][]int) {
	ans = make([][]int, n)
	for i := range ans {
		ans[i] = make([]int, n)
	}
	for _, q := range queries {
		r1, c1, r2, c2 := q[0], q[1], q[2], q[3]
		// 一维差分
		for r := r1; r < r2+1; r++ {
			ans[r][c1] += 1
			if c2+1 < n {
				ans[r][c2+1] -= 1
			}
		}
	}
	for _, row := range ans {
		// 差分 前缀和
		for j := 1; j < len(row); j++ {
			row[j] += row[j-1]
		}
	}
	return ans
}

func rangeAddQueries(n int, queries [][]int) [][]int {
	// 二维差分矩阵
	diff := make([][]int, n+1)
	for i := 0; i < n+1; i++ {
		diff[i] = make([]int, n+1)
	}
	for _, q := range queries {
		r1, c1, r2, c2 := q[0], q[1], q[2], q[3]
		r2 += 1
		c2 += 1
		diff[r1][c1] += 1 // 左上角
		diff[r2][c1] -= 1 // 右上角
		diff[r1][c2] -= 1 // 左下角
		diff[r2][c2] += 1 // 右下角
	}
	ans := make([][]int, n+1)
	for i := 0; i < n+1; i++ {
		ans[i] = make([]int, n+1)
	}
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			ans[i+1][j+1] = ans[i+1][j] + ans[i][j+1] - ans[i][j] + diff[i][j]
		}
	}
	for i, row := range ans {
		ans[i] = row[1:]
	}
	return ans[1:]
}

// 2001
func interchangeableRectangles(rectangles [][]int) (ans int64) {
	cnt := map[[2]int]int64{}
	for _, p := range rectangles {
		// 计算 w/h 的最简分数，计入哈希表
		w, h := p[0], p[1]
		g := gcd(w, h)
		cnt[[2]int{w / g, h / g}]++
	}
	fmt.Println(cnt)
	for _, m := range cnt {
		ans += m * (m - 1) / 2
	}
	return
}

func gcd(a, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}
func maxPoints(points [][]int) (ans int) {
	cnt := map[[2]int]int64{}
	for _, p := range points {
		// 计算 w/h 的最简分数，计入哈希表
		w, h := p[0], p[1]
		if h > w {
			w, h = h, w
		}
		g := gcd(w, h)
		cnt[[2]int{w / g, h / g}]++
	}
	fmt.Println(cnt)
	for _, m := range cnt {
		ans += int(m * (m - 1) / 2)
	}
	return
}
// 946
func validateStackSequences(pushed []int, popped []int) bool {
    
}
