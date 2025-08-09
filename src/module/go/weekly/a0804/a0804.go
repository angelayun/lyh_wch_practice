package a0804

import (
	"cmp"
	"math"
	"slices"
	"sort"
)

func isTrionic222(nums []int) bool {
	n := len(nums)
	// 第一段
	i := 1
	for ; i < n && nums[i-1] < nums[i]; i++ {
	}
	if i == 1 {
		// 第一段至少要有两个数
		return false
	}
	// 第二段
	i0 := i
	for ; i < n && nums[i-1] > nums[i]; i++ {
	}
	if i == i0 || i == n {
		// 第二段至少要有两个数  第三段至少要有两个数
		return false
	}
	// 第三段  到结尾
	for ; i < n && nums[i-1] < nums[i]; i++ {
	}
	return i == n
}

func maxBalancedShipments(weight []int) (ans int) {
	for i := 1; i < len(weight); i++ {
		if weight[i] < weight[i-1] {
			ans++
			// 为什么这里要i++ 因为i属于当前这一段了  不能属于下一段了
			// 如果不++ 那么下一步比较的时候weight[i-1]  不就重复了么
			i++
		}
	}
	return
}

func minTime2(s string, order []int, k int) int {
	n := len(s)
	if n*(n-1)/2 < k {
		return -1
	}
	left, right := -1, n
	vis := make([]int, n)
	check := func(mid int) bool {
		for _, j := range order[:mid+1] {
			vis[j] = mid
		}
		last := -1
		cnt := 0
		for i, x := range vis {
			if x == mid {
				last = i
			}
			cnt += last + 1
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

func minTime(s string, order []int, k int) int {
	n := len(s)
	cnt := n * (n + 1) / 2
	// 全部改成星号也无法满足要求
	if cnt < k {
		return -1
	}
	// 这里为什么是n+1  因为下面prev[r] = l r可能是n
	prev := make([]int, n+1)
	next := make([]int, n)
	for i := range n {
		prev[i] = i - 1
		next[i] = i + 1
	}
	for t := n - 1; ; t-- {
		i := order[t]
		l, r := prev[i], next[i]
		cnt -= (i - l) * (r - i)
		if cnt < k {
			return t
		}
		if l >= 0 {
			next[l] = r
		}
		prev[r] = l
	}
}
func isTrionic(nums []int) bool {
	n := len(nums)

	// 第一段
	i := 0
	start := i
	for i++; i < n && nums[i-1] < nums[i]; i++ {
	}
	if i == start+1 {
		// 第一段至少要有两个数
		return false
	}
	// 第二段
	peak := i - 1
	for ; i < n && nums[i-1] > nums[i]; i++ {
	}
	if i == peak+1 || i == n {
		// 第二段至少要有两个数  第三段至少要有两个数
		return false
	}
	// bottom := i - 1
	// 第三段  到结尾
	for ; i < n && nums[i-1] < nums[i]; i++ {
	}
	return i == n
}
func maxSumTrionic(nums []int) int64 {
	n := len(nums)
	ans := math.MinInt
	for i := 0; i < n; {
		start := i
		for i++; i < n && nums[i-1] < nums[i]; i++ {
		}
		// 第一段至少要有两个数
		if i == start+1 {
			continue
		}
		// 第二段
		peak := i - 1
		// 第一段的最后两个数必选
		res := nums[peak-1] + nums[peak]
		for ; i < n && nums[i-1] > nums[i]; i++ {
			// 第二段的所有元素必选
			res += nums[i]
		}
		// 第一段至少要有两个数 第三段至少要有两个数
		if i == peak+1 || i == n {
			continue
		}
		// 第三段
		bottom := i - 1
		// 第三段的前两个数必选(第一个数在上面的循环中加了)
		res += nums[i]
		maxS, s := 0, 0
		for i++; i < n && nums[i-1] < nums[i]; i++ {
			s += nums[i]
			maxS = max(maxS, s)
		}
		res += maxS
		maxS, s = 0, 0
		for j := peak - 2; j >= start; j-- {
			s += nums[j]
			maxS = max(maxS, s)
		}
		res += maxS
		ans = max(ans, res)
		// 第三段的起点也就是下一个极大三段式的第一段的起点
		i = bottom
	}
	return int64(ans)
}
func findSubstringInWraproundString_garb(s string) (ans int) {
	// dp[c] 表示以字符 c（'a'-'z'）结尾的最长环绕子串长度
	dp := [26]int{}
	for i, n := 0, len(s); i < n; {
		i0 := i
		for i++; i < n && s[i]-'a' == (s[i-1]-'a'+1)%25; i++ {
		}
		// 更新以当前字符结尾的最长长度
		c := s[i] - 'a'
		m := i - i0
		if m > dp[c] {
			dp[c] = m
		}
	}
	// 累加所有字符的最长长度，得到唯一子串总数
	for _, length := range dp {
		ans += length
	}
	return
}
func findSubstringInWraproundString222(s string) (ans int) {
	// dp[c] 表示以字符 c（'a'-'z'）结尾的最长环绕子串长度
	dp := [26]int{}
	for i, n := 0, len(s); i < n; {
		i0 := i
		for i++; i < n && s[i]-'a' == (s[i-1]-'a'+1)%26; i++ {
		}
		// 更新以当前字符结尾的最长长度
		c := s[i-1] - 'a'
		m := i - i0
		if m > dp[c] {
			dp[c] = m
		}
	}
	// 累加所有字符的最长长度，得到唯一子串总数
	for _, length := range dp {
		ans += length
	}
	return
}
func findSubstringInWraproundString(s string) int {
	// dp[c] 表示以字符 c（'a'-'z'）结尾的最长环绕子串长度
	dp := [26]int{}
	n := len(s)
	currentLen := 0 // 当前连续子串的长度

	for i := 0; i < n; i++ {
		// 检查是否与前一个字符连续（考虑环绕，如 z 后面是 a）
		if i > 0 && (s[i]-s[i-1] == 1 || s[i-1]-s[i] == 25) {
			currentLen++
		} else {
			// 不连续，重新开始计数
			currentLen = 1
		}

		// 更新以当前字符结尾的最长长度
		c := s[i] - 'a'
		if currentLen > dp[c] {
			dp[c] = currentLen
		}
	}

	// 累加所有字符的最长长度，得到唯一子串总数
	ans := 0
	for _, length := range dp {
		ans += length
	}
	return ans
}

func resultArray(nums []int) []int {
	sorted := slices.Clone(nums)
	slices.Sort(sorted)
	sorted = slices.Compact(sorted)
	m := len(sorted)
	a := []int{nums[0]}
	b := []int{nums[1]}
	t1 := newFenwickTree(m)
	t2 := newFenwickTree(m)
	t1.update(sort.SearchInts(sorted, nums[0])+1, 1)
	t2.update(sort.SearchInts(sorted, nums[1])+1, 1)
	for _, x := range nums[2:] {
		v := sort.SearchInts(sorted, x) + 1
		gc1 := len(a) - t1.pre(v)
		gc2 := len(b) - t2.pre(v)
		if gc1 > gc2 || gc1 == gc2 && len(a) <= len(b) {
			a = append(a, x)
			t1.update(v, 1)

		} else {
			b = append(b, x)
			t2.update(v, 1)
		}
	}
	return append(a, b...)
}

// https://leetcode.cn/discuss/post/3583665/
// fen-xiang-gun-ti-dan-chang-yong-shu-ju-j-bvmv/
type fenwick []int

func newFenwickTree(n int) fenwick {
	return make(fenwick, n+1) // 使用下标 1 到 n
}

// a[i] 增加 val
// 1 <= i <= n
// 时间复杂度 O(log n)
func (f fenwick) update(i int, val int) {
	for ; i < len(f); i += i & -i {
		f[i] += val
	}
}

// 求前缀和 a[1] + ... + a[i]
// 1 <= i <= n
// 时间复杂度 O(log n)
func (f fenwick) pre(i int) (res int) {
	for ; i > 0; i &= i - 1 {
		res += f[i]
	}
	return
}

// 求区间和 a[l] + ... + a[r]
// 1 <= l <= r <= n
// 时间复杂度 O(log n)
func (f fenwick) query(l, r int) int {
	if r < l {
		return 0
	}
	return f.pre(r) - f.pre(l-1)
}

func sortedSquares(nums []int) []int {
	n := len(nums)
	ans := make([]int, n)
	i, j := 0, n-1
	for p := n - 1; p >= 0; p-- {
		x, y := nums[i], nums[j]
		if -x > y {
			ans[p] = x * x
			i++
		} else {
			ans[p] = y * y
			j--
		}
	}
	return ans
}
func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
func getStrongest(arr []int, k int) []int {
	slices.Sort(arr)
	n := len(arr)
	// m := arr[n/2]
	m := arr[(n-1)/2]
	left, right := 0, n-1
	for right-left+1 > k {
		if abs(arr[right]-m) < abs(arr[left]-m) {
			right--
		} else {
			left++
		}
	}
	return arr[left : right+1]
}
func findClosestElements222(arr []int, k int, x int) []int {
	n := len(arr)
	left, right := 0, n-1
	for right-left+1 > k {
		if abs(arr[left]-x) > abs(arr[right]-x) {
			left++
		} else {
			right--
		}
	}
	return arr[left : right+1]
}
func findClosestElements222333(arr []int, k int, x int) []int {
	slices.SortFunc(arr, func(a, b int) int {
		return cmp.Or(cmp.Compare(abs(a-x), abs(b-x)), cmp.Compare(a, b))
	})
	slices.Sort(arr)
	return arr[:k]
}

func abs3(a int) int {
	if a < 0 {
		return -a
	}
	return a
}

func findClosestElements(arr []int, k int, x int) (res []int) {
	n := len(arr)
	left, right := 0, n-1
	// 删除最不接近 x 的，直到剩下 k 个
	for right-left+1 > k {
		lDiff := abs(arr[left] - x)
		rDiff := abs(arr[right] - x)

		if lDiff < rDiff || lDiff == rDiff && arr[left] < arr[right] {
			res = append(res, arr[left])
			left++
		} else {
			res = append(res, arr[right])

			right--
		}
	}
	return
}

func judgeSquareSum(c int) bool {
	a, b := 1, int(math.Sqrt(float64(c)))
	for a <= b {
		sum := a*a + b*b
		if sum == c {
			return true
		} else if sum < c {
			a++
		} else {
			b--
		}
	}
	return false
}
func triangleNumber222(nums []int) (ans int) {
	slices.Sort(nums)
	for i := 2; i < len(nums); i++ {
		c := nums[i]
		left, right := 0, i-1
		for left < right {
			a, b := nums[left], nums[right]
			if a+b > c {
				ans += right - left
				right--
			} else {
				left++
			}
		}
	}
	return
}

func triangleNumber(nums []int) (ans int) {
	slices.Sort(nums)
	n := len(nums)
	for i := n - 1; i >= 2; i-- {
		c := nums[i]
		left, right := 0, i-1
		if nums[0]+nums[1] > c {
			// 最小的俩数都比
			ans +=(i+1) * i * (i - 1) / 6
			break
		}
		if nums[i-1]+nums[i-2] < c {
			continue
		}
		for left < right {
			a, b := nums[left], nums[right]
			if a+b > c {
				ans += right - left
				right--
			} else {
				left++
			}
		}
	}
	return
}
