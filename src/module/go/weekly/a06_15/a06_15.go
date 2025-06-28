package a0615

import (
	"fmt"
	"maps"
	"math"
	"math/bits"
	"slices"
	"sort"
	"strings"
)

func generateTag(caption string) string {
	ans := []byte{'#'}
	for i, s := range strings.Fields(caption) {
		s := strings.ToLower(s)
		if i > 0 {
			s = strings.Title(s)
		}
		ans = append(ans, s...)
		if len(ans) > 100 {
			ans = ans[:100]
			break
		}
	}
	return string(ans)
}

func specialTriplets(nums []int) (ans int) {
	const mod = 1_000_000_007
	suffix := map[int]int{}
	for _, x := range nums {
		suffix[x]++
	}
	prefix := map[int]int{}
	for _, x := range nums {
		suffix[x]--
		if prefix[2*x] > 0 && suffix[2*x] > 0 {
			ans = (ans + (prefix[2*x]*suffix[2*x])%mod) % mod
		}
		prefix[x]++
	}
	return
}
func maximumProduct(nums []int, m int) int64 {
	ans := math.MinInt
	n := len(nums)
	mn, mx := math.MaxInt, math.MinInt
	for i := m - 1; i < n; i++ {
		y := nums[i-m+1]
		mx = max(mx, y)
		mn = min(mn, y)

		x := nums[i]
		ans = max(ans, x*mn, x*mx)
	}
	return int64(ans)
}
func uniquePathsWithObstacles123(obstacleGrid [][]int) int {
	m, n := len(obstacleGrid), len(obstacleGrid[0])
	if obstacleGrid[0][0] == 1 || obstacleGrid[m-1][n-1] == 1 {
		return 0
	}
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
			return 0
		}
		if i == 0 && j == 0 {
			return 1
		}
		if obstacleGrid[i][j] == 1 {
			return 0
		}
		p := &memo[i][j]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		return dfs(i-1, j) + dfs(i, j-1)
	}
	return dfs(m-1, n-1)
}
func uniquePathsWithObstacles22(obstacleGrid [][]int) int {
	m, n := len(obstacleGrid), len(obstacleGrid[0])
	if obstacleGrid[0][0] == 1 || obstacleGrid[m-1][n-1] == 1 {
		return 0
	}
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}
	for j := range dp[0] {
		dp[0][j] = 0
	}
	for i, rows := range obstacleGrid {
		dp[i][0] = 0
		for j, col := range rows {
			if i == 0 && j == 0 {
				dp[1][1] = 1
			} else if col == 1 {
				dp[i+1][j+1] = 0
			} else {
				dp[i+1][j+1] = dp[i+1][j] + dp[i][j+1]
			}
		}
	}
	return dp[m+1][n+1]
}
func uniquePathsWithObstacles222(obstacleGrid [][]int) int {
	m, n := len(obstacleGrid), len(obstacleGrid[0])
	if obstacleGrid[0][0] == 1 || obstacleGrid[m-1][n-1] == 1 {
		return 0
	}

	dp := make([]int, n+1)
	for j := range dp[0] {
		dp[j] = 0
	}
	dp[0] = 1
	for _, rows := range obstacleGrid {
		for j, col := range rows {
			if col == 1 {
				dp[j+1] = 0
			} else {
				dp[j+1] = dp[j] + dp[j+1]
			}
		}
	}
	return dp[n+1]
}
func uniquePathsWithObstacles(obstacleGrid [][]int) int {
	n := len(obstacleGrid[0])

	dp := make([]int, n+1)
	for j := range dp[0] {
		dp[j] = 0
	}
	dp[1] = 1
	for _, rows := range obstacleGrid {
		for j, col := range rows {
			if col == 0 {
				dp[j+1] = dp[j] + dp[j+1]
			}
		}
	}
	return dp[n]
}
func uniquePaths1(m int, n int) int {
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
			return 0
		}
		if i == 0 && j == 0 {
			return 1
		}
		p := &memo[i][j]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		return dfs(i-1, j) + dfs(i, j-1)
	}
	return dfs(m-1, n-1)
}
func uniquePaths23(m int, n int) int {
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}
	dp[1][0] = 1
	for i := range m {
		for j := range n {
			dp[i+1][j+1] = dp[i][j+1] + dp[i+1][j]
		}
	}
	return dp[m][n]
}
func uniquePaths(m int, n int) int {
	dp := make([]int, n+1)
	dp[1] = 1
	for i := 0; i < m; i++ {
		for j := range n {
			dp[j+1] = dp[j+1] + dp[j]
		}
	}
	return dp[n]
}
func minPathSum22(grid [][]int) int {
	n := len(grid[0])
	f := make([]int, n+1)
	for _, rows := range grid {
		f[0] = math.MaxInt
		for j, col := range rows {
			f[j+1] = min(f[j+1], f[j]) + col
		}
	}
	return f[n]
}
func minPathSum43(grid [][]int) int {
	n := len(grid[0])
	f := make([]int, n+1)
	for j := 2; j <= n; j++ {
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

func minimumTotal11(triangle [][]int) int {
	m := len(triangle)
	for i := m - 2; i >= 0; i-- {
		// 从倒数第2行的位置开始
		for j, x := range triangle[i] {
			mn := min(triangle[i+1][j], triangle[i+1][j+1])
			triangle[i][j] = x + mn
		}
	}
	return triangle[0][0]
}
func minimumTotal22(triangle [][]int) int {
	m := len(triangle)
	n := len(triangle[m-1])
	memo := make([][]int, m)
	for i := range memo {
		memo[i] = make([]int, n)
		for j := range memo[i] {
			memo[i][j] = math.MaxInt
		}
	}
	var dfs func(int, int) int
	dfs = func(i, j int) (res int) {
		if i == m-1 {
			return triangle[i][j]
		}
		p := &memo[i][j]
		if *p != math.MaxInt {
			return *p
		}
		defer func() {
			*p = res
		}()
		val := triangle[i][j]
		return val + min(dfs(i+1, j), dfs(i+1, j+1))
	}
	return dfs(0, 0)
}
func minimumTotal222(triangle [][]int) int {
	m := len(triangle)
	n := len(triangle[m-1])
	dp := make([][]int, m)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}
	// 可以这样直接赋值  不需要手写
	dp[m-1] = triangle[m-1]
	for i := m - 2; i >= 0; i-- {
		for j, x := range triangle[i] {
			dp[i][j] = min(dp[i+1][j], dp[i+1][j+1]) + x
		}
	}
	return dp[0][0]
}

func minimumTotal(triangle [][]int) int {
	m := len(triangle)
	for i := m - 2; i >= 0; i-- {
		for j := range triangle[i] {
			triangle[i][j] += min(triangle[i+1][j], triangle[i+1][j+1])
		}
	}
	return triangle[0][0]
}
func countPathsWithXorValue222(grid [][]int, k int) int {
	mx := math.MinInt
	m, n := len(grid), len(grid[0])
	for _, rows := range grid {
		mx = max(mx, slices.Max(rows))
	}
	u := 1 << bits.Len(uint(mx))
	if u < k {
		return 0
	}
	dp := make([][][]int, m+1)
	for i := range dp {
		dp[i] = make([][]int, n+1)
		for j := range dp[i] {
			dp[i][j] = make([]int, u)
		}
	}
	const mod = 1_000_000_007
	dp[0][1][0] = 1
	for i, rows := range grid {
		for j, col := range rows {
			for x := range u {
				dp[i+1][j+1][x] = (dp[i][j+1][x^col] + dp[i+1][j][x^col]) % mod
			}
		}
	}
	return dp[m][n][k]
}

func countPathsWithXorValue(grid [][]int, k int) int {
	mx := math.MinInt
	n := len(grid[0])
	for _, rows := range grid {
		mx = max(mx, slices.Max(rows))
	}
	u := 1 << bits.Len(uint(mx))
	if u < k {
		return 0
	}
	dp := make([][]int, n+1)
	for j := range dp {
		dp[j] = make([]int, u)
	}
	const mod = 1_000_000_007
	dp[1][0] = 1
	for _, rows := range grid {
		for j, col := range rows {
			for x := range u {
				dp[j+1][x] = (dp[j+1][x^col] + dp[j][x^col]) % mod
			}
		}
	}
	return dp[n][k]
}

func maximumDifference2(nums []int) (ans int) {
	// n := len(nums)
	ans = -1
	for i, x := range nums {
		for _, y := range nums[i+1:] {
			ans = max(ans, y-x)

		}
	}
	return
}
func maximumDifference(nums []int) (ans int) {
	preMin := math.MaxInt
	for _, x := range nums {
		ans = max(ans, x-preMin)
		preMin = min(preMin, x)
	}
	if ans == 0 {
		return -1
	}
	return
}
func minFallingPathSum222(matrix [][]int) (ans int) {
	m, n := len(matrix), len(matrix[0])
	memo := make([][]int, m)
	for i := range memo {
		memo[i] = make([]int, n)
		for j := range memo[i] {
			memo[i][j] = math.MaxInt
		}
	}
	ans = math.MaxInt
	var dfs func(int, int) int
	dfs = func(i, j int) (res int) {
		if j < 0 || j >= n {
			return math.MaxInt
		}
		if i == 0 {
			return matrix[i][j]
		}
		p := &memo[i][j]
		if *p != math.MaxInt {
			return *p
		}
		defer func() {
			*p = res
		}()
		return min(dfs(i-1, j), dfs(i-1, j-1), dfs(i-1, j+1)) + matrix[i][j]
	}
	for j := range n {
		ans = min(ans, dfs(n-1, j))
	}
	return ans
}
func minFallingPathSu2m222(matrix [][]int) (ans int) {
	m, n := len(matrix), len(matrix[0])
	dp := make([][]int, m)
	for j := range dp {
		dp[j] = make([]int, n+2)
		dp[j][0], dp[j][n+1] = math.MaxInt, math.MaxInt
	}
	copy(dp[0][1:], matrix[0])
	for i := 1; i < n; i++ {
		for j, x := range matrix[i] {
			dp[i][j+1] = min(dp[i-1][j+1], dp[i-1][j], dp[i-1][j+2]) + x
		}
	}
	ans = math.MaxInt
	for _, x := range dp[n-1] {
		ans = min(ans, x)
	}
	return
}
func minFallingPathSum(matrix [][]int) (ans int) {
	n := len(matrix[0])
	dp := make([]int, n+2)
	dp[0] = math.MaxInt
	dp[n+1] = math.MaxInt
	copy(dp[1:], matrix[0])
	for i := 1; i < n; i++ {
		pre := dp[0]
		for j, x := range matrix[i] {
			pre, dp[j+1] = dp[j+1], min(dp[j+1], pre, dp[j+2])+x
		}
	}
	for j := range n {
		ans = min(ans, dp[j+1])
	}
	return
}

func waysToReachTarget111(target int, types [][]int) int {
	const mod = 1_000_000_007
	n := len(types)
	memo := make([][]int, n)
	for i := range memo {
		memo[i] = make([]int, target+1)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int) int
	// 前i种题目  恰好组合j分的方案数
	dfs = func(i, j int) (res int) {
		if i < 0 {
			if j == 0 {
				return 1
			}
			return 0
		}
		p := &memo[i][j]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		count, marks := types[i][0], types[i][1]
		// j/marks的下取整
		for k := range min(count, j/marks) + 1 {
			res = (res + (dfs(i-1, j-marks*k))) % mod
		}
		return res
	}
	return dfs(n-1, target)
}

func waysToReachTarget222(target int, types [][]int) int {
	const mod = 1_000_000_007
	n := len(types)
	dp := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, target+1)
	}
	dp[0][0] = 1
	for i, rows := range types {
		count, marks := rows[0], rows[1]
		for j := 0; j <= target; j++ {
			for k := range min(count, j/marks) + 1 {
				dp[i+1][j] = (dp[i+1][j] + dp[i][j-marks*k]) % mod
			}
		}
	}
	return dp[n][target]
}
func waysToReachTarget11(target int, types [][]int) int {
	const mod = 1_000_000_007
	dp := make([]int, target+1)
	dp[0] = 1
	for _, rows := range types {
		count, marks := rows[0], rows[1]
		for j := target; j > 0; j-- {
			for k := 1; k < min(count, j/marks)+1; k++ {
				dp[j] = (dp[j] + dp[j-marks*k]) % mod
			}
		}
	}
	return dp[target]
}
func waysToReachTarget242(target int, types [][]int) int {
	const mod = 1_000_000_007
	n := len(types)
	memo := make([][]int, n)
	for i := range memo {
		memo[i] = make([]int, target+1)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int) int
	// 前i种题目  恰好组合j分的方案数
	dfs = func(i, j int) (res int) {
		if i < 0 {
			if j == 0 {
				return 1
			}
			return 0
		}
		p := &memo[i][j]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		count, marks := types[i][0], types[i][1]
		// j/marks的下取整
		for k := 0; k <= min(count, j/marks); k++ {
			res = (res + (dfs(i-1, j-marks*k))) % mod
		}
		return res
	}
	return dfs(n-1, target)
}
func waysToReachTarget(target int, types [][]int) int {
	const mod = 1_000_000_007
	n := len(types)
	dp := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, target+1)
	}
	dp[0][0] = 1
	for i, rows := range types {
		count, marks := rows[0], rows[1]
		for j := 0; j <= target; j++ {
			for k := 1; k < min(count, j/marks)+1; k++ {
				dp[i+1][j] = (dp[i+1][j] + dp[i][j-marks*k]) % mod
			}
		}
	}
	return dp[n][target]
}

