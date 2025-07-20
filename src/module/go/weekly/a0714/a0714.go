package a0714

import (
	"fmt"
	"math"
	"math/bits"
	"slices"
	"sort"
	"unicode"
)

func processStr(s string) string {
	ans := []byte{}
	for _, ch := range s {
		if ch == '*' {
			if len(ans) > 0 {
				ans = ans[:len(ans)-1]
			}
		} else if ch == '#' {
			ans = append(ans, ans...)
		} else if ch == '%' {
			slices.Reverse(ans)
		} else {
			ans = append(ans, byte(ch))
		}
	}
	return string(ans)
}

func maxLen222(n int, edges [][]int, label string) (ans int) {
	if len(edges) == n*(n-1)/2 {
		// 完全图的情况
		cnt := [26]int{}
		for _, ch := range label {
			cnt[ch-'a']++
		}
		odd := 0
		for _, c := range cnt {
			ans += c - c%2
			odd |= c % 2
		}
		return ans + odd
	}
	g := make([][]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}
	memo := make([][][]int, n)
	for i := range memo {
		memo[i] = make([][]int, n)
		for j := range memo[i] {
			memo[i][j] = make([]int, 1<<n)
			for k := range memo[i][j] {
				memo[i][j][k] = -1
			}
		}
	}
	// 计算从 x 和 y 向两侧扩展，最多还能访问多少个节点（不算 x 和 y）
	var dfs func(int, int, int) int
	dfs = func(x, y, vis int) (res int) {
		p := &memo[x][y][vis]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		for _, v := range g[x] {
			if vis>>v&1 == 1 {
				continue
			}
			for _, w := range g[y] {
				if vis>>w&1 == 1 {
					continue
				}
				if v != w && label[v] == label[w] {
					r := dfs(min(v, w), max(v, w), vis|1<<v|1<<w)
					res = max(res, r+2)
				}
			}
		}
		return res
	}
	for x, to := range g {
		ans = max(ans, dfs(x, x, 1<<x)+1)
		if ans == n {
			return
		}
		for _, y := range to {
			if x < y && label[x] == label[y] {
				ans = max(ans, dfs(x, y, 1<<x|1<<y)+2)
				if ans == n {
					return
				}
			}
		}
	}
	return
}

func maxLen(n int, edges [][]int, label string) (ans int) {
	if len(edges) == n*(n-1)/2 {
		cnt := [26]int{}
		for _, ch := range label {
			cnt[ch-'a']++
		}
		odd := 0
		for _, c := range cnt {
			ans += c - c%2
			odd |= c % 2
		}
		return ans + odd
	}
	g := make([][]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}
	memo := make([][][]int, n)
	for i := range memo {
		memo[i] = make([][]int, n)
		for j := range memo[i] {
			memo[i][j] = make([]int, 1<<n)
			for k := range memo[i][j] {
				memo[i][j][k] = -1
			}
		}
	}
	var dfs func(int, int, int) int
	dfs = func(x, y, vis int) (res int) {
		p := &memo[x][y][vis]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		for _, v := range g[x] {
			if vis>>v&1 == 1 {
				continue
			}
			for _, w := range g[y] {
				if vis>>w&1 == 1 {
					continue
				}
				if v != w && label[v] == label[w] {
					r := dfs(min(v, w), max(v, w), vis|1<<v|1<<w)
					res = max(res, r+2)
				}
			}
		}
		return res
	}
	for x, to := range g {
		ans = max(ans, dfs(x, x, 1<<x)+1)
		if ans == n {
			return
		}
		for _, y := range to {
			if x < y && label[x] == label[y] {
				ans = max(ans, dfs(x, y, 1<<x|1<<y)+2)
				if ans == n {
					return
				}
			}
		}
	}
	return
}

