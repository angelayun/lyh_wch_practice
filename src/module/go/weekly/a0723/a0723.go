package a0723

import (
	"fmt"
	"math"
	"slices"
)

func maximumGain222(s string, x int, y int) (ans int) {
	st := []rune{}
	// remove:=[2]rune{'a','b'}
	for i, ch := range s {
		// fmt.Println(i)
		st = append(st, ch)
		if len(st) > 1 {
			if x > y {
				if st[len(st)-1] == 'b' && st[len(st)-2] == 'a' {
					fmt.Println(i, "这是1")
					st = st[:len(st)-2]
					ans += x
				} else if st[len(st)-1] == 'a' && st[len(st)-2] == 'b' {
					fmt.Println(i, "这是2")
					st = st[:len(st)-2]
					ans += y
				}
			} else {
				if st[len(st)-1] == 'a' && st[len(st)-2] == 'b' {
					fmt.Println(i, "这是3")
					st = st[:len(st)-2]
					ans += y
				} else if st[len(st)-1] == 'b' && st[len(st)-2] == 'a' {
					fmt.Println(i, "这是3")
					st = st[:len(st)-2]
					ans += x
				}
			}
		}
	}
	return
}

func maximumGain(s string, x int, y int) (ans int) {
	a, b := 'a', 'b'
	if x < y {
		x, y = y, x
		a, b = b, a
	}

	var cnt1, cnt2 int
	for _, c := range s {
		if c == a {
			cnt1++
		} else if c == b {
			if cnt1 > 0 {
				ans += x
				cnt1--
			} else {
				cnt2++
			}
		} else {
			ans += min(cnt1, cnt2) * y
			cnt1, cnt2 = 0, 0
		}
	}
	ans += min(cnt1, cnt2) * y
	return
}

func maximumBeauty(flowers []int, newFlowers int64, target int, full int, partial int) int64 {
	n := len(flowers)
	// 如果全部种满，还剩下多少朵花？
	leftFlowers := int(newFlowers) - (target)*n
	for i, flower := range flowers {
		// 把大于target都变成了target 方便后面计算
		flowers[i] = min(target, flower)
		// 把已有的加回来
		leftFlowers += flowers[i]
	}
	// 没有种花，所有花园都已种满
	if leftFlowers == int(newFlowers) {
		// 答案只能是 n*full（注意不能减少花的数量）
		return int64(n * full)
	}
	// 可以全部种满
	if leftFlowers >= 0 {
		// 两种策略取最大值：留一个花园种 target-1 朵花，其余种满；或者，全部种满
		return int64(max((target-1)*partial+(n-1)*full, n*full))
	}
	slices.Sort(flowers)
	var ans, preSum, j int
	// 枚举 i，表示后缀 [i, n-1] 种满（i=0 的情况上面已讨论）
	for i := 1; i <= n; i++ {
		// 撤销，flowers[i-1] 不变成 target
		leftFlowers += target - flowers[i-1]
		if leftFlowers < 0 {
			// 花不能为负数，需要继续撤销
			continue
		}
		// 满足以下条件说明 [0, j] 都可以种 flowers[j] 朵花
		for j < i && flowers[j]*j <= preSum+leftFlowers {
			preSum += flowers[j]
			j++
		}
		// 在前缀 [0, j-1] 中均匀种花，这样最小值最大
		avg := (leftFlowers + preSum) / j
		ans = max(ans, avg*partial+(n-i)*full)
	}
	return int64(ans)
}

func incremovableSubarrayCount(a []int) int64 {
	n := len(a)
	i := 0
	for i < n-1 && a[i] < a[i+1] {
		i++
	}
	if i == n-1 { // 每个非空子数组都可以移除
		return int64(n) * int64(n+1) / 2
	}

	ans := int64(i + 2) // 不保留后缀的情况，一共 i+2 个
	// 枚举保留的后缀为 a[j:]
	for j := n - 1; j == n-1 || a[j] < a[j+1]; j-- {
		for i >= 0 && a[i] >= a[j] {
			i--
		}
		// 可以保留前缀 a[:i+1], a[:i], ..., a[:0] 一共 i+2 个
		ans += int64(i + 2)
	}
	return ans
}