func maxPoints(points [][]int) int64 {
	ans := 0
	m, n := len(points), len(points[0])
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
			return 0
		}
		p := &memo[i][j]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		for k := range n {
			res = max(res, dfs(i-1, k)-abs(j-k))
		}
		return res + points[i][j]
	}
	for j := range n {
		ans = max(ans, dfs(m-1, j))
	}
	return int64(ans)
}
func canPartition222(nums []int) bool {
	n := len(nums)
	sum := 0
	for _, x := range nums {
		sum += x
	}
	if sum%2 == 1 {
		return false
	}
	target := sum / 2
	memo := make([][]int8, n)
	for i := range memo {
		memo[i] = make([]int8, target+1)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int) bool
	dfs = func(i, j int) (res bool) {
		if i < 0 {
			return j == 0
		}
		p := &memo[i][j]
		if *p != -1 {
			return *p == 1
		}
		defer func() {
			if res {
				*p = 1
			} else {
				*p = 0
			}
		}()
		v := nums[i]
		res = j >= v && dfs(i-1, j-v) || dfs(i-1, j)
		return
	}
	return dfs(n-1, target)
}
func canPartition333(nums []int) bool {
	n := len(nums)
	sum := 0
	for _, x := range nums {
		sum += x
	}
	if sum%2 == 1 {
		return false
	}
	target := sum / 2
	dp := make([][]bool, n+1)
	for i := range dp {
		dp[i] = make([]bool, target+1)
	}
	dp[0][0] = true
	for i, v := range nums {
		for j := range target + 1 {
			dp[i+1][j] = j >= v && dp[i][j-v] || dp[i][j]
		}
	}
	return dp[n][target]
}