func maximumSubarraySum(nums []int, k int) int64 {
	ans := math.MinInt
	preSum := 0
	// key是x value是最小前缀和
	minS := map[int]int{}
	for _, x := range nums {
		s, ok := minS[x-k]
		if ok {
			ans = max(ans, preSum+x-s)
		}
		s, ok = minS[x+k]
		if ok {
			ans = max(ans, preSum+x-s)
		}
		s, ok = minS[x]
		if !ok || preSum < s {
			minS[x] = preSum
		}
		preSum += x
	}
	if ans == math.MinInt {
		return 0
	}
	return int64(ans)
}

func maxNonOverlapping(nums []int, target int) (ans int) {
	prev := -1
	cnt := map[int]int{0: -1}
	s := 0
	for right, x := range nums {
		s += x
		if left, ok := cnt[s-target]; ok {
			if left >= prev {
				ans++
				prev = right
			}
		} else {
			cnt[s] = right
		}
	}
	return
}

func longestWPI(hours []int) (ans int) {
	n := len(hours)
	s := make([]int, n+1)
	st := []int{0}
	for j, h := range hours {
		j++
		s[j] = s[j-1]
		if h > 8 {
			s[j]++
		} else {
			s[j]--
		}
		if s[j] < s[st[len(st)-1]] {
			st = append(st, j)
		}
	}
	for i := n; i > 0; i-- {
		for len(st) > 0 && s[i] > s[st[len(st)-1]] {
			ans = max(ans, i-st[len(st)-1]+1)
			st = st[:len(st)-1]
		}
	}
	return
}

func maxSubarraySum222(nums []int, k int) int64 {
	n := len(nums)
	preSum := make([]int, n+1)
	for i, x := range nums {
		preSum[i+1] = preSum[i] + x
	}
	minS := make([]int, k)
	for i := range minS {
		minS[i] = math.MaxInt / 2
	}
	ans := math.MinInt
	for i, x := range preSum {
		j := i % k
		ans = max(ans, x-minS[j])
		minS[j] = min(minS[j], x)
	}
	return int64(ans)
}
func maxSubarraySum(nums []int, k int) int64 {
	minS := make([]int, k)
	for i := range minS {
		minS[i] = math.MaxInt / 2
	}
	minS[k-1] = 0
	s := 0
	ans := math.MinInt
	for i, x := range nums {
		s += x
		j := i % k
		ans = max(ans, s-minS[j])
		minS[j] = min(minS[j], s)
	}
	return int64(ans)
}

func countSubarrays111(nums []int, k int) (ans int) {
	n := len(nums)
	pos := slices.Index(nums, k)
	fmt.Println(pos)
	cnt := map[int]int{0: 1}
	preSum := 0
	for i := pos - 1; i >= 0; i-- {
		x := nums[i]
		if x < k {
			preSum++
		} else {
			preSum--
		}
		cnt[preSum]++
	}
	ans = cnt[0] + cnt[-1]
	preSum = 0
	for i := pos + 1; i < n; i++ {
		x := nums[i]
		if x < k {
			preSum--
		} else {
			preSum++
		}
		ans += cnt[preSum] + cnt[preSum-1]
	}
	return
}

func isValid(word string) bool {
	if len(word) < 3 {
		return false
	}
	// const aeiouMask = 1065233
	const aeiouMask = 1<<0 | 1<<4 | 1<<8 | 1<<14 | 1<<20
	var hasVowel, hasConsonant bool
	for _, ch := range word {
		if unicode.IsDigit(ch) || unicode.IsLetter(ch) {
			if unicode.IsLetter(ch) {
				if aeiouMask>>(unicode.ToLower(ch)-'a')&1 == 1 {
					hasVowel = true
				} else {
					hasConsonant = true
				}
			}
		} else {
			return false
		}
	}
	return hasConsonant && hasVowel
}

