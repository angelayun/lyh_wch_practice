package backtrack

import (
	"fmt"
	"math"
	"slices"
	"unicode"
)

/*
	 func letterCombinations(digits string) (ans []string) {
		n := len(digits)
		if n == 0 {
			return
		}
		mapping := []string{"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"}
		path := []byte{}
		var dfs func(int)
		dfs = func(i int) {
			if i == n {
				ans = append(ans, string(path))
				return
			}
			for _, c := range mapping[int(digits[i]-'0')] {
				path = append(path, byte(c))
				dfs(i + 1)
				path = path[:len(path)-1]
			}
		}
		dfs(0)
		return ans
	}
*/
func letterCombinations(digits string) (ans []string) {
	n := len(digits)
	if n == 0 {
		return
	}
	mapping := []string{"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"}
	path := make([]byte, n)
	var dfs func(int)
	dfs = func(i int) {
		if i == n {
			ans = append(ans, string(path))
			return
		}
		for _, c := range mapping[int(digits[i]-'0')] {
			path[i] = byte(c)
			dfs(i + 1)
		}
	}
	dfs(0)
	return ans
}

func subsets(nums []int) [][]int {
	n := len(nums)
	ans := make([][]int, 0, 1<<n)
	path := make([]int, 0, n)
	var dfs func(int)
	dfs = func(i int) {
		if i == n {
			ans = append(ans, slices.Clone(path))
			return
		}
		// 不选
		dfs(i + 1)
		// 选
		path = append(path, nums[i])
		dfs(i + 1)
		path = path[:len(path)-1]
	}
	dfs(0)
	return ans
}

/* func subsets(nums []int) [][]int {
	n := len(nums)
	ans := make([][]int, 0, 1<<n)
	path := make([]int, 0, n)
	var dfs func(int)
	dfs = func(i int) {
		ans = append(ans, slices.Clone(path))
		for j := i; j < n; j++ {
			path = append(path, nums[j])
			dfs(j + 1)
			path = path[:len(path)-1]
		}
	}
	dfs(0)
	return ans
} */