func findUnsortedSubarray(nums []int) int {
	n := len(nums)
	mx, mn := nums[0], nums[n-1]
	begin, end := 0, -1
	for i, x := range nums {
		if x >= mx {
			mx = x
		} else {
			end = i
		}
		if nums[n-i-1] <= mn {
			mn = nums[n-i-1]
		} else {
			begin = n - i - 1
		}
	}
	return end - begin + 1
}
func findLengthOfShortestSubarray(arr []int) int {
	n := len(arr)
	right := n - 1
	for right > 0 && arr[right-1] <= arr[right] {
		right--
	}
	// arr 已经是非递减数组了
	if right == 0 {
		return 0
	}
	// 删除arr[:right]
	ans := right
	for left := 0; left == 0 || arr[left-1] <= arr[left]; left++ {
		// 前面是非递减的
		for right < n && arr[right] < arr[left] {
			right++
		}
		// 删除arr[left+1:right]
		ans = min(ans, right-left-1)
	}
	return ans
}

func maximumScore(nums []int, k int) int {
	n := len(nums)
	ans, minH := nums[k], nums[k]
	i, j := k, k
	// 第一次看到这种写法  应该是j的范围在-无穷 n-1)
	for range n - 1 {
		if j == n-1 || i > 0 && nums[i-1] > nums[j+1] {
			i--
			minH = min(minH, nums[i])
		} else {
			j++
			minH = min(minH, nums[j])
		}
		ans = max(ans, minH*(j-i+1))
	}
	return ans
}

func firstMissingPositive(nums []int) int {
	n := len(nums)
	for i := range n {
		// 如果当前学生的学号在 [1,n] 中，但（真身）没有坐在正确的座位上
		for 1 <= nums[i] && nums[i] <= n && nums[i] != nums[nums[i]-1] {
			// 那么就交换 nums[i] 和 nums[j]，其中 j 是 i 的学号
			j := nums[i] - 1 // 减一是因为数组下标从 0 开始
			nums[i], nums[j] = nums[j], nums[i]
		}
	}

	// 找第一个学号与座位编号不匹配的学生
	for i := range n {
		if nums[i] != i+1 {
			return i + 1
		}
	}

	// 所有学生都坐在正确的座位上
	return n + 1
}

func findDuplicate(nums []int) int {
	n := len(nums) - 1
	for i := range n {
		// 如果当前学生的学号在 [1,n] 中，但（真身）没有坐在正确的座位上
		for 1 <= nums[i] && nums[i] <= n && nums[i] != nums[nums[i]-1] {
			// 那么就交换 nums[i] 和 nums[j]，其中 j 是 i 的学号
			j := nums[i] - 1 // 减一是因为数组下标从 0 开始
			nums[i], nums[j] = nums[j], nums[i]
		}
	}

	// 找第一个学号与座位编号不匹配的学生
	for i := range n {
		if nums[i] != i+1 {
			return i + 1
		}
	}

	// 所有学生都坐在正确的座位上
	return n + 1
}

func findDisappearedNumbers(nums []int) (ans []int) {
	n := len(nums)
	for i := range n {
		// 如果当前学生的学号在 [1,n] 中，但（真身）没有坐在正确的座位上
		for 1 <= nums[i] && nums[i] <= n && nums[i] != nums[nums[i]-1] {
			// 那么就交换 nums[i] 和 nums[j]，其中 j 是 i 的学号
			j := nums[i] - 1 // 减一是因为数组下标从 0 开始
			nums[i], nums[j] = nums[j], nums[i]
		}
	}

	// 找第一个学号与座位编号不匹配的学生
	for i := range n {
		if nums[i] != i+1 {
			ans = append(ans, i+1)
		}
	}
	return
}
func findDuplicates(nums []int) (ans []int) {
	n := len(nums)
	for i := range n {
		// 如果当前学生的学号在 [1,n] 中，但（真身）没有坐在正确的座位上
		for 1 <= nums[i] && nums[i] <= n && nums[i] != nums[nums[i]-1] {
			// 那么就交换 nums[i] 和 nums[j]，其中 j 是 i 的学号
			j := nums[i] - 1 // 减一是因为数组下标从 0 开始
			nums[i], nums[j] = nums[j], nums[i]
		}
	}

	// 找第一个学号与座位编号不匹配的学生
	for i := range n {
		if nums[i] != i+1 {
			ans = append(ans, i+1)
		}
	}
	return
}