func countSubarrays(nums []int, k int) (ans int) {
	n := len(nums)
	pos := slices.Index(nums, k)
	cnt := map[int]int{0: 1}
	preSum := 0
	for i := pos - 1; i >= 0; i-- {
		x := nums[i]
		if x < k {
			preSum++
		} else {
			preSum--
		}
		cnt[preSum]++
	}
	ans = cnt[0] + cnt[-1]
	preSum = 0
	for i := pos + 1; i < n; i++ {
		x := nums[i]
		if x < k {
			preSum--
		} else {
			preSum++
		}
		ans += cnt[preSum] + cnt[preSum-1]
	}
	return
}
func minSubarray111(nums []int, p int) int {
	n := len(nums)
	s := make([]int, n+1)
	for i, x := range nums {
		s[i+1] = (s[i] + x) % p
	}
	x := s[n]
	if x == 0 {
		return 0
	}
	ans := n
	last := map[int]int{}
	for i, v := range s {
		last[v] = i
		if j, ok := last[((v-x)+p)%p]; ok {
			ans = min(ans, i-j)
		}
	}
	if ans < n {
		return ans
	}
	return -1
}
func minSubarray(nums []int, p int) int {
	n := len(nums)
	s := 0
	for _, x := range nums {
		s = (s + x) % p
	}
	if s == 0 {
		return 0
	}
	ans := n
	last := map[int]int{s: -1}
	preSum := 0
	for i, v := range nums {
		preSum += v
		last[preSum%p] = i
		if j, ok := last[((preSum-s)%p+p)%p]; ok {
			ans = min(ans, i-j)
		}
	}
	if ans < n {
		return ans
	}
	return -1
}

func countInterestingSubarrays111(nums []int, modulo int, k int) int64 {
	n := len(nums)
	preSum := make([]int, n+1)
	for i, x := range nums {
		preSum[i+1] = preSum[i]
		if x%modulo == k {
			preSum[i+1]++
		}
	}
	ans := 0
	// 这里必须得取min 看module的数据范围10^9就知道了
	cnt := make([]int, min(n+1, modulo))
	for _, s := range preSum {
		if s >= k {
			ans += cnt[(s-k)%modulo]
		}
		cnt[s%modulo]++
	}
	return int64(ans)
}

func countInterestingSubarrays(nums []int, modulo int, k int) int64 {
	n := len(nums)
	ans := 0
	// 这里必须得取min 看module的数据范围10^9就知道了
	cnt := make([]int, min(n+1, modulo))
	cnt[0] = 1
	preSum := 0
	for _, x := range nums {
		if x%modulo == k {
			preSum++
		}
		if preSum >= k {
			ans += cnt[(preSum-k)%modulo]
		}
		cnt[preSum%modulo]++
	}
	return int64(ans)
}

// 560. 和为 K 的子数组
func subarraySum(nums []int, k int) (ans int) {
	cnt := make(map[int]int, len(nums)) // 预分配空间
	s := 0
	for _, x := range nums {
		cnt[s]++
		s += x
		ans += cnt[s-k]
	}
	return
}

func numSubmatrixSumTarget(matrix [][]int, target int) (ans int) {
	n := len(matrix[0])
	for i := range matrix { // 上边界
		colSum := make([]int, n)
		for _, row := range matrix[i:] { // 下边界
			for j, x := range row {
				colSum[j] += x
			}
			ans += subarraySum(colSum, target)
		}
	}
	return
}

func countTriplets222(arr []int) (ans int) {
	n := len(arr)
	preXor := make([]int, n+1)
	for i, x := range arr {
		preXor[i+1] = preXor[i] ^ x
	}
	for i := 0; i < n; i++ {
		for k := i + 1; k < n; k++ {
			if preXor[i] == preXor[k+1] {
				ans += k - i
			}
		}
	}
	return
}

