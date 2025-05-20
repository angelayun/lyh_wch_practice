package a20250510

import (
	"fmt"
	"math"
	"math/bits"
	"slices"
	"sort"
)

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
func minSum22(nums1 []int, nums2 []int) int64 {
	// 记录nums1和nums2中0的个数
	cnt1, cnt2 := 0, 0
	sum1, sum2 := 0, 0
	for _, x := range nums1 {
		sum1 += x
		if x == 0 {
			cnt1++
		}
	}
	for _, x := range nums2 {
		sum2 += x
		if x == 0 {
			cnt2++
		}
	}
	fmt.Println(cnt1, cnt2, sum1, sum2)
	if (cnt1 == 0 || cnt2 == 0) && (sum1 != sum2) {
		diff := abs(sum1 - sum2)
		if diff&1 != (cnt1+cnt2)&1 {
			return -1
		}
	}
	minSum := 0
	if sum2 > sum1 {
		minSum = sum2 + cnt2
	} else {
		minSum = sum1 + cnt1
	}
	return int64(minSum)
}

func minSum(nums1 []int, nums2 []int) int64 {
	// 返回nums的和（如果是0直接加1）以及是否包含0
	fn := func(nums []int) (int, bool) {
		sum := 0
		hasZero := false
		for _, x := range nums {
			if x == 0 {
				sum++
				hasZero = true
			} else {
				sum += x
			}
		}
		return sum, hasZero
	}
	sum1, zero1 := fn(nums1)
	sum2, zero2 := fn(nums2)
	if !zero1 && sum1 < sum2 || !zero2 && sum2 < sum1 {
		return -1
	}
	return int64(max(sum1, sum2))
}
func maxNumberOfAlloys(n int, k int, budget int, composition [][]int, stock []int, cost []int) int {
	left := -1
	/* maxCnt := math.MinInt
		for _, ls := range composition {
			for i, num := range ls {
	      cnt:=(num*cost[i])
				maxCnt = max(maxCnt, (budget+cnt-1)/cnt)
			}
		} */
	right := int(1e17 + 500)
	fmt.Println(right)
	check := func(mid int) bool {
		// 我要制造多少份mid合金
		for _, ls := range composition {
			sum := 0
			for i, num := range ls {
				cnt := num * mid
				if cnt >= stock[i] {
					sum += cost[i] * (cnt - stock[i])
				}
			}
			if sum <= budget {
				return true
			}
		}
		return false
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

func rampartDefensiveLine222(rampart [][]int) int {
	n := len(rampart)
	left, right := 0, rampart[len(rampart)-1][1]+1
	check := func(mid int) bool {
		// 当前膨胀的值为mid
		for i := 1; i < n; i++ {
			// 左边间隙
			diff := rampart[i][0] - rampart[i-1][1]
			if i+1 < n {
				// 说明有右边
				diff += rampart[i+1][0] - rampart[i][1]
			}
			if diff > mid {
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
	return left
}

func rampartDefensiveLine(rampart [][]int) int {
	n := len(rampart)
	s := rampart[n-1][0] - rampart[0][1]
	left := math.MaxInt
	for i, p := range rampart {
		if i != 0 {
			left = min(left, p[0]-rampart[i-1][1])
			if i != n-1 {
				s -= p[1] - p[0]
			}
		}
	}
	right := s/(n-2) + 1
	check := func(mid int) bool {
		// 当前膨胀的值为mid
		preR := math.MinInt / 2
		for i, p := range rampart[:n-1] {
			r := p[1]
			space := mid - (p[0] - preR)
			if space > 0 {
				// 向右膨胀
				r += space
				if r > rampart[i+1][0] {
					return false
				}
			}
			preR = r
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
	return left
}

func findCommonResponse(responses [][]string) (ans string) {
	maxCnt := 0
	vis := map[string]bool{}
	cnt := map[string]int{}
	for _, rps := range responses {
		clear(vis)
		for _, s := range rps {
			if vis[s] {
				continue
			}
			vis[s] = true
			cnt[s]++
			count := cnt[s]
			if count > maxCnt || count == maxCnt && s < ans {
				ans = s
				maxCnt = count
			}
		}
	}
	return
}
func maxPointsInsideSquare(points [][]int, s string) (ans int) {
	left, right := -1, 1_000_000_001
	check := func(mid int) bool {
		vis := 0
		// mid为半边的边长
		for i, p := range points {
			x, y := abs(p[0]), abs(p[1])
			if x <= mid && y <= mid {
				c := (s[i] - 'a')
				if vis>>c&1 == 1 {
					return true
				}
				vis |= 1 << c
			}
		}
		ans = bits.OnesCount(uint(vis))
		return false
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			left = mid
		} else {
			right = mid
		}
	}
	return ans
}

func maxProfit(inventory []int, orders int) int {
	// 从大到小进行排序
	sort.Slice(inventory, func(i, j int) bool {
		return inventory[i] > inventory[j]
	})
	inventory = append(inventory, 0) // 添加一个0，避免处理边界条件
	n := len(inventory)
	mod := int(math.Pow(10, 9)) + 7
	res := 0
	width := 0

	for i := 0; i < n-1; i++ {
		width++
		if inventory[i] > inventory[i+1] {
			maxCurrent := inventory[i]
			next := inventory[i+1]
			// 如果当前的orders不足以覆盖整个宽度的(maxCurrent-next)区间
			if orders < width*(maxCurrent-next) {
				/*
					假设当前状态：
					maxCurrent = 7（当前最高库存数量）
					next = 3（下一个库存数量）
					width = 2（当前处理的颜色数量）
					orders = 5（剩余订单数）
					当前可以批量处理的数量为maxCurrent - next = 4，但我们只有 5 个订单，不足以覆盖width * 4 = 8个球的批量处理。
					每个颜色在每个完整批次中销售的球数从maxCurrent递减到maxCurrent - whole + 1
				*/
				whole, remain := orders/width, orders%width
				// 等差数列求和：whole次完整的从maxCurrent到maxCurrent-whole+1
				sum := whole * (2*maxCurrent - whole + 1) / 2 % mod
				res = (res + sum*width) % mod
				// 剩余的remain个maxCurrent-whole
				res = (res + (maxCurrent-whole)*remain) % mod
				return res
			} else {
				// 足够覆盖整个区间
				/*
					*当前颜色数量为 9，下一个颜色数量为 6。
						width加 1，变为 1（只处理第一个颜色）。
						可以批量销售的数量为9-6=3。
						这 3 个球的价值为等差数列求和：9 + 8 + 7 = 24。
				*/
				sum := (maxCurrent + next + 1) * (maxCurrent - next) / 2 % mod
				res = (res + sum*width) % mod
				orders -= width * (maxCurrent - next)
			}
		}
		if orders <= 0 {
			break
		}
	}
	return res % mod
}

func splitArray(nums []int, k int) int {
	sum, mx := 0, 0
	for _, x := range nums {
		sum += x
		mx = max(mx, x)
	}
	left := mx - 1
	right := sum
	check := func(mid int) bool {
		// 当前分割的和最大为mid
		cnt := 1
		sum := 0
		for _, x := range nums {
			if sum+x <= mid {
				sum += x
				continue
			}
			if cnt == k {
				return false
			}
			cnt++
			sum = x
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
	return left
}

func minimizedMaximum(n int, quantities []int) int {
	left := -1
	right := slices.Max(quantities)
	check := func(mid int) bool {
		// 分配的最大值为mid
		cnt := 0
		for _, x := range quantities {
			cnt += (x + mid - 1) / mid
			if cnt > n {
				return false
			}
		}
		return true
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

func minimumSize(nums []int, maxOperations int) int {
	left := 0
	right := slices.Max(nums)
	check := func(mid int) bool {
		// 最大的球为mid
		cnt := 0
		for _, x := range nums {
			cnt += (x + mid - 1) / mid
			if cnt > maxOperations {
				return false
			}
		}
		return true
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

func minimumEffortPath(heights [][]int) int {
	dirs := [][]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	m := len(heights)
	n := len(heights[0])
	type pair struct{ x, y int }
	check := func(limit int) bool {
		vis := make([][]bool, m)
		for i := range vis {
			vis[i] = make([]bool, n)
		}
		queue := []pair{{0, 0}}
		vis[0][0] = true

		for len(queue) > 0 {
			front := queue[0]
			queue = queue[1:]

			i, j := front.x, front.y
			if i == m-1 && j == n-1 {
				return true
			}

			for _, dir := range dirs {
				ii, jj := i+dir[0], j+dir[1]
				if ii >= 0 && ii < m && jj >= 0 && jj < n && !vis[ii][jj] &&
					abs(heights[ii][jj]-heights[i][j]) <= limit {
					vis[ii][jj] = true
					queue = append(queue, pair{ii, jj})
				}
			}
		}
		return false
	}

	left, right := -1, 1000000
	for left+1 < right {
		mid := (left + right) >> 1
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	return right
}

func minimizeArrayValue(nums []int) int {
	mx := slices.Max(nums)
	left, right := -1, mx+1
	check := func(mid int) bool {
		n := len(nums)
		extra := 0
		for i := n - 1; i > 0; i-- {
			x := nums[i] + extra
			if x > mid {
				extra = x - mid
			} else {
				extra = 0
			}
		}
		return nums[0]+extra <= mid
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
func minCapability(nums []int, k int) int {
	mn, mx := slices.Min(nums), slices.Max(nums)
	left, right := mn, mx+1
	n := len(nums)
	check := func(mid int) bool {
		f := make([]int, n+2)
		for i, x := range nums {
			f[i+2] = f[i+1]
			if x <= mid {
				f[i+2] = max(f[i+2], f[i]+1)
			}
		}
		return f[n+1] >= k
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

func successfulPairs(spells []int, potions []int, success int64) []int {
	slices.Sort(potions)
	n := len(potions)
	ans := make([]int, len(spells))
	for i, x := range spells {
		ans[i] = n - sort.SearchInts(potions, (int(success)+x-1)/x)
	}
	return ans
}

func findEvenNumbers2(digits []int) (ans []int) {
	cnt := [10]int{}
	for _, x := range digits {
		cnt[x]++
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
	for _, x := range digits {
		cnt[x]++
	}
	var dfs func(int, int)
	dfs = func(i, x int) {
		if i == 3 {
			ans = append(ans, x)
			return
		}
		for d, c := range cnt {
			if c > 0 && ((i == 0 && d > 0) || i == 1 || (i == 2 && d%2 == 0)) {
				cnt[d]--
				dfs(i+1, x*10+d)
				cnt[d]++
			}
		}
	}
	dfs(0, 0)
	return
}
func minimizeMax(nums []int, p int) int {
	slices.Sort(nums)
	n := len(nums)
	// 最小差值可能为0  最大差值可能为最大值减去最小值
	left, right := -1, nums[n-1]-nums[0]
	check := func(mid int) bool {
		// mid为当前差值
		cnt, i := 0, 0
		for i < n-1 {
			if nums[i+1]-nums[i] <= mid {
				cnt++
				i += 2
			} else {
				i += 1
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

func minMaxWeight(n int, edges [][]int, threshold int) int {
	if len(edges) < n-1 {
		return -1
	}
	type edge struct{ to, w int }
	g := make([][]edge, n)
	maxW := 0
	for _, e := range edges {
		x, y, w := e[0], e[1], e[2]
		// 建立反向的边
		g[y] = append(g[y], edge{x, w})
		maxW = max(maxW, w)
	}
	vis := make([]int, n)
	left, right := 0, maxW+1
	check := func(mid int) bool {
		// mid为边权的最大值
		remain := n // 剩余多少个点未访问到
		var dfs func(int)
		dfs = func(x int) {
			vis[x] = mid
			remain--
			for _, e := range g[x] {
				if e.w <= mid && vis[e.to] != mid {
					dfs(e.to)
				}
			}
		}
		dfs(0)
		return remain == 0
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	if right > maxW {
		return -1
	}
	return right
}

func minimizeSet(d1, d2, uniqueCnt1, uniqueCnt2 int) int {
	lcm := d1 / gcd(d1, d2) * d2
	left, right := 0, (uniqueCnt1+uniqueCnt2)*2
	check := func(mid int) bool {
		// mid为当前可以选择的数字的最大值
		left1 := max(uniqueCnt1-mid/d2+mid/lcm, 0)
		left2 := max(uniqueCnt2-mid/d1+mid/lcm, 0)
		common := mid - mid/d1 - mid/d2 + mid/lcm
		return common >= left1+left2
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

func minLength(s string, numOps int) int {
	n := len(s)
	left, right := 0, n
	// 判断能否在 numOps 次操作内，把每段连续相同子串的长度都变成 ≤m 的
	check := func(mid int) bool {
		// mid为当前相同子串的长度
		cnt := 0
		if mid == 1 {
			// 改成 0101...
			for i, b := range s {
				// 如果 s[i] 和 i 的奇偶性不同，cnt 加一
				cnt += (int(b) ^ i) & 1
			}
			// n-cnt 表示改成 1010...
			cnt = min(cnt, n-cnt)
		} else {
			k := 0
			for i := range n {
				k++
				// 到达连续相同子串的末尾
				if i == n-1 || s[i] != s[i+1] {
					cnt += k / (mid + 1)
					k = 0
				}
			}
		}
		return cnt <= numOps
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

func findMaximumNumber(K int64, x int) int64 {
	k := int(K)
	left, right := 0, (k+1)<<x
	check := func(mid int) bool {
		// mid表示当前最大的廉价数字
		n := bits.Len(uint(mid))
		memo := make([][]int, n)
		for i := range memo {
			memo[i] = make([]int, n+1)
			for j := range memo[i] {
				memo[i][j] = -1
			}
		}
		var dfs func(int, int, bool) int
		dfs = func(i, cnt1 int, limitHigh bool) (res int) {
			if i < 0 {
				return cnt1
			}
			if !limitHigh {
				p := &memo[i][cnt1]
				if *p >= 0 {
					return *p
				}
				defer func() { *p = res }()
			}
			up := 1
			if limitHigh {
				up = mid >> i & 1
			}
			for d := 0; d <= up; d++ {
				c := cnt1
				if d == 1 && (i+1)%x == 0 {
					c++
				}
				res += dfs(i-1, c, limitHigh && d == up)
			}
			return
		}
		return dfs(n-1, 0, true) > k
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			left = mid
		} else {
			right = mid
		}
	}
	return int64(left)
}

func minDeletion(s string, k int) int {
	cnt := [26]int{}
	for _, ch := range s {
		cnt[ch-'a']++
	}
	// 将数组转换为切片以便排序
	freqs := make([]int, 0, 26)
	for _, c := range cnt {
		if c > 0 {
			freqs = append(freqs, c)
		}
	}

	// 按频率降序排序
	slices.SortFunc(freqs, func(a, b int) int {
		return b - a // 降序排列
	})

	sum := 0
	for i := 0; i < min(len(freqs), k); i++ {
		sum += freqs[i]
	}
	return len(s) - sum
}

func minTime(time []int, m int) int {
	check := func(mid int) bool {
		// mid表示每一段准备花费的刷题时间最多是mid
		cnt := 1
		s := 0
		// 当前这一段中的题目花费的最多时间
		Max := 0
		for _, t := range time {
			s += t
			Max = max(t, Max)
			if s-Max > mid {
				cnt++
				if cnt > m {
					return false
				}
				s = t
				Max = t
			}
		}
		return true
	}

	left := -1
	right := 0
	for _, t := range time {
		right += t
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

func maxPossibleScore(start []int, d int) int {
	slices.Sort(start)
	n := len(start)
	left, right := 0, (start[n-1]+d-start[0])/(n-1)+1
	check := func(mid int) bool {
		// mid为间距
		x := math.MinInt
		for _, s := range start {
			// x必须大于区间左商战
			x = max(x+mid, s)
			if x > s+d {
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
	return left
}

func maximumTastiness(price []int, k int) int {
	slices.Sort(price)
	n := len(price)
	left, right := 0, (price[n-1]-price[0])/(k-1)+1
	check := func(mid int) bool {
		// mid为当前甜蜜度
		cnt := 1
		pre := price[0]
		for _, p := range price {
			if p >= pre+mid {
				cnt++
				pre = p
			}
		}
		return cnt >= k
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

func maxPower(stations []int, r, k int) int64 {
	n := len(stations)
	sum := make([]int, n+1) // 前缀和
	for i, x := range stations {
		sum[i+1] = sum[i] + x
	}
	mn := math.MaxInt
	for i := range stations {
		stations[i] = sum[min(i+r+1, n)] - sum[max(i-r, 0)] // 电量
		mn = min(mn, stations[i])
	}
	check := func(minPower int) bool {
		diff := make([]int, n) // 差分数组
		sumD, need := 0, 0
		for i, power := range stations {
			sumD += diff[i] // 累加差分值
			m := minPower - power - sumD
			if m > 0 { // 需要 m 个供电站
				need += m
				if need > k { // 提前退出这样快一些
					return false // 不满足要求
				}
				sumD += m // 差分更新
				if i+r*2+1 < n {
					diff[i+r*2+1] -= m // 差分更新
				}
			}
		}
		return true
	}
	left, right := mn, mn+k+1
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			left = mid
		} else {
			right = mid
		}
	}
	return int64(left)
}

func maxScore(points []int, m int) int64 {
	mn := slices.Min(points)

	check := func(low int) bool {
		remain := m
		pre := 0
		for i, p := range points {
			k := (low-1)/p + 1 - pre          // 还需要操作的次数
			if i == len(points)-1 && k <= 0 { // 最后一个数已经满足要求
				break
			}
			k = max(k, 1)     // 至少要走 1 步
			remain -= k*2 - 1 // 左右横跳
			if remain < 0 {
				return false
			}
			pre = k - 1 // 右边那个数顺带操作了 k-1 次
		}
		return true
	}
	// 假设第一个数是最小值，那么它可以通过左右横跳操作 m/2上取整 次。结果 +1 之后一定无法满足要求
	left, right := 0, (m+1)/2*mn+1
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			left = mid
		} else {
			right = mid
		}
	}
	return int64(left)
}

func findKthSmallest(coins []int, k int) int64 {
	mn := slices.Min(coins)
	left, right := k-1, mn*k
	n := len(coins)
	check := func(mid int) bool {
		cnt := 0
	next:
		for i := 1; i < 1<<n; i++ {
			// 枚举所有的非空子集
			lcmRes := 1
			for j := 0; j < n; j++ { // 从0开始枚举所有硬币
				if ((i >> j) & 1) == 1 {
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
func findKthNumber(m int, n int, k int) int {
	left, right := 0, m*n
	check := func(mid int) bool {
		// 当前上界是mid
		cnt := 0
		for i := 1; i <= m; i++ {
			cnt += min(mid/i, n)
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

func kthSmallest(matrix [][]int, k int) int {
	n := len(matrix)
	// 在值域上二分
	left, right := matrix[0][0]-1, matrix[n-1][n-1]+1
	check := func(mid int) bool {
		cnt := 0
		row, col := 0, n-1
		for row < n && col >= 0 {
			if mid >= matrix[row][col] {
				cnt += col + 1
				row++
			} else {
				col--
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

func smallestDistancePair222(nums []int, k int) int {
	n := len(nums)
	slices.Sort(nums)
	left, right := 0, nums[n-1]-nums[0]+1
	allCnt := map[int]int{}
	for _, x := range nums {
		allCnt[x]++
	}
	check := func(mid int) bool {
		cnt := 0
		for k1, v1 := range allCnt {
			for k2, v2 := range allCnt {
				if k2 != k1 {
					if abs(k2-k1) <= mid {
						cnt += v2 * v1
					}
				}
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

func getLongestSubsequence(words []string, groups []int) (ans []string) {
	n := len(groups)
	for i, ch := range words {
		if i == n-1 || groups[i] != groups[i+1] {
			ans = append(ans, ch)
		}
	}
	return ans
}
func smallestDistancePair(nums []int, k int) int {
	n := len(nums)
	slices.Sort(nums)
	left, right := 0, nums[n-1]-nums[0]+1
	check := func(mid int) bool {
		cnt := 0
		for left, right := 0, 0; right < n; {
			for right < n && abs(nums[right]-nums[left]) <= mid {
				cnt += right - left
				if cnt >= k {
					return true
				}
				right++
			}
			left++
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

/* func kSmallestPairs(nums1 []int, nums2 []int, k int) [][]int {
	n, m := len(nums1), len(nums2)
	left, right := 1, nums1[n-1]+nums2[m-1]+1
	check := func(mid int) bool {
		// 当前和最大为mid
		cnt := 0
		i, j := 0, 0
		for i < n && j < m {
			if nums1[i]+nums2[j] <= mid {
				cnt += i
			}
		}
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	// 最大的和为right
} */

func kSum(nums []int, k int) int64 {
	// total 表示所有数的绝对值的和
	// sum表示所有正数的和
	sum, total := 0, 0
	for i, x := range nums {
		if x >= 0 {
			sum += x
			total += x
		} else {
			total -= x
			// 把所有的负数变成正数
			nums[i] = -x
		}
	}
	slices.Sort(nums)
	left, right := 0, total
	check := func(mid int) bool {
		// mid 表示当前子序列的和
		// 空子序列算一个
		cnt := 1
		var dfs func(int, int)
		dfs = func(i, s int) {
			// 如果已经选择了k个  但是和不够mid
			// 和加上当前无数超过了
			if cnt == k || i == len(nums) || s+nums[i] > mid {
				return
			}
			cnt++
			dfs(i+1, s+nums[i]) //选
			dfs(i+1, s)         //不选
		}
		dfs(0, 0)
		return cnt == k
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	return int64(sum - right)
}

func nthMagicalNumber(n int, a int, b int) int {
	lcm := a / gcd(a, b) * b
	left, right := min(a, b)+n-2, min(a, b)*n // 开区间 (left, right)
	for left+1 < right {                      // 开区间不为空
		mid := left + (right-left)/2
		if mid/a+mid/b-mid/lcm >= n {
			right = mid // 范围缩小到 (left, mid)
		} else {
			left = mid // 范围缩小到 (mid, right)
		}
	}
	return right % 1_000_000_007
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
func nthUglyNumber(n int, a int, b int, c int) int {
	l1 := lcm(a, b)
	l2 := lcm(a, c)
	l3 := lcm(b, c)
	l4 := lcm(lcm(a, b), c)
	left, right := min(a, b, c)+n-2, min(a, b, c)*n // 开区间 (left, right)
	for left+1 < right {                            // 开区间不为空
		mid := left + ((right - left) >> 1)
		if mid/a+mid/b+mid/c-mid/l1-mid/l2-mid/l3+mid/l4 >= n {
			right = mid // 范围缩小到 (left, mid)
		} else {
			left = mid // 范围缩小到 (mid, right)
		}
	}
	return right
}

// trailingZeroes 计算n!末尾零的数量
func trailingZeroes(n int) int {
	count := 0
	for n > 0 {
		n /= 5
		count += n
	}
	return count
}

// preimageSizeFZF 计算满足条件的x的数量
func preimageSizeFZF(k int) int {
	// 二分查找确定左右边界
	left, right := -1, 5*(k+1)+1
	for left+1 < right {
		mid := left + (right-left)/2
		zeros := trailingZeroes(mid)
		if zeros >= k {
			right = mid
		} else {
			left = mid
		}
	}
	return right // 不存在这样的x
}

func canPartitionGrid(grid [][]int) bool {
	m, n := len(grid), len(grid[0])
	sum := 0
	for _, rows := range grid {
		for _, col := range rows {
			sum += col
		}
	}
	if sum%2 != 0 {
		return false
	}
	halfSum := 0
	for i := 0; i < m-1; i++ {
		rows := grid[i]
		for _, col := range rows {
			halfSum += col
		}
		if halfSum*2 == sum {
			return true
		}
	}
	halfSum = 0
	for j := 0; j < n-1; j++ {
		for i := 0; i < m; i++ {
			halfSum += grid[i][j]
		}
		if halfSum*2 == sum {
			return true
		}
	}
	return false
}

func rangeSum(nums []int, n int, left int, right int) (res int) {
	ans := []int{}
	for i := 0; i < n; i++ {
		sum := nums[i]
		ans = append(ans, sum)
		for j := i + 1; j < n; j++ {
			sum += nums[j]
			ans = append(ans, sum)
		}
	}
	slices.Sort(ans)
	for i := left - 1; i < right; i++ {
		res = (res + ans[i]) % 1_000_000_007
	}
	return
}
func mySqrt(x int) int {
	left, right := 0, min(x+1, 46341)
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if mid*mid <= x {
			left = mid
		} else {
			right = mid
		}
	}
	return left
}

func searchMatrix1(matrix [][]int, target int) bool {
	m, n := len(matrix), len(matrix[0])
	left, right := -1, m*n
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		x := matrix[mid/m][mid%m]
		if x == target {
			return true
		} else if x < target {
			left = mid
		} else {
			right = mid
		}
	}
	return false
}

func searchMatrix(matrix [][]int, target int) bool {
	m, n := len(matrix), len(matrix[0])
	// 从右上角开始搜索
	i, j := 0, n-1
	for i < m && j >= 0 {
		x := matrix[i][j]
		if x == target {
			return true
		} else if x < target {
			// 这一行都可以排除掉了
			i++
		} else {
			// 这一列都可以排除掉了
			j--
		}
	}
	return false
}

/*
	 func firstBadVersion(n int) int {
		left, right := 0, n+1
		for left+1 < right {
			mid := left + ((right - left) >> 1)
			if isBadVersion(mid) {
				right = mid
			} else {
				left = mid
			}
		}
		return right
	}
*/
/* func guessNumber(n int) int {
	left, right := 0, n+1
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		ans := guess(mid)
		if ans == 0 {
			return mid
		} else if ans < 0 {
			left = mid
		} else {
			right = mid
		}
	}
	return -1
} */

/* func guessNumber(n int) int {
	left, right := 0, n+1
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		ans := guess(mid)
		if ans <= 0 {
			left = mid
		} else {
			right = mid
		}
	}
	return left
} */

func sortColors(nums []int) {
	n := len(nums)
	if n < 2 {
		return
	}
	// all in [0..zero) = 0
	// all in [zero..i) = 1
	// all in [two..n - 1] = 2
	i, zero, two := 0, 0, n-1
	for i <= two {
		if nums[i] == 0 {
			nums[i], nums[zero] = nums[zero], nums[i]
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
func findPeakElement(nums []int) int {
	n := len(nums)
	left, right := -1, n-1
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if nums[mid] > nums[mid+1] {
			right = mid
		} else {
			left = mid
		}
	}
	return right
}

func findPeakGrid(mat [][]int) []int {
	n := len(mat)
	left, right := -1, n-1
	indexOfMax := func(nums []int) (idx int) {
		for i, x := range nums {
			if x > nums[idx] {
				idx = i
			}
		}
		return idx
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		maxJ := indexOfMax(mat[mid])
		if mat[mid][maxJ] > mat[mid][maxJ] {
			right = mid
		} else {
			left = mid
		}
	}
	return []int{right, indexOfMax(mat[right])}
}

func peakIndexInMountainArray(arr []int) int {
	n := len(arr)
	left, right := 0, n-2
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if arr[mid] > arr[mid+1] {
			right = mid
		} else {
			left = mid
		}
	}
	return right
}

/*
	 func findInMountainArray(target int, arr *MountainArray) int {
		n := arr.length()
		// 先找到峰值
		peak := sort.Search(n-1, func(i int) bool { return arr.get(i) >= arr.get(i+1) })
		// 在左半段上升区段中查找 >=target
		i := sort.Search(peak, func(i int) bool { return arr.get(i) >= target })
		if arr.get(i) != target {
			// 左右半段下降区段中查的 <=target
			i = peak + sort.Search(n-1-peak, func(i int) bool { return arr.get(peak+i) <= target })
			if arr.get(i) != target {
				return -1
			}
		}
		return i
	}
*/
func findMin1(nums []int) int {
	n := len(nums)
	left, right := -1, n-1
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if nums[mid] < nums[n-1] {
			right = mid
		} else {
			left = mid
		}
	}
	return nums[right]
}
func findMin(nums []int) int {
	n := len(nums)
	left, right := -1, n-1
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if nums[mid] == nums[n-1] {
			right--
		} else if nums[mid] < nums[n-1] {
			right = mid
		} else {
			left = mid
		}
	}
	return nums[right]
}

func search22(nums []int, target int) int {
	end := nums[len(nums)-1]
	check := func(i int) bool {
		x := nums[i]
		if x > end {
			// 说明x在第一段中  target也必须在第一段中  x>=target因为x在target的右边
			return target > end && x >= target
		}
		// x在第二段中  如果 target 在第一段，那么 x 一定在 target 右边
		// 如果target在第二段中  那么 x 必须大于等于 target
		return target > end || x >= target
	}

	left, right := -1, len(nums)-1 // 开区间 (-1, n-1)
	for left+1 < right {           // 开区间不为空
		mid := left + (right-left)/2
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	if nums[right] != target {
		return -1
	}
	return right
}
func search(nums []int, target int) bool {
	left, right := -1, len(nums)-1 // 开区间 (-1, n-1)
	check := func(i int) bool {
		end := nums[right]
		x := nums[i]
		if x > end {
			// 说明x在第一段中  target也必须在第一段中  x>=target因为x在target的右边
			return target > end && x >= target
		}
		// x在第二段中  如果 target 在第一段，那么 x 一定在 target 右边
		// 如果target在第二段中  那么 x 必须大于等于 target
		return target > end || x >= target
	}
	for left+1 < right { // 开区间不为空
		mid := left + (right-left)/2
		if nums[mid] == target {
			right--
		} else if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	return nums[right] == target
}

func findKthPositive(arr []int, k int) int {
	left, right := -1, len(arr)
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		// 计算当前区间内缺失的数字个数
		if arr[mid]-(mid+1) < k {
			// 第k个缺失的数字在右边
			left = mid
		} else {
			// 第k个缺失的数字在左边
			right = mid
		}
	}
	// 返回第k个缺失的数字
	return left + 1 + k
}
func singleNonDuplicate(nums []int) int {
	left, right := -1, len(nums)
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if (mid&1 == 1 && nums[mid] != nums[mid-1]) || (mid&1 == 0 && nums[mid] != nums[mid+1]) {
			right = mid
		} else {
			left = mid
		}
	}
	return nums[right]
}
func triangleType(nums []int) string {
	slices.Sort(nums)
	a, b, c := nums[0], nums[1], nums[2]
	if a+b <= c {
		return "none"
	}
	if a != b && b != c {
		return "scalene"
	} else if a == b && b == c {
		return "equilateral"
	}
	return "isosceles"
}

func findMedianSortedArrays222(a, b []int) float64 {
	if len(a) > len(b) {
		a, b = b, a // 保证下面的 i 可以从 0 开始枚举
	}

	m, n := len(a), len(b)
	a = append([]int{math.MinInt}, append(a, math.MaxInt)...)
	b = append([]int{math.MinInt}, append(b, math.MaxInt)...)

	// 枚举 nums1 有 i 个数在第一组
	// 那么 nums2 有 j = (m+n+1)/2 - i 个数在第一组
	i, j := 0, (m+n+1)/2
	fmt.Println(i, j)
	for {
		if a[i] <= b[j+1] && a[i+1] > b[j] { // 写 >= 也可以
			max1 := max(a[i], b[j])     // 第一组的最大值
			min2 := min(a[i+1], b[j+1]) // 第二组的最小值
			if (m+n)%2 > 0 {
				return float64(max1)
			}
			return float64(max1+min2) / 2
		}
		i++ // 继续枚举
		j--
	}
}
func findMedianSortedArrays1(a []int, b []int) float64 {
	if len(a) > len(b) {
		a, b = b, a
	}
	m, n := len(a), len(b)
	a = append([]int{math.MinInt}, append(a, math.MaxInt)...)
	b = append([]int{math.MinInt}, append(b, math.MaxInt)...)
	i, j := 0, (m+n+1)/2

	for {
		if a[i] <= b[j+1] && a[i+1] >= b[j] {
			mx := max(a[i], b[j])
			mn := min(a[i+1], b[j+1])
			if (m+n)%2 > 0 {
				return float64(mx)
			}
			return float64(mx+mn) / 2
		}
		i++
		j--
	}
}
func findMedianSortedArrays2(a []int, b []int) float64 {
	if len(a) > len(b) {
		a, b = b, a
	}
	m, n := len(a), len(b)
	a = append([]int{math.MinInt}, append(a, math.MaxInt)...)
	b = append([]int{math.MinInt}, append(b, math.MaxInt)...)
	i, j := 0, (m+n+1)/2

	for a[i+1] > b[j] {
		i++
		j--
	}
	mx := max(a[i], b[j])
	mn := min(a[i+1], b[j+1])
	if (m+n)%2 > 0 {
		return float64(mx)
	}
	return float64(mx+mn) / 2
}

func findMedianSortedArrays(a []int, b []int) float64 {
	if len(a) > len(b) {
		a, b = b, a
	}
	m, n := len(a), len(b)
	a = append([]int{math.MinInt}, append(a, math.MaxInt)...)
	b = append([]int{math.MinInt}, append(b, math.MaxInt)...)
	left, right := 0, m+1
	for left+1 < right {
		i := left + ((right - left) >> 1)
		j := (m+n+1)/2 - i
		if a[i] <= b[j+1] {
			left = i
		} else {
			right = i
		}
	}
	i := left
	j := (m+n+1)/2 - i

	mx := max(a[i], b[j])
	mn := min(a[i+1], b[j+1])
	if (m+n)%2 > 0 {
		return float64(mx)
	}
	return float64(mx+mn) / 2
}