func minimumScore(nums []int, edges [][]int) int {
	n := len(nums)
	g := make([][]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}

	xor := make([]int, n)
	in := make([]int, n)
	out := make([]int, n)
	clock := 0
	var dfs func(int, int)
	dfs = func(x, fa int) {
		clock++
		in[x] = clock // 递
		xor[x] = nums[x]
		for _, y := range g[x] {
			if y != fa {
				dfs(y, x)
				xor[x] ^= xor[y]
			}
		}
		out[x] = clock // 归
	}
	dfs(0, -1)

	// 判断 x 是否为 y 的祖先
	isAncestor := func(x, y int) bool {
		return in[x] < in[y] && in[y] <= out[x]
	}

	ans := math.MaxInt
	// 枚举：删除 x 与 x 父节点之间的边，删除 y 与 y 父节点之间的边
	for x := 2; x < n; x++ {
		for y := 1; y < x; y++ {
			var a, b, c int
			if isAncestor(x, y) { // x 是 y 的祖先
				a, b, c = xor[y], xor[x]^xor[y], xor[0]^xor[x]
			} else if isAncestor(y, x) { // y 是 x 的祖先
				a, b, c = xor[x], xor[x]^xor[y], xor[0]^xor[y]
			} else { // x 和 y 分别属于两棵不相交的子树
				a, b, c = xor[x], xor[y], xor[0]^xor[x]^xor[y]
			}
			ans = min(ans, max(a, b, c)-min(a, b, c))
			if ans == 0 { // 不可能变小
				return 0 // 提前返回
			}
		}
	}
	return ans
}
func minOperations111(s, t string) int {
	n := len(s)
	f := make([]int, n+1)
	for i := range n {
		res := math.MaxInt
		cnt := [26][26]int{}
		op := 0
		for j := i; j >= 0; j-- {
			// 不反转
			x, y := s[j]-'a', t[j]-'a'
			if x != y {
				if cnt[y][x] > 0 {
					cnt[y][x]--
				} else {
					cnt[x][y]++
					op++
				}
			}

			// 反转
			revCnt := [26][26]int{}
			revOp := 1
			for p := j; p <= i; p++ {
				x, y := s[p]-'a', t[i+j-p]-'a'
				if x == y {
					continue
				}
				if revCnt[y][x] > 0 {
					revCnt[y][x]--
				} else {
					revCnt[x][y]++
					revOp++
				}
			}

			res = min(res, f[j]+min(op, revOp))
		}
		f[i+1] = res
	}
	return f[n]
}
func minOperations(s string, t string) int {
	var cnt [26][26]int
	var op int
	update := func(x, y byte) {
		if x == y {
			return
		}
		x -= 'a'
		y -= 'a'
		if cnt[y][x] > 0 {
			cnt[y][x]--
		} else {
			cnt[x][y]++
			op++
		}
	}
	n := len(s)
	revOp := make([][]int, n)
	for i := range revOp {
		revOp[i] = make([]int, n)
	}
	for i := range 2*n - 1 {
		cnt = [26][26]int{}
		op = 1
		l, r := i/2, (i+1)/2
		for l >= 0 && r < n {
			update(s[l], t[r])
			if l != r {
				update(s[r], t[l])
			}
			revOp[l][r] = op
			l--
			r++
		}
	}
	f := make([]int, n+1)
	for i := range n {
		res := math.MaxInt
		cnt = [26][26]int{}
		op = 0
		for j := i; j >= 0; j-- {
			update(s[j], t[j])
			res = min(res, f[j]+min(op, revOp[j][i]))
		}
		f[i+1] = res
	}
	return f[n]
}
func gcd(a, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}
func maxGCDScore(nums []int, k int) int64 {
	ans := 0
	for i := range nums {
		lowbitMin, lowbitCnt := math.MaxInt, 0
		g := 0
		for j := i; j >= 0; j-- {
			x := nums[j]
			lb := x & -x
			if lb < lowbitMin {
				lowbitMin, lowbitCnt = lb, 1
			} else if lb == lowbitMin {
				lowbitCnt++
			}

			g = gcd(g, x)
			newG := g
			if lowbitCnt <= k {
				newG *= 2
			}
			ans = max(ans, newG*(i-j+1))
		}
	}
	return int64(ans)
}
func minStable(nums []int, maxC int) int {
	n := len(nums)
	leftMin := make([]int, n)
	// 子数组的gcd  最小的左端点
	type interval struct{ gcd, left int }
	// 放一个哨兵节点
	intervals := []interval{{1, 0}}
	for i, x := range nums {
		// 计算以i为右端点的子数组的gcd
		for j, p := range intervals {
			intervals[j].gcd = gcd(p.gcd, x)
		}
		// nums[i]单独作为一个数作为子数组
		intervals = append(intervals, interval{x, i})
		// 去重（合并相同的gcd区间）
		idx := 1
		for j := 1; j < len(intervals); j++ {
			// idx是索引位置  不相同的就加入  相同的就忽略掉了
			if intervals[j].gcd != intervals[j-1].gcd {
				intervals[idx] = intervals[j]
				idx++
			}
		}
		// intervals 的性质：越靠左，GCD 越小
		intervals = intervals[:idx]
		// 由于我们添加了哨兵，intervals[1] 的 GCD >= 2 且最长，取其区间左端点作为子数组的最小左端点
		if len(intervals) > 1 {
			leftMin[i] = intervals[1].left
		} else {
			leftMin[i] = n
		}
	}
	left, right := -1, n/(maxC+1)
	check := func(mid int) bool {
		// mid 表示最大的上界

		c := maxC
		i := mid
		for i < n {
			if i-leftMin[i]+1 > mid {
				if c == 0 {
					return false
				}
				c--
				i += mid + 1
			} else {
				i++
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
func minStable222(nums []int, maxC int) int {
	n := len(nums)
	left, right := -1, n/(maxC+1)
	check := func(mid int) bool {
		// mid 表示最大的上界
		// 子数组的gcd  最小的左端点
		type interval struct{ gcd, left int }
		intervals := []interval{}
		c := maxC
		for i, x := range nums {
			// 计算以i为右端点的子数组的gcd
			for j, p := range intervals {
				intervals[j].gcd = gcd(p.gcd, x)
			}
			// nums[i]单独作为一个数作为子数组
			intervals = append(intervals, interval{x, i})
			// 去重（合并相同的gcd区间）
			idx := 1
			for j := 1; j < len(intervals); j++ {
				// idx是索引位置  不相同的就加入  相同的就忽略掉了
				if intervals[j].gcd != intervals[j-1].gcd {
					intervals[idx] = intervals[j]
					idx++
				}
			}
			// intervals 的性质：越靠左，GCD 越小
			intervals = intervals[:idx]
			// 我们只关心 GCD >= 2 的子数组
			if intervals[0].gcd == 1 {
				intervals = intervals[1:]
			}
			// intervals[0] 的 GCD >= 2 且最长，取其区间左端点作为子数组的最小左端点
			if len(intervals) > 0 && i-intervals[0].left+1 > mid {
				if c == 0 {
					return false
				}
				c--
				// 修改后gcd均为1 直接清空
				intervals = intervals[:0]
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

func countHillValley(nums []int) (ans int) {
	k := 0
	for i, x := range nums {
		if nums[i] != nums[k] {
			k++
			nums[k] = x
		}
	}
	for i := 1; i < k; i++ {
		x := nums[i]
		if (x > nums[i-1]) == (x > nums[i+1]) {
			ans++
		}
	}
	return
}

func minimumOperations(nums []int, target []int) int64 {
	posSum := 0
	negSum := 0
	d := target[0] - nums[0]
	if d > 0 {
		posSum = d
	} else {
		negSum = -d
	}
	for i := 1; i < len(nums); i++ {
		d := target[i] - nums[i] - (target[i-1] - nums[i-1])
		if d > 0 {
			posSum += d
		} else {
			negSum -= d
		}
	}
	return int64(max(posSum, negSum))
}

func lightAdjustment(brightness []int) int {
	posSum, negSum := 0, 0
	n := len(brightness)
	for i := 1; i < n; i++ {
		d := brightness[i] - brightness[i-1]
		if d > 0 {
			posSum += d
		} else {
			negSum -= d
		}
	}
	return max(posSum, negSum)
}

func numWays(weight []int) (ans int) {
	n := len(weight)
	preSum := make([]int, n+1)
	for i, x := range weight {
		if i%2 == 0 {
			preSum[i+1] = preSum[i] + x
		} else {
			preSum[i+1] = preSum[i] - x
		}
	}
	for i := 1; i <= n; i++ {
		t := preSum[i-1] - (preSum[n] - preSum[i])
		if t == 0 {
			ans++
		}
	}
	if ans > 0 {
		return
	}
	return -1
}