func countTriplets(arr []int) (ans int) {
	n := len(arr)
	for i := 0; i < n; i++ {
		xor := arr[i]
		for k := i + 1; k < n; k++ {
			xor ^= arr[k]
			if xor == 0 {
				ans += k - i
			}
		}
	}
	return
}
func canMakePaliQueries111(s string, queries [][]int) []bool {
	n := len(s)
	preSum := make([][26]int, n+1)
	for i, ch := range s {
		preSum[i+1] = preSum[i]
		preSum[i+1][ch-'a']++
	}
	ans := make([]bool, len(queries))
	for i, q := range queries {
		left, right, k, m := q[0], q[1], q[2], 0
		for j := 0; j < 26; j++ {
			m += (preSum[right+1][j] - preSum[left][j]) % 2
		}
		ans[i] = m/2 <= k
	}
	return ans
}
func canMakePaliQueries2222(s string, queries [][]int) []bool {
	n := len(s)
	preSum := make([][26]int, n+1)
	for i, ch := range s {
		preSum[i+1] = preSum[i]
		preSum[i+1][ch-'a']++
		preSum[i+1][ch-'a'] %= 2
	}
	ans := make([]bool, len(queries))
	for i, q := range queries {
		left, right, k, m := q[0], q[1], q[2], 0
		for j := 0; j < 26; j++ {
			if preSum[right+1][j] != preSum[left][j] {
				m++
			}
		}
		ans[i] = m/2 <= k
	}
	return ans
}
func canMakePaliQueries222(s string, queries [][]int) []bool {
	n := len(s)
	preSum := make([][26]int, n+1)
	for i, ch := range s {
		preSum[i+1] = preSum[i]
		preSum[i+1][ch-'a'] ^= 1
	}
	ans := make([]bool, len(queries))
	for i, q := range queries {
		left, right, k, m := q[0], q[1], q[2], 0
		for j := 0; j < 26; j++ {
			m += preSum[right+1][j] ^ preSum[left][j]
		}
		ans[i] = m/2 <= k
	}
	return ans
}

func canMakePaliQueries(s string, queries [][]int) []bool {
	n := len(s)
	preSum := make([]uint32, n+1)
	for i, ch := range s {
		bit := uint32(1) << (ch - 'a')
		preSum[i+1] = preSum[i] ^ bit
	}
	ans := make([]bool, len(queries))
	for i, q := range queries {
		left, right, k := q[0], q[1], q[2]
		m := bits.OnesCount32(preSum[right+1] ^ preSum[left])
		ans[i] = m/2 <= k
	}
	return ans
}
func wonderfulSubstrings(word string) int64 {
	const M = 1024
	// preSum[0]=1 所以这里0为1
	cnt := [M]int{1}
	s, ans := 0, 0
	for _, ch := range word {
		s ^= 1 << (ch - 'a')
		ans += cnt[s]
		for i := 1; i < M; i <<= 1 {
			ans += cnt[s^(i)]
		}
		cnt[s]++
	}
	return int64(ans)
}

func countPalindromePaths(parent []int, s string) int64 {
	n := len(parent)
	g := make([][]int, n)
	for i := 1; i < n; i++ {
		p := parent[i]
		g[p] = append(g[p], i)
	}

	ans := 0
	cnt := map[int]int{0: 1} // 一条「空路径」
	var dfs func(int, int)
	dfs = func(v, xor int) {
		for _, w := range g[v] {
			x := xor ^ (1 << (s[w] - 'a'))
			ans += cnt[x] // x ^ x = 0
			for i := 0; i < 26; i++ {
				ans += cnt[x^(1<<i)] // x ^ (x^(1<<i)) = 1<<i
			}
			cnt[x]++
			dfs(w, x)
		}
	}
	dfs(0, 0)
	return int64(ans)
}

func xorQueries(arr []int, queries [][]int) []int {
	n := len(arr)
	preXor := make([]int, n+1)
	for i, x := range arr {
		preXor[i+1] = preXor[i] ^ x
	}
	m := len(queries)
	ans := make([]int, m)
	for i, q := range queries {
		l, r := q[0], q[1]
		ans[i] = preXor[r+1] ^ preXor[l]
	}
	return ans
}

func maximumLength222(nums []int, k int) (ans int) {
	f := make([][]int, k)
	for i := range f {
		f[i] = make([]int, k)
	}
	for _, x := range nums {
		x %= k
		for y, fxy := range f[x] {
			f[y][x] = fxy + 1
			ans = max(ans, f[y][x])
		}
	}
	return
}