/*
	 func subsetXORSum(nums []int) (ans int) {
		n := len(nums)
		xorSum := 0
		var dfs func(int)
		dfs = func(i int) {
			if i == n {
				ans += xorSum
				return
			}
			// 不选
			dfs(i + 1)
			// 选
			xorSum ^= nums[i]
			dfs(i + 1)
			xorSum ^= nums[i]
		}
		dfs(0)
		return ans
	}
*/
func subsetXORSum1(nums []int) (ans int) {
	n := len(nums)
	xorSum := 0
	var dfs func(int)
	dfs = func(i int) {
		ans += xorSum
		for j := i; j < n; j++ {
			xorSum ^= nums[j]
			dfs(j + 1)
			xorSum ^= nums[j]
		}
	}
	dfs(0)
	return ans
}
func letterCasePermutation(s string) (ans []string) {
	n := len(s)
	path := make([]byte, n)
	var dfs func(int)
	dfs = func(i int) {
		if i >= n {
			ans = append(ans, string(path))
			return
		}
		if unicode.IsLetter(rune(s[i])) {
			path[i] = byte(unicode.ToLower(rune(s[i])))
			dfs(i + 1)
			path[i] = byte(unicode.ToUpper(rune(s[i])))
			dfs(i + 1)
		} else {
			path[i] = s[i]
			dfs(i + 1)
		}
	}
	dfs(0)
	return
}
func maximumGood1(statements [][]int) (ans int) {
next:
	for mask := 1; mask < 1<<len(statements); mask++ {
		cnt := 0 // mask 中好人个数
		for j, row := range statements {
			if mask>>j&1 == 1 { // 枚举 mask 中的好人 j
				for k, st := range row { // 枚举 j 的所有陈述 st
					if st < 2 && st != mask>>k&1 { // 该陈述与实际情况矛盾
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
	return
}
func maximumGood22(statements [][]int) (ans int) {
	n := len(statements)
next:
	// 每一个人都可能是好人 或者坏人
	for mask := 1; mask < 1<<n; mask++ {
		cnt := 0
		for j, row := range statements {
			if mask>>j&1 == 1 {
				// 当前j是好人
				for k, st := range row {
					if st < 2 && ((mask>>k)&1) != st {
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
					cnt++
				}
			}
		}
		if cnt > ans {
			ans = cnt
		}
	}
	return ans
}
func numberOfSets(n int, maxDistance int, roads [][]int) (ans int) {
	// 建图 最开始初始值为最大值的一半
	g := make([][]int, n)
	for i := 0; i < n; i++ {
		g[i] = make([]int, n)
		for j := 0; j < n; j++ {
			g[i][j] = math.MaxInt / 2
		}
	}
	for _, e := range roads {
		x, y, wt := e[0], e[1], e[2]
		g[x][y] = min(g[x][y], wt)
		g[y][x] = min(g[y][x], wt)
	}
	f := make([][]int, n)
	for i := range f {
		f[i] = make([]int, n)
	}
	fmt.Println(f)
next:
	// 每一个点都可以选 可以不选
	for mask := 0; mask < 1<<n; mask++ {
		for i, row := range g {
			if mask>>i&1 == 0 {
				continue
			}
			copy(f[i], row)
		}
		fmt.Println(mask)
		fmt.Println(f)

		// 算floyd
		for k := range f {
			if mask>>k&1 == 0 {
				continue
			}
			for i := range f {
				if mask>>i&1 == 0 {
					continue
				}
				for j := range f {
					f[i][j] = min(f[i][j], f[i][k]+f[k][j])
				}
			}
		}
		for i, di := range f {
			if mask>>i&1 == 0 {
				continue
			}
			for j, dij := range di[:i] {
				if mask>>j&1 > 0 && dij > maxDistance {
					continue next
				}
			}
		}
		ans++
	}
	return ans
}
func maxScoreWords1(words []string, letters []byte, score []int) (ans int) {
	left := [26]int{}
	for _, c := range letters {
		left[c-'a']++
	}
	n := len(words)
	var dfs func(int, int)
	dfs = func(i, total int) {
		if i <= 0 {
			ans = max(ans, total)
			return
		}
		// 不选
		dfs(i-1, total)
		for j, ch := range words[i] {
			ch -= 'a'
			if left[ch] == 0 {
				for _, c := range words[i][:j] {
					left[c-'a']++
				}
			}
			left[ch]--
			total += score[ch]
		}
		dfs(i-1, total)
		for _, ch := range words[i] {
			ch -= 'a'
			left[ch]++
		}
	}
	dfs(n-1, 0)
	return
}
func maxScoreWords2(words []string, letters []byte, score []int) (ans int) {
	left := [26]int{}
	for _, c := range letters {
		left[c-'a']++
	}
	var dfs func(int, int)
	dfs = func(i, total int) {
		if i < 0 { // base case
			ans = max(ans, total)
			return
		}
		// 不选 words[i]
		dfs(i-1, total)
		// 选 words[i]
		for j, c := range words[i] {
			c -= 'a'
			if left[c] == 0 { // 剩余字母不足
				for _, c := range words[i][:j] { // 撤销
					left[c-'a']++
				}
				return
			}
			left[c]--         // 减少剩余字母
			total += score[c] // 累加得分
		}
		dfs(i-1, total)
		// 恢复现场
		for _, c := range words[i] {
			left[c-'a']++
		}
	}
	dfs(len(words)-1, 0)
	return
}

/*
	func partition(s string) (ans  [][]string) {
	var dfs func(int,int)
	dfs=func(start, i int) {}
	dfs(0,0)

}
*/
func subsetXORSum45(nums []int) (ans int) {
	xorSum := 0
	var dfs func(int)
	dfs = func(i int) {
		ans += xorSum
		for j := i; j < len(nums); j++ {
			xorSum ^= nums[j]
			dfs(j + 1)
			xorSum ^= nums[j]
		}
	}
	dfs(0)
	return
}
func subsetXORSum(nums []int) (ans int) {
	xorSum := 0
	n := len(nums)
	var dfs func(int)
	dfs = func(i int) {
		if i >= n {
			ans += xorSum
			return
		}
		dfs(i + 1)
		xorSum ^= nums[i]
		dfs(i + 1)
		xorSum ^= nums[i]
	}
	dfs(0)
	return
}

// 写的这个回溯是有问题的
/* func largestDivisibleSubset1(nums []int) (ans []int) {
	slices.Sort(nums)
	n := len(nums)
	path := []int{}
	var dfs func(int)
	dfs = func(i int) {
		if i >= n {
			if len(ans) < len(path) {
				ans = slices.Clone(path)
			}
			return
		}
		// 不选
		dfs(i + 1)
		// 选
		if len(path) == 0 || len(path) > 0 && nums[i]%path[len(path)-1] == 0 {
			path = append(path, nums[i])
			dfs(i + 1)
			path = path[:len(path)-1]
		}
	}
	dfs(0)
	return
}
func largestDivisibleSubset(nums []int) (ans []int) {
	slices.Sort(nums)
	n := len(nums)
	path := []int{}
	var dfs func(int)
	dfs = func(i int) {
		if len(ans) < len(path) {
			ans = slices.Clone(path)
		}
		for j := i; j < n; j++ {
			dfs(j + 1)
			if len(path) == 0 || len(path) > 0 && nums[j]%path[len(path)-1] == 0 {
				path = append(path, nums[j])
				dfs(j + 1)
				path = path[:len(path)-1]
			}
		}
	}
	dfs(0)
	return ans
} */
func largestDivisibleSubset111(nums []int) []int {
	slices.Sort(nums)
	n := len(nums)
	from := make([]int, n)
	for i := range from {
		from[i] = -1
	}
	dp := make([]int, n)
	maxI := 0
	for i, x := range nums {
		for j, y := range nums[:i] {
			if x%y == 0 && dp[j] > dp[i] {
				dp[i] = dp[j]
				from[i] = j
			}
		}
		dp[i]++
		if dp[i] > dp[maxI] {
			maxI = i
		}
	}
	path := make([]int, 0, dp[maxI])
	for i := maxI; i >= 0; i = from[i] {
		path = append(path, nums[i])
	}
	return path
}
func largestDivisibleSubset(nums []int) []int {
	slices.Sort(nums)
	n := len(nums)
	dp := make([]int, n)
	from := make([]int, n)
	for i := range from {
		from[i] = -1
	}
	maxI := 0
	for i, x := range nums {
		for j, y := range nums[:i] {
			if x%y == 0 && dp[j] > dp[i] {
				dp[i] = dp[j]
				from[i] = j
			}
		}
		if dp[i] > dp[maxI] {
			maxI = i
		}
	}
	path := make([]int, 0, maxI)
	for i := maxI; i >= 0; i = from[i] {
		path = append(path, nums[i])
	}
	return path
}
func canPartition1(nums []int) bool {
	totalSum := 0
	for _, v := range nums {
		totalSum += v
	}
	if totalSum%2 != 0 {
		return false
	}
	target := totalSum / 2
	n := len(nums)
	// -1表示没有计算过  0 表示false 1表示true
	memo := make([][]int8, n)
	for i := range memo {
		memo[i] = make([]int8, target+1)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int) bool
	dfs = func(i int, sum int) bool {
		if i < 0 {
			return sum == 0
		}
		p := &memo[i][sum]
		if *p != -1 {
			return *p == 1
		}
		// 不选
		res := sum >= nums[i] && dfs(i-1, sum-nums[i]) || dfs(i-1, sum)
		if res {
			*p = 1
		} else {
			*p = 0
		}
		return res
	}
	return dfs(n-1, target)
}
func canPartition2(nums []int) bool {
	totalSum := 0
	for _, v := range nums {
		totalSum += v
	}
	if totalSum%2 != 0 {
		return false
	}
	target := totalSum / 2
	n := len(nums)
	dp := make([][]bool, n+1)
	for i := range dp {
		dp[i] = make([]bool, target+1)
	}
	dp[0][0] = true
	for i, x := range nums {
		for sum := 0; sum <= target; sum++ {
			dp[i+1][sum] = sum >= x && dp[i][sum-x] || dp[i][sum]
		}
	}
	return dp[n][target]
}

func canPartition(nums []int) bool {
	totalSum := 0
	for _, v := range nums {
		totalSum += v
	}
	if totalSum%2 != 0 {
		return false
	}
	target := totalSum / 2
	// n := len(nums)
	dp := make([]bool, target+1)
	dp[0] = true
	for _, x := range nums {
		for sum := target; sum >= x; sum-- {
			dp[sum] = dp[sum-x] || dp[sum]
		}
	}
	return dp[target]
}