func canPartition(nums []int) bool {
	sum := 0
	for _, x := range nums {
		sum += x
	}
	if sum%2 == 1 {
		return false
	}
	target := sum / 2

	dp := make([]bool, target+1)
	dp[0] = true
	for _, v := range nums {
		for j := target; j >= v; j-- {
			dp[j] = dp[j] || dp[j-v]
		}
	}
	return dp[target]
}

func lengthOfLongestSubsequence111(nums []int, target int) (ans int) {
	n := len(nums)
	memo := make([][]int, n)
	for i := range memo {
		memo[i] = make([]int, target+1)
		for j := range memo[i] {
			memo[i][j] = math.MinInt
		}
	}
	var dfs func(int, int) int
	dfs = func(i, target int) (res int) {
		if i < 0 {
			if target == 0 {
				return 0
			}
			return math.MinInt
		}
		p := &memo[i][target]
		if *p != math.MinInt {
			return *p
		}
		defer func() {
			*p = res
		}()
		if target < nums[i] {
			return dfs(i-1, target)
		}
		return max(dfs(i-1, target-nums[i])+1, dfs(i-1, target))
	}
	ans = dfs(n-1, target)
	if ans <= 0 {
		return -1
	}
	return
}

func lengthOfLongestSubsequence222(nums []int, target int) (ans int) {
	n := len(nums)
	dp := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, target+1)
	}
	for j := 1; j <= target; j++ {
		dp[0][j] = math.MinInt
	}
	for i, x := range nums {
		for j := range target + 1 {
			if j < x {
				dp[i+1][j] = dp[i][j]
			} else {
				dp[i+1][j] = max(dp[i][j-x]+1, dp[i][j])
			}
		}
	}
	ans = dp[n][target]
	if ans <= 0 {
		return -1
	}
	return
}