func maximumLength(nums []int, k int) (ans int) {
	f := make([]int, k)
	for m := 0; m < k; m++ {
		clear(f)
		for _, x := range nums {
			x %= k
			f[x] = f[((m-x)+k)%k] + 1
			ans = max(ans, f[x])
		}
	}
	return
}

var c25 [1001][2]int

func init222() {
	// 预处理：递推算出每个数的因子 2 的个数和因子 5 的个数
	for i := 2; i <= 1000; i++ {
		if i%2 == 0 {
			c25[i][0] = c25[i/2][0] + 1
		}
		if i%5 == 0 {
			c25[i][1] = c25[i/5][1] + 1
		}
	}
}

func maxTrailingZeros(grid [][]int) (ans int) {
	m, n := len(grid), len(grid[0])
	s := make([][][2]int, m)
	for i, row := range grid {
		s[i] = make([][2]int, n+1)
		for j, v := range row {
			s[i][j+1][0] = s[i][j][0] + c25[v][0] // 每行的因子 2 的前缀和
			s[i][j+1][1] = s[i][j][1] + c25[v][1] // 每行的因子 5 的前缀和
		}
	}

	for j := 0; j < n; j++ {
		s2, s5 := 0, 0
		for i, row := range grid { // 从上往下，枚举左拐还是右拐
			s2 += c25[row[j]][0]
			s5 += c25[row[j]][1]
			ans = max(ans, max(
				min(s2+s[i][j][0], s5+s[i][j][1]),
				min(s2+s[i][n][0]-s[i][j+1][0], s5+s[i][n][1]-s[i][j+1][1])))
		}
		s2, s5 = 0, 0
		for i := m - 1; i >= 0; i-- { // 从下往上，枚举左拐还是右拐
			s2 += c25[grid[i][j]][0]
			s5 += c25[grid[i][j]][1]
			ans = max(ans, max(min(s2+s[i][j][0], s5+s[i][j][1]),
				min(s2+s[i][n][0]-s[i][j+1][0], s5+s[i][n][1]-s[i][j+1][1])))
		}
	}
	return
}

func getSumAbsoluteDifferences(nums []int) []int {
	n := len(nums)
	leftSum, rightSum := 0, 0
	for _, x := range nums {
		rightSum += x
	}
	ans := make([]int, n)
	for i, x := range nums {
		rightSum -= x
		ans[i] = i*x - leftSum + rightSum - (n-i-1)*x
		leftSum += x
	}
	return ans
}

func distance(nums []int) []int64 {
	groups := map[int][]int{}
	for i, x := range nums {
		// 这里面的i是非递减的有序数组
		groups[x] = append(groups[x], i)
	}
	ans := make([]int64, len(nums))
	for _, a := range groups {
		leftSum, rightSum := 0, 0
		n := len(a)
		for _, x := range a {
			rightSum += x
		}
		for i, x := range a {
			rightSum -= x
			ans[x] += int64(i*x - leftSum + rightSum - (n-i-1)*x)
			leftSum += x
		}
	}
	return ans
}

func minOperations(nums []int, queries []int) []int64 {
	slices.Sort(nums)
	n := len(nums)
	s := make([]int, n+1)
	for i, x := range nums {
		s[i+1] = s[i] + x
	}
	m := len(queries)
	ans := make([]int64, m)
	for i, q := range queries {
		j := sort.SearchInts(nums, q)
		left := j*q - s[j]
		right := s[n] - s[j] - (n-j)*q
		ans[i] = int64(left + right)
	}
	return ans
}

func countOperationsToEmptyArray(nums []int) int64 {
	n := len(nums)
	idx := make([]int, n)
	for i := range idx {
		idx[i] = i
	}
	// 按照nums从小到大的顺序排序
	slices.SortFunc(idx, func(i, j int) int { return nums[i] - nums[j] })
	ans := n
	// 从1开始
	for k := 1; k < n; k++ {
		if idx[k] < idx[k-1] {
			// 必须多走一整圈
			ans += n - k // 减去前面删除的元素个数
		}
	}
	return int64(ans)
}

