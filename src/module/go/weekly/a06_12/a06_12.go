package a0612

import (
	"fmt"
	"math/bits"
	"slices"
)

func abs(a int) int {
	if a > 0 {
		return a
	}
	return -a
}
func findTargetSumWays(nums []int, target int) int {
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

const mx = 100_001
const mod = 1_000_000_007

var f = [mx]int{1, 1, 2, 4}
var g = f

func init() {
	for i := 4; i < mx; i++ {
		f[i] = (f[i-1] + f[i-2] + f[i-3]) % mod
		g[i] = (g[i-1] + g[i-2] + g[i-3] + g[i-4]) % mod
	}
}
func countTexts(pressedKeys string) (ans int) {
	ans = 1
	n := len(pressedKeys)
	cnt := 0
	for i, ch := range pressedKeys {
		cnt++
		if i == n-1 || byte(ch) != pressedKeys[i+1] {
			if ch == '7' || ch == '9' {
				ans = (ans * f[i]) % mod
			} else {
				ans = (ans * g[i]) % mod
			}
			cnt = 0
		}
	}
	return ans
}