func lengthOfLongestSubsequence(nums []int, target int) (ans int) {
	dp := make([]int, target+1)
	for j := 1; j <= target; j++ {
		dp[j] = math.MinInt
	}
	for _, x := range nums {
		for j := target; j >= x; j-- {
			dp[j] = max(dp[j-x]+1, dp[j])
		}
	}
	ans = dp[target]
	if ans <= 0 {
		return -1
	}
	return
}

func minPathSum(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	f := make([][]int, m+1)
	for i := range f {
		f[i] = make([]int, n+1)
		for j := range f[i] {
			f[i][j] = math.MaxInt
		}
	}
	f[0][1] = 0
	for i, rows := range grid {
		f[i+1][0] = math.MaxInt
		for j, col := range rows {
			f[i+1][j+1] = min(f[i][j+1], f[i+1][j]) + col
		}
	}
	return f[m][n]
}
func calculateMinimumHP(dungeon [][]int) int {
	m, n := len(dungeon), len(dungeon[0])
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
		for j := range dp[i] {
			dp[i][j] = math.MaxInt
		}
	}
	for i := m - 1; i >= 0; i-- {
		for j := n - 1; j >= 0; j-- {
			v := dungeon[i][j]
			if i == m-1 && j == n-1 {
				dp[i][j] = max(1-v, 1)
			} else {
				minNext := min(dp[i+1][j], dp[i][j+1])
				dp[i][j] = max(minNext-v, 1)
			}
		}
	}
	return dp[0][0]
}

