package a0612

import (
	"fmt"
	"math"
	"math/bits"
	"slices"
	"strconv"
	"strings"
	"unicode"
)

func findTargetSumWays(nums []int, target int) int {
	fmt.Println(target)
	s := 0
	for _, x := range nums {
		s += x
	}
	s -= abs(target)
	if s < 0 || s%2 == 1 {
		return 0
	}
	m := s / 2
	dp := make([]int, m+1)
	dp[0] = 1
	for _, x := range nums {
		for c := m; c >= x; c-- {
			dp[c] = dp[c] + dp[c-x]
		}
	}
	return dp[m]
}
func checkEqualPartitions(nums []int, target int64) bool {
	n := len(nums)
	t := int(target)
	for mask := 1; mask < 1<<n; mask++ {
		part1, part2 := 1, 1
		for j, x := range nums {
			if mask>>j&1 == 1 {
				part1 *= x
			} else {
				part2 *= x
			}
		}
		if part1 == t && part2 == t {
			return true
		}
	}
	return false
}
func perfectMenu(materials []int, cookbooks [][]int, attribute [][]int, limit int) (ans int) {
	n := len(cookbooks)
	for mask := 1; mask < 1<<n; mask++ {
		curX, curY := 0, 0
		curMater := slices.Clone(materials)
		for j, item := range cookbooks {
			if mask>>j&1 == 1 {
				valid := true
				for k, need := range item {
					if need > curMater[k] {
						valid = false
						break
					}
					curMater[k] -= need
				}
				if valid {
					curX += attribute[j][0]
					curY += attribute[j][1]
				}
			}
		}
		if curY >= limit {
			ans = max(ans, curX)
		}
	}
	return
}

func maximumRows(matrix [][]int, numSelect int) (ans int) {
	ans = -1
	m, n := len(matrix), len(matrix[0])
	rows := make([]int, m)
	for i, row := range matrix {
		for j, col := range row {
			rows[i] |= col << j
		}
	}
	for mask := 1; mask < 1<<n; mask++ {
		if bits.OnesCount(uint(mask)) == numSelect {
			cnt := 0
			for _, row := range rows {
				if row&mask == row {
					cnt++
				}
			}
			ans = max(ans, cnt)
		}
	}
	return
}
func maxLength(arr []string) (ans int) {
	n := len(arr)
	for mask := 1; mask < 1<<n; mask++ {
		vis := 0
		valid := true
		curLen := 0
		for j, word := range arr {
			copyVis := vis
			if mask>>j&1 == 1 {
				for _, ch := range word {
					index := ch - 'a'
					if copyVis>>index&1 == 1 {
						valid = false
						break
					}
					copyVis |= 1 << index
				}
				if valid {
					curLen += len(word)
					vis = copyVis
				}
			}
		}
		ans = max(ans, curLen)
	}
	return
}
func maximumBobPoints(numArrows int, aliceArrows []int) (ans []int) {
	n := len(aliceArrows)
	maxScore := -1
	for mask := 1; mask < 1<<n; mask++ {
		score, arrow, bobArrows := 0, 0, make([]int, n)
		for j, v := range aliceArrows {
			if mask>>j&1 == 1 {
				score += j
				arrow += v + 1
				bobArrows[j] += v + 1
			}
		}
		if arrow > numArrows {
			continue
		}
		if score > maxScore {
			maxScore = score
			bobArrows[0] += numArrows - arrow
			ans = bobArrows[:]
		}
	}
	return
}