func predictPartyVictory(senate string) string {
	rQueue, dQueue := []int{}, []int{}
	n := len(senate)

	for i, c := range senate {
		if c == 'R' {
			rQueue = append(rQueue, i)
		} else {
			dQueue = append(dQueue, i)
		}
	}

	for len(rQueue) > 0 && len(dQueue) > 0 {
		rFront, dFront := rQueue[0], dQueue[0]
		rQueue, dQueue = rQueue[1:], dQueue[1:]
		// 序号一直递增呗
		if rFront < dFront {
			rQueue = append(rQueue, rFront+n)
		} else {
			dQueue = append(dQueue, dFront+n)
		}
	}

	if len(rQueue) > 0 {
		return "Radiant"
	} else {
		return "Dire"
	}
}

func getSubarrayBeauty(nums []int, k int, x int) []int {
	const BASE = 50
	// 数据范围小 用数组当map
	cnt := [BASE*2 + 1]int{}
	n := len(nums)
	ans := make([]int, n-k+1)
	for right, num := range nums {
		cnt[num+BASE]++
		if right < k-1 {
			continue
		}
		// x为第几小
		d := x
		for i, c := range cnt[:BASE] {
			if d <= c {
				ans[right-k+1] = i - BASE
				break
			}
			d -= c
		}
		cnt[nums[right-k+1]+BASE]--
	}
	return ans
}
func mergeSort(arr []int, diff int) int64 {
	if len(arr) <= 1 {
		return 0
	}
	mid := len(arr) >> 1
	// 这里必须得复制
	a := make([]int, mid)
	b := make([]int, len(arr)-mid)
	copy(a, arr[:mid])
	copy(b, arr[mid:])
	cnt := mergeSort(a, diff) + mergeSort(b, diff)
	i, n := 0, len(a)
	for _, x := range b {
		for i < n && a[i] <= x+diff {
			i++
		}
		cnt += int64(i)
	}
	i, j, cur, m := 0, 0, 0, len(b)
	for i < n || j < m {
		if i == n {
			arr = append(arr, b[j:]...)
		} else if j == m {
			arr = append(arr, a[i:]...)
		} else if a[i] < b[j] {
			arr[cur] = a[i]
			cur++
			i++
		} else {
			arr[cur] = b[j]
			cur++
			j++
		}
	}
	return cnt
}
func numberOfPairs(nums1 []int, nums2 []int, diff int) int64 {
	a := make([]int, len(nums1))
	for i := range nums1 {
		a[i] = nums1[i] - nums2[i]
	}
	return mergeSort(a, diff)
}

func eraseOverlapIntervals(intervals [][]int) int {
	// 按照右端点从小到大排序
	slices.SortFunc(intervals, func(a, b []int) int { return a[1] - b[1] })
	fmt.Println(intervals)
	preR := math.MinInt
	cnt := 0
	for _, item := range intervals {
		if item[1] >= preR {
			cnt++
			preR = item[1]
		}
	}
	return len(intervals) - cnt
}

func findLongestChain(pairs [][]int) (cnt int) {
	// 按照右端点从小到大排序
	slices.SortFunc(pairs, func(a, b []int) int { return a[1] - b[1] })
	preR := math.MinInt
	for _, item := range pairs {
		// 当前左端点比上一次右端点要大
		if item[0] > preR {
			cnt++
			preR = item[1]
		}
	}
	return
}