func divideArray111(nums []int, k int) (ans [][]int) {
	slices.Sort(nums)
	n := len(nums)
	for i := 0; i < n; i += 3 {
		tmp := []int{}
		if nums[i+1]-nums[i] > k {
			return [][]int{}
		}
		if nums[i+2]-nums[i+1] > k {
			return [][]int{}
		}
		for j := 0; j < 3; j++ {
			tmp = append(tmp, nums[i+j])
		}
		ans = append(ans, tmp)
	}
	return ans
}
func divideArray(nums []int, k int) (ans [][]int) {
	slices.Sort(nums)
	for a := range slices.Chunk(nums, k) {
		if a[2]-a[0] > k {
			return nil
		}
		ans = append(ans, a)
	}
	return ans
}
func minSetSize(arr []int) int {
	freq := map[int]int{}
	for _, x := range arr {
		freq[x]++
	}
	// 按照出现次数从大到小
	cnt := slices.SortedFunc(maps.Values(freq), func(a, b int) int { return b - a })
	fmt.Println(cnt)
	s := 0
	for i, c := range cnt {
		s += c
		if s >= len(arr)/2 {
			return i + 1
		}
	}
	panic("impossible")
}

func minOperations444(nums []int, target int) (ans int) {
	s := 0
	cnt := [31]int{}
	for _, v := range nums {
		s += v
		cnt[bits.TrailingZeros(uint(v))]++
	}
	if s < target {
		return -1
	}
	s = 0
	for i := 0; 1<<i <= target; {
		s += cnt[i] << i
		mask := 1<<(i+1) - 1
		if s >= target&mask {
			i++
			continue
		}
		ans++
		for i++; cnt[i] == 0; i++ {
			ans++
		}
	}
	return
}
func partitionArray222(nums []int, k int) int {
	slices.Sort(nums)
	ans := 1
	prev := nums[0]
	for i := 1; i < len(nums); i++ {
		x := nums[i]
		if x-prev > k {
			prev = x
			ans++
		}
	}
	return ans
}
func partitionArray(nums []int, k int) (ans int) {
	slices.Sort(nums)
	prev := math.MinInt / 2
	for _, x := range nums {
		if x-prev > k {
			prev = x
			ans++
		}
	}
	return ans
}
func minOperations111(nums []int, target int) (ans int) {
	s := 0
	cnt := [31]int{}
	for _, v := range nums {
		s += v
		cnt[bits.TrailingZeros(uint(v))]++
	}
	if s < target {
		return -1
	}
	s = 0
	for i := 0; 1<<i <= target; {
		s += cnt[i] << i
		mask := 1<<(i+1) - 1
		if s >= target&mask {
			i++
			continue
		}
		ans++
		for i++; cnt[i] == 0; i++ {
			ans++
		}
	}
	return
}