func maximumGood(statements [][]int) (ans int) {
	n := len(statements)
next:
	for mask := 1; mask < 1<<n; mask++ {
		cnt := 0
		for j, row := range statements {
			if mask>>j&1 == 1 {
				for k, st := range row {
					if st < 2 && mask>>k&1 != st {
						continue next
					}
				}
				cnt++
			}
		}
		if cnt > ans {
			ans = cnt
		}
	}
	return ans
}
func climbStairs0(n int) int {
	memo := make([]int, n+1)
	var dfs func(int) int
	dfs = func(i int) (res int) {
		if i <= 1 {
			return 0
		}
		p := &memo[i]
		if *p != 0 {
			return *p
		}
		defer func() {
			*p = res
		}()
		return dfs(i-1) + dfs(i-2)
	}
	return dfs(n)
}
func climbStairs01(n int) int {
	dp := make([]int, n+2)
	dp[0] = 1
	dp[1] = 1
	for i := 2; i <= n; i++ {
		dp[i] = dp[i-1] + dp[i-2]
	}
	return dp[n]
}
func climbStairs34(n int) int {
	f0, f1 := 1, 1
	for i := 2; i <= n; i++ {
		f0, f1 = f1, f0+f1
	}
	return f1
}

func minCostClimbingStairs00(cost []int) int {
	n := len(cost)
	memo := make([]int, n+1)
	for i := range memo {
		memo[i] = -1
	}
	var dfs func(int) int
	dfs = func(i int) (res int) {
		if i <= 1 {
			return 0
		}
		p := &memo[i]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		return min(dfs(i-2)+cost[i-2], dfs(i-1)+cost[i-1])
	}
	return dfs(n)
}
func minCostClimbingStairs02(cost []int) int {
	n := len(cost)
	dp := make([]int, n+1)
	// dp[0]=dp[1]=0  相当于初始值为0
	for i := 2; i <= n; i++ {
		dp[i] = min(dp[i-2]+cost[i-2], dp[i-1]+cost[i-1])
	}
	return dp[n]
}
func minCostClimbingStairs(cost []int) int {
	n := len(cost)
	f0, f1 := 0, 0
	// dp[0]=dp[1]=0  相当于初始值为0
	for i := 0; i < n; i++ {
		// dp[i] = min(dp[i-2]+cost[i-2], dp[i-1]+cost[i-1])
		f0, f1 = f1, min(f0+cost[i-1], f1+cost[i])
	}
	return f1
}
func climbStairs(n int) int {
	nums := []int{1, 2}
	memo := make([]int, n+1)
	for i := range memo {
		memo[i] = -1
	}
	var dfs func(int) int
	dfs = func(i int) (res int) {
		// 到0位置了  算一种方案
		if i == 0 {
			return 1
		}
		p := &memo[i]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		for _, x := range nums {
			if x <= i {
				res += dfs(i - x)
			}
		}
		return
	}
	return dfs(n)
}
func combinationSum443(nums []int, target int) int {
	memo := make([]int, target+1)
	for i := range memo {
		memo[i] = -1
	}
	var dfs func(int) int
	dfs = func(i int) (res int) {
		// 到0位置了  算一种方案
		if i == 0 {
			return 1
		}
		p := &memo[i]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		for _, x := range nums {
			if x <= i {
				res += dfs(i - x)
			}
		}
		return
	}
	return dfs(target)
}
func combinationSum4(nums []int, target int) int {
	dp := make([]int, target+1)
	dp[0] = 1
	for i := 1; i <= target; i++ {
		for _, x := range nums {
			if x <= i {
				dp[i] += dp[i-x]
			}
		}
	}
	return dp[target]
}

/* const mod = 1_000_000_007
const mx = 100_001

var f = [mx]int{1, 1, 2, 4}
var g = f

func init() {
	for i := 4; i < mx; i++ {
		f[i] = (f[i-1] + f[i-2] + f[i-3]) % mod
		g[i] = (g[i-1] + g[i-2] + g[i-3] + g[i-4]) % mod
	}
} */

/* func countTexts(s string) int {
	ans, cnt := 1, 0
	for i, c := range s {
		cnt++
		if i == len(s)-1 || byte(c) != s[i+1] {
			if c != '7' && c != '9' {
				ans = ans * f[cnt] % mod
			} else {
				ans = ans * g[cnt] % mod
			}
			cnt = 0
		}
	}
	return ans
} */