func maxNumOfSubstrings1(s string) (ans []string) {
	type pair struct{ left, right int }
	cnt := map[rune]pair{}
	for i, ch := range s {
		// cnt[ch-'a'] = i
		if item, ok := cnt[ch]; ok {
			item.right = i
			cnt[ch] = item
		} else {
			cnt[ch] = pair{left: i, right: i}
		}
	}
	arr := [26][]int{}
	for key, v := range cnt {
		arr[key-'a'] = []int{v.left, v.right}
	}
	// 过滤 nil 切片
	filtered := make([][]int, 0, len(arr))
	for _, v := range arr {
		if v != nil {
			filtered = append(filtered, v)
		}
	}
	// 按照右端点从小到大排序
	slices.SortFunc(filtered[:], func(a, b []int) int { return a[1] - b[1] })
	preR := math.MinInt

	for _, item := range filtered {
		// 当前左端点比上一次右端点要大
		if item[0] > preR {
			l, r := item[0], item[1]
			ans = append(ans, s[l:r+1])
			fmt.Println(item)
			preR = item[1]
		}
	}
	// 使用 slices.SortFunc 按字符串长度排序
	slices.SortFunc(ans, func(a, b string) int {
		return len(a) - len(b)
	})
	return
}

func maxNumOfSubstrings222(s string) (ans []string) {
	// 记录每种字母的出现位置
	pos := [26][]int{}
	for i, b := range s {
		b -= 'a'
		pos[b] = append(pos[b], i)
	}

	// 构建有向图
	g := [26][]int{}
	for i, p := range pos {
		if p == nil {
			continue
		}
		l, r := p[0], p[len(p)-1]
		for j, q := range pos {
			if j == i {
				continue
			}
			k := sort.SearchInts(q, l)
			// [l,r] 包含第 j 个小写字母
			if k < len(q) && q[k] <= r {
				g[i] = append(g[i], j)
			}
		}
	}

	// 遍历有向图
	vis := [26]bool{}
	var l, r int
	var dfs func(int)
	dfs = func(x int) {
		vis[x] = true
		p := pos[x]
		l = min(l, p[0]) // 合并区间
		r = max(r, p[len(p)-1])
		for _, y := range g[x] {
			if !vis[y] {
				dfs(y)
			}
		}
	}

	type pair struct{ l, r int }
	intervals := []pair{}
	for i, p := range pos {
		if p == nil {
			continue
		}
		// 如果要包含第 i 个小写字母，最终得到的区间是什么？
		vis = [26]bool{}
		l, r = len(s), 0
		dfs(i)
		intervals = append(intervals, pair{l, r})
	}

	// 435. 无重叠区间
	// 直接计算最多能选多少个区间
	slices.SortFunc(intervals, func(a, b pair) int { return a.r - b.r })
	preR := -1
	for _, p := range intervals {
		if p.l > preR {
			ans = append(ans, s[p.l:p.r+1])
			preR = p.r
		}
	}
	return
}

func maxNumOfSubstrings(s string) (ans []string) {
	// 记录每种字母的出现位置
	pos := [26][]int{}
	for i, b := range s {
		b -= 'a'
		pos[b] = append(pos[b], i)
	}
	// 构建有向图
	g := [26][]int{}
	for i, p := range pos {
		if p == nil {
			continue
		}
		l, r := p[0], p[len(p)-1]
		// 这是一个双重循环
		for j, q := range pos {
			if j == i {
				continue
			}
			k := sort.SearchInts(q, l)
			if k < len(q) && q[k] <= r {
				g[i] = append(g[i], j)
			}
		}
	}
	// 遍历有向图
	vis := [26]bool{}
	var l, r int
	var dfs func(int)
	dfs = func(x int) {
		vis[x] = true
		p := pos[x]
		l = min(l, p[0])
		r = max(r, p[len(p)-1])
		for _, y := range g[x] {
			if !vis[y] {
				dfs(y)
			}
		}
	}
	type pair struct{ l, r int }
	intervals := []pair{}
	for i, p := range pos {
		if p == nil {
			continue
		}
		vis = [26]bool{}
		l, r = len(s), 0
		dfs(i)
		intervals = append(intervals, pair{l, r})
	}
	// 按照右端点从小到大排序
	slices.SortFunc(intervals, func(a, b pair) int { return a.r - b.r })
	preR := math.MinInt
	for _, item := range intervals {
		// 当前左端点比上一次右端点要大
		if item.l > preR {
			ans = append(ans, s[item.l:item.r+1])
			preR = item.r
		}
	}
	return
}