func maxDistance(s string, k int) (ans int) {
	cnt := ['X']int{} // 'W' + 1 = 'X'
	for _, ch := range s {
		cnt[ch]++
		left := k
		f := func(a, b int) int {
			d := min(a, b, left)
			left -= d
			return abs(a-b) + d*2
		}
		ans = max(ans, f(cnt['N'], cnt['S'])+f(cnt['E'], cnt['W']))
	}
	return
}
func findMaximumElegance(items [][]int, k int) int64 {
	// 按照利润从大到小排序
	slices.SortFunc(items, func(a, b []int) int { return b[0] - a[0] })
	totalProfit, ans := 0, 0
	// 这里存的是类别是否访问过  而类别的数据范围为10^9
	vis := map[int]bool{}
	duplicate := []int{}
	for i, p := range items {
		profit, category := p[0], p[1]
		if i < k {
			totalProfit += profit
			if !vis[category] {
				vis[category] = true
			} else {
				duplicate = append(duplicate, profit)
			}
		} else if len(duplicate) > 0 && !vis[category] {
			vis[category] = true
			totalProfit -= duplicate[len(duplicate)-1]
			totalProfit += profit
			duplicate = duplicate[:len(duplicate)-1]
		}
		ans = max(ans, totalProfit+len(vis)*len(vis))
	}
	return int64(ans)
}
func merge(meetings [][]int) (ans [][]int) {
	// 按照起点左端点从小到大排序
	slices.SortFunc(meetings, func(a, b []int) int { return a[0] - b[0] })
	ans = append(ans, meetings[0])
	for _, item := range meetings[1:] {
		left, right := item[0], item[1]
		if left <= ans[len(ans)-1][1] {
			ans[len(ans)-1][1] = max(ans[len(ans)-1][1], right)
		} else {
			ans = append(ans, item)
		}
	}
	return ans
}

func countDays(days int, meetings [][]int) (ans int) {
	meetings = merge(meetings)
	ans = days
	for _, p := range meetings {
		l, r := p[0], p[1]
		ans -= r - l + 1
	}
	return
}

func countWays(ranges [][]int) int {
	slices.SortFunc(ranges, func(a, b []int) int { return a[0] - b[0] })
	const mod = 1_000_000_007
	ans, maxR := 1, -1
	for _, p := range ranges {
		l, r := p[0], p[1]
		if l > maxR {
			ans = ans * 2 % mod
		}
		maxR = max(maxR, r)
	}
	return ans
}
func checkValidCuts(n int, rectangles [][]int) bool {
	type pair struct{ left, right int }
	a := []pair{}
	b := []pair{}
	check := func(intervals []pair) bool {
		slices.SortFunc(intervals, func(a, b pair) int { return a.left - b.left })
		cnt, maxR := 0, 0
		for _, p := range intervals {
			if p.left >= maxR {
				cnt++
				if cnt >= 3 {
					return true
				}
			}
			maxR = max(p.right, maxR)
		}
		return false
	}
	for _, p := range rectangles {
		sx, sy, ex, ey := p[0], p[1], p[2], p[3]
		a = append(a, pair{sx, ex})
		b = append(b, pair{sy, ey})
	}
	return check(a) || check(b)
}