func rob00(nums []int) int {
	n := len(nums)
	memo := make([]int, n)
	for i := range memo {
		memo[i] = -1
	}
	var dfs func(int) int
	dfs = func(i int) (res int) {
		if i < 0 {
			return 0
		}
		p := &memo[i]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		return max(dfs(i-1), dfs(i-2)+nums[i])
	}
	return dfs(n - 1)
}
func rob01(nums []int) int {
	n := len(nums)
	dp := make([]int, n+2)
	for i, x := range nums {
		dp[i+2] = max(dp[i+1], dp[i]+x)
	}
	return dp[n+1]
}

func rob(nums []int) int {
	// 要不我抢劫0号房屋  然后是[2,n-1)
	// 要不我不抢0号房屋  然后是[1,n)
	n := len(nums)
	if n <= 2 {
		return slices.Max(nums)
	}
	return max(rob02(nums[2:n-1])+nums[0], rob02(nums[1:n]))
}

const mx = 10_001
const mod = 1_000_000_007

var f = [mx]int{1, 2}

func init() {
	for i := 2; i < mx; i++ {
		f[i] = (f[i-1] + f[i-2]) % mod
	}
}
func countHousePlacements(n int) int {
	return (f[n] * f[n]) % mod
}
func rob02(nums []int) int {
	f0, f1 := 0, 0
	for _, x := range nums {
		f0, f1 = f1, max(f1, f0+x)
	}
	return f1
}
func deleteAndEarn(nums []int) int {
	mx := slices.Max(nums)
	a := make([]int, mx+1)
	for _, x := range nums {
		a[x] += x
	}
	return rob02(a)
}
func maximumTotalDamage01(power []int) int64 {
	cnt := map[int]int{}
	for _, x := range power {
		cnt[x]++
	}
	n := len(cnt)
	a := make([]int, 0, n)
	for key := range cnt {
		a = append(a, key)
	}
	slices.Sort(a)
	memo := make([]int, n)
	for i := range memo {
		memo[i] = -1
	}
	var dfs func(int) int
	dfs = func(i int) (res int) {
		if i < 0 {
			return 0
		}
		p := &memo[i]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		x := a[i]
		j := i
		for j > 0 && a[j-1] >= x-2 {
			j--
		}
		return max(dfs(i-1), dfs(j-1)+x*cnt[x])
	}
	return int64(dfs(n - 1))
}

func maximumTotalDamage(power []int) int64 {
	cnt := map[int]int{}
	for _, x := range power {
		cnt[x]++
	}
	n := len(cnt)
	a := make([]int, 0, n)
	for key := range cnt {
		a = append(a, key)
	}
	slices.Sort(a)
	dp := make([]int, n+1)
	j := 0
	for i, x := range a {
		for j < n && a[j] < x-2 {
			j++
		}
		dp[i+1] = max(dp[i], dp[j]+x*cnt[x])
	}
	return int64(dp[n])
}
func mostPoints00(questions [][]int) int64 {
	n := len(questions)
	memo := make([]int, n)
	/* 	for i:=range memo{
		memo[i]=-1
	} */
	var dfs func(int) int
	dfs = func(i int) (res int) {
		if i >= n {
			return 0
		}
		p := &memo[i]
		if *p != 0 {
			return *p
		}
		defer func() {
			*p = res
		}()
		return max(dfs(i+1), dfs(i+questions[i][1]+1)+questions[i][0])
	}
	return int64(dfs(0))
}
func mostPoints(questions [][]int) int64 {
	n := len(questions)
	dp := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		// return max(dfs(i+1), dfs(i+questions[i][1]+1)+questions[i][0])
		j := max(i+questions[i][1]+1, n)
		dp[i] = max(dp[i+1], dp[j]+questions[i][0])
	}
	return int64(dp[0])
}
func maxSubArray00(nums []int) (ans int) {
	n := len(nums)
	dp := make([]int, n)
	dp[0] = nums[0]
	ans = nums[0]
	for i := 1; i < n; i++ {
		dp[i] = max(dp[i-1], 0) + nums[i]
		ans = max(ans, dp[i])
	}
	return
}