func numberOfGoodPartitions(nums []int) int {
	cntR := map[int]int{}
	for i, x := range nums {
		cntR[x] = i
	}
	maxR := -1
	ans := 1
	n := len(nums)
	for i, x := range nums[:n-1] {
		maxR = max(cntR[x], maxR)
		if maxR == i {
			ans = ans * 2 % 1_000_000_007
		}
	}
	return ans
}
func findValidSplit(nums []int) int {
	// left[p] 表示质数p首次出现的下标
	left := map[int]int{}
	// right[i] 表示左端点为i的区间的右端点的最大值
	right := make([]int, len(nums))
	f := func(p, i int) {
		if l, ok := left[p]; ok {
			right[l] = i
		} else {
			left[p] = i
		}
	}
	for i, x := range nums {
		for d := 2; d*d <= x; d++ {
			if x%d == 0 {
				// d是质因子
				f(d, i)
				// 比方说8如果能/2的话 那就一直/2直到除不动为止
				for x /= d; x%d == 0; x /= d {
				}
			}
		}
		if x > 1 {
			f(x, i)
		}
	}
	maxR := 0
	for l, r := range right {
		if l > maxR {
			return maxR
		}
		maxR = max(maxR, r)
	}
	return -1
}

func smallestPalindrome(s string) string {
	n := len(s)
	t := []byte(s[:n/2])
	slices.Sort(t)

	ans := string(t)
	if n%2 > 0 {
		ans += string(s[n/2])
	}
	slices.Reverse(t)
	return ans + string(t)
}
func getSmallestString222(s string) string {
	n := len(s)
	ans := []byte(s)
	for i := 1; i < n; i++ {
		x, y := s[i-1], s[i]
		if x > y && x%2 == y%2 {
			ans[i-1], ans[i] = y, x
			break
		}
	}
	return string(ans)
}
func makeSmallestPalindrome(s string) string {
	ans := []byte(s)
	for i, n := 0, len(s); i < n/2; i++ {
		x, y := s[i], s[n-1-i]
		if x > y {
			ans[i] = y
		} else {
			ans[n-1-i] = x
		}
	}
	return string(ans)
}
func smallestString(s string) string {
	ans := []byte(s)
	n := len(s)
	for i, ch := range ans {
		if ch != 'a' {
			for j := i; j < n && ans[j] != 'a'; j++ {
				ans[j]--
			}
			return string(ans)
		}
	}
	ans[n-1] = 'z'
	return string(ans)
}
func removeDigit11(number string, digit byte) (ans string) {
	for i, ch := range number {
		if ch == rune(digit) {
			s := number[:i] + number[i+1:]
			if s > ans {
				ans = s
			}
		}
	}
	return
}