func maximumCostSubstring(s string, chars string, vals []int) (ans int) {
	n := len(s)
	cnt := [26]int{}
	for i := range cnt {
		cnt[i] = i + 1
	}
	for i, ch := range chars {
		index := ch - 'a'
		cnt[index] = vals[i]
	}
	f0 := 0
	for i := 0; i < n; i++ {
		f0 = max(f0, 0) + cnt[s[i]-'a']
		ans = max(ans, f0)
	}
	return
}
func minMaxDifference(num int) int {
	str := strconv.Itoa(num)
	mx := num
	for _, ch := range str {
		if ch != '9' {
			mx, _ = strconv.Atoi(strings.ReplaceAll(str, string(ch), "9"))
			break
		}
	}
	mn, _ := strconv.Atoi(strings.ReplaceAll(str, string(str[0]), "0"))
	return mx - mn
}
func minOperations(s, t string) int {
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
func maxAbsoluteSum(nums []int) (ans int) {
	var fMax, fMin int
	for _, x := range nums {
		fMax = max(fMax, 0) + x
		fMin = min(fMin, 0) + x
		ans = max(ans, fMax, -fMin)
	}
	return
}
func maxSubArray22(nums []int) (ans int) {
	n := len(nums)
	f0 := nums[0]
	ans = f0
	for i := 1; i < n; i++ {
		f0 = max(f0, 0) + nums[i]
		ans = max(ans, f0)
	}
	return
}
func maxSubArray(nums []int) (ans int) {
	f0 := 0
	for _, x := range nums {
		f0 = max(f0, 0) + x
		ans = max(ans, f0)
	}
	return
}
func kConcatenationMaxSum(arr []int, k int) (ans int) {
	if k == 1 {
		return maxSubArray(arr)
	}
	ans = maxSubArray(append(arr, arr...))
	const mod = 1e9 + 7
	s := 0
	for _, x := range arr {
		s += x
	}
	return (ans + (max(s, 0) * (k - 2))) % mod
}

func maxSubarraySumCircular(nums []int) int {
	mxS := math.MinInt
	mnS := 0
	var mxF, mnF, s int
	for _, x := range nums {
		mxF = max(mxF, 0) + x
		mxS = max(mxF, mxS)

		mnF = min(mnF, 0) + x
		mnS = min(mnS, mnF)
		s += x
	}
	if mnS == s {
		return mxS
	}
	return max(mxS, s-mnS)
}
func maxDiff(num int) int {
	s := strconv.Itoa(num)
	replaceNum := func(old rune, new string) int {
		t := strings.ReplaceAll(s, string(old), new)
		x, _ := strconv.Atoi(t)
		return x
	}
	mx := num
	for _, ch := range s {
		if ch != '9' {
			mx = replaceNum(ch, "9")
			break
		}
	}
	mn := num
	for i, ch := range s {
		if i == 0 && ch != '1' {
			mn = replaceNum(ch, "1")
			break
		} else if ch != '0' && ch != '1' {
			mn = replaceNum(ch, "0")
			break
		}
	}
	return mx - mn
}

func maximumsSplicedArray(nums1 []int, nums2 []int) int {
	handler := func(a []int, b []int) int {
		sum := 0
		maxSum, f0 := 0, 0
		for i, x := range b {
			f0 = max(f0, 0) + x - a[i]
			maxSum = max(maxSum, f0)
			sum += a[i]
		}
		return sum + maxSum
	}
	return max(handler(nums1, nums2), handler(nums2, nums1))
}
func maxProduct(nums []int) (ans int) {
	mx, mn := 1, 1
	ans = math.MinInt
	for _, x := range nums {
		mx, mn = max(mx, mx*x, mn*x), min(mn, mn*x, mx*x)
		ans = max(ans, mx)
	}
	return
}

func countPathsWithXorValue(grid [][]int, k int) int {
	m, n := len(grid), len(grid[0])
	mx := 0
	for _, rows := range grid {
		mx = max(mx, slices.Max(rows))
	}
	u := 1 << bits.Len(uint(mx))
	if u < k {
		return 0
	}
	memo := make([][][]int, m)
	for i := range memo {
		memo[i] = make([][]int, n)
		for j := range memo[i] {
			memo[i][j] = make([]int, u)
			for k := range memo[i][j] {
				memo[i][j][k] = -1
			}
		}
	}
	const mod = 1_000_000_007
	var dfs func(int, int, int) int
	dfs = func(i, j, x int) (res int) {
		if i < 0 || j < 0 {
			return 0
		}
		val := grid[i][j]
		if i == 0 && j == 0 {
			if x == val {
				return 1
			}
			return 0
		}
		p := &memo[i][j][k]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		return (dfs(i-1, j, x^val) + dfs(i, j-1, x^val)) % mod
	}
	return dfs(m-1, n-1, k)
}
func minPathSum11(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	memo := make([][]int, m)
	for i := range memo {
		memo[i] = make([]int, n)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int) int
	dfs = func(i, j int) (res int) {
		if i < 0 || j < 0 {
			return math.MaxInt / 2
		}
		if i == 0 && j == 0 {
			return grid[0][0]
		}
		p := &memo[i][j]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		val := grid[i][j]
		return min(dfs(i-1, j), dfs(i, j-1)) + val
	}
	return dfs(m-1, n-1)
}
func minPathSum2(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	f := make([][]int, m+1)
	for i := range f {
		f[i] = make([]int, n+1)
	}
	for j := range f[0] {
		f[0][j] = math.MaxInt
	}
	for i, rows := range grid {
		f[i+1][0] = math.MaxInt
		for j, col := range rows {
			if i == 0 && j == 0 {
				f[1][1] = grid[0][0]
			} else {
				f[i+1][j+1] = min(f[i][j+1], f[i+1][j]) + col
			}
		}
	}
	return f[m][n]
}
func minPathSum22(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	f := make([][]int, m+1)
	for i := range f {
		f[i] = make([]int, n+1)
	}
	for j := 2; j <= n; j++ {
		f[0][j] = math.MaxInt
	}
	for i, rows := range grid {
		f[i+1][0] = math.MaxInt
		for j, col := range rows {
			if i == 0 && j == 0 {
				f[1][1] = grid[0][0]
			} else {
				f[i+1][j+1] = min(f[i][j+1], f[i+1][j]) + col
			}
		}
	}
	return f[m][n]
}
func minPathSum(grid [][]int) int {
	_, n := len(grid), len(grid[0])
	f := make([]int, n+1)
	for j := range f {
		f[j] = math.MaxInt
	}
	f[1] = 0
	for _, rows := range grid {
		for j, col := range rows {

			f[j+1] = min(f[j+1], f[j]) + col
		}
	}
	return f[n]
}
func generateTag(caption string) string {
	ans := []string{}
	strs := strings.Split(caption, " ")
	isFirst := true
	for _, s := range strs {
		if len(s) < 1 {
			continue
		}
		tmp := []byte{}
		for i, ch := range s {
			if i == 0 {
				if isFirst {
					tmp = append(tmp, byte(unicode.ToLower(ch)))
				} else {
					tmp = append(tmp, byte(unicode.ToUpper(ch)))
				}
				isFirst = false
			} else {
				tmp = append(tmp, byte(unicode.ToLower(ch)))
			}
		}
		ans = append(ans, string(tmp))
	}
	aaa := strings.Join(ans, "")
	return "#" + aaa[0:min(len(aaa), 99)]
}
func specialTriplets222(nums []int) (ans int) {
	n := len(nums)
	const mod = 1_000_000_007
	cnt := map[int]int{}
	for _, x := range nums {
		cnt[x]++
	}
	preCnt := map[int]int{}
	for j, x := range nums[:n-1] {
		cnt[x]--
		if preCnt[2*x] > 0 && cnt[2*x]-preCnt[2*x] > 0 {
			right := cnt[2*x] - preCnt[2*x]
			fmt.Println(j, right, max(preCnt[2*x], right))
			ans = ans + (max(preCnt[2*x], right))%mod
		}
		preCnt[x]++
		cnt[x]++
	}
	return
}
func specialTriplets222(nums []int) (ans int) {
	n := len(nums)
	const mod = 1_000_000_007
	suffixCnt := map[int]map[int]int{}
	suffixCnt[n-1] = map[int]int{}
	for j := n - 1; j >= 0; j-- {
		x := nums[j]
		if suffixCnt[j] == nil {
			suffixCnt[j] = map[int]int{}
			for k, v := range suffixCnt[j+1] {
				suffixCnt[j][k] = v
			}
		}
		suffixCnt[j][x]++
	}
	preCnt := map[int]int{}
	for i, x := range nums[:n-1] {
		if preCnt[2*x] > 0 && suffixCnt[i+1][2*x] > 0 {
			right := suffixCnt[i+1][2*x]
			// fmt.Println(j, right, max(preCnt[2*x], right))
			ans = ans + (max(preCnt[2*x], right))%mod
		}
		preCnt[x]++
	}
	return
}
func abs(a int) int {
	if a > 0 {
		return a
	}
	return -a
}
func maximumProduct111(nums []int, m int) int64 {
	n := len(nums)
	if n == 1 {
		return int64(nums[0])
	}
	if n == 2 {
		return int64(nums[0] * nums[1])
	}
	slices.Sort(nums)
	/* preProd := make([]int, n)
	preProd[0] = nums[0]
	for i := 1; i < n; i++ {
		preProd[i] = preProd[i-1] * nums[i]
	}
	sufixProd := make([]int, n)
	sufixProd[n-1] = nums[n-1]
	for i := n - 2; i >= 0; i-- {
		sufixProd[i] = sufixProd[i+1] * nums[i]
	} */
	fmt.Println(nums)
	ans := 0
	for i := 0; i < m; i++ {
		if i == 0 {
			// 只取右边
			suffix := nums[n-m:]
			ans = max(ans, suffix[0]*suffix[len(suffix)-1])
		} else {
			// 左边i个  右边m-i个
			prefix := nums[0:i]
			suffix := nums[n-m+i:]
			ans = max(ans, prefix[0]*suffix[len(suffix)-1])
		}
	}
	return int64(ans)
}

func maximumProduct(nums []int, m int) int64 {
	ans := 0
	dpMn := make([]int, m+1)
	dpMn[0] = 1
	dpMx := make([]int, m+1)
	dpMx[0] = 1
	for j := 0; j < m; j++ {
		for _, x := range nums {
			dpMn[j+1] = min(dpMn[j]*x, x)
			dpMx[j+1] = max(dpMx[j]*x, x)
		}
	}
	fmt.Println(dpMn, dpMx)
	ans = dpMn[m] * dpMx[m]
	return int64(ans)
}

func specialTriplets(nums []int) (ans int) {
	n := len(nums)
	const mod = 1_000_000_007
	cnt := map[int]int{}
	for _, x := range nums {
		cnt[x]++
	}
	preCnt := map[int]int{}
	for _, x := range nums[:n-1] {
		cnt[x]--
		if preCnt[2*x] > 0 && cnt[2*x]-preCnt[2*x] > 0 {
			right := cnt[2*x] - preCnt[2*x]
			// fmt.Println(j, right, max(preCnt[2*x], right))
			ans = (ans + ((preCnt[2*x] * right) % mod)) % mod
		}
		preCnt[x]++
		cnt[x]++
	}
	return ans % mod
}