func removeDigit(number string, digit byte) string {
	index := -1
	n := len(number)
	for i, ch := range number {
		if ch == rune(digit) {
			if i+1 < n && number[i+1] > number[i] {
				index = i
				break
			}
		}
	}
	return number[0:index] + number[index+1:]
}
func getSmallestString(s string, k int) string {
	if k == 0 {
		return s
	}
	ans := []byte(s)
	for i, ch := range s {
		// 从z走到a
		dis := int(min(ch-'a', 'z'+1-ch))
		if dis > k {
			ans[i] -= byte(k)
			break
		}
		k -= dis
		ans[i] = 'a'
	}
	return string(ans)
}
func smallestNumber(pattern string) string {
	n := len(pattern)
	ans := make([]byte, n+1)
	for i, cur := 0, byte('1'); i < n; {
		if i > 0 && pattern[i] == 'I' {
			i++
		}
		for ; i < n && pattern[i] == 'I'; i++ {
			ans[i] = cur
			cur++
		}
		i0 := i
		for ; i < n && pattern[i] == 'D'; i++ {
		}
		for j := i; j >= i0; j-- {
			ans[j] = cur
			cur++
		}

	}
	return string(ans)
}
func repeatLimitedString(s string, repeatLimit int) string {
	cnt := [26]int{}
	for _, ch := range s {
		cnt[ch-'a']++
	}
	ans := []byte{}
	for i := 25; i >= 0; i-- {
	next:
		// i表示要填的字母 如果是25就是z 如果是0就是a
		for j := 0; j < repeatLimit && cnt[i] > 0; j++ {
			// 填充min(repeatLimit cnt[i]) 个字母i
			cnt[i]--
			ans = append(ans, 'a'+byte(i))
		}
		if cnt[i] == 0 {
			// 字母用完了 找下一个更小的字母
			continue
		}
		for j := i - 1; j >= 0; j-- {
			// i没用完  插入下一个字母j  后面可以继续填j
			if cnt[j] > 0 {
				cnt[j]--
				ans = append(ans, 'a'+byte(j))
				goto next
			}
		}
	}
	return string(ans)
}
func validSequence(s string, t string) []int {
	n, m := len(s), len(t)
	suf := make([]int, n+1)
	// 表示s[i:] 对应的 t 的最长后缀的开始下标 j
	suf[n] = m
	for i, j := n-1, m-1; i >= 0; i-- {
		if j >= 0 && s[i] == t[j] {
			j--
		}
		suf[i] = j + 1
	}
	ans := make([]int, m)
	changed := false
	// j表示匹配的数量
	j := 0
	for i := range s {
		if s[i] == t[j] || !changed && suf[i+1] <= j+1 {
			if s[i] != t[j] {
				changed = true
			}
			ans[j] = i
			j++
			if j == m {
				return ans
			}
		}
	}
	return nil
}

func largestPalindromic(num string) string {
	cnt := ['9' + 1]int{}
	for _, d := range num {
		cnt[d]++
	}
	if cnt['0'] == len(num) { // 特判最特殊的情况：num 全是 0
		return "0"
	}

	s := []byte{}
	for i := byte('9'); i > '0' || i == '0' && len(s) > 0; i-- { // 如果填了数字，则可以填 0
		s = append(s, strings.Repeat(string(i), cnt[i]/2)...)
	}

	j := len(s) - 1
	for i := byte('9'); i >= '0'; i-- {
		if cnt[i]&1 > 0 { // 还可以填一个变成奇回文串
			s = append(s, i)
			break
		}
	}
	for ; j >= 0; j-- { // 添加镜像部分
		s = append(s, s[j])
	}
	return string(s)
}

func minOperations(k int) int {
	ans := math.MaxInt
	for m := 1; m <= k; m++ {
		// 当前数组和是m 至少要加m-1次  再复制 k/m 上取整-1次
		ans = min(ans, m-1+(k-1)/m)
	}
	return ans
}
func minimumPushes(word string) (ans int) {
	cnt := make([]int, 26)
	for _, ch := range word {
		cnt[ch-'a']++
	}
	sort.Sort(sort.Reverse(sort.IntSlice(cnt[:])))
	for i, c := range cnt {
		ans += c * (i/8 + 1)
	}
	return
}

func maxSpending(values [][]int) int64 {
	m, n := len(values), len(values[0])
	a := make([]int, 0, n*m)
	for _, rows := range values {
		a = append(a, rows...)
	}
	slices.Sort(a)
	ans := 0
	for i, x := range a {
		ans += (i + 1) * x
	}
	return int64(ans)
}

func maxFreqSum(s string) int {
	cnt1, cnt2 := map[rune]int{}, map[rune]int{}
	mxCnt1, mxCnt2 := 0, 0
	for _, ch := range s {
		if ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u' {
			cnt1[ch]++
			mxCnt1 = max(mxCnt1, cnt1[ch])
		} else {
			cnt2[ch]++
			mxCnt2 = max(mxCnt2, cnt2[ch])
		}
	}
	return mxCnt1 + mxCnt2
}
func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
func resultingString(s string) string {
	st := []rune{}
	isConsecutive := func(a, b rune) bool {
		d := abs(int(a) - int(b))
		return d == 1 || d == 25
	}
	for _, ch := range s {
		if len(st) > 0 && isConsecutive(ch, st[len(st)-1]) {
			st = st[:len(st)-1]
		} else{
			st = append(st, ch)
		}
	}
	return string(st)
}
