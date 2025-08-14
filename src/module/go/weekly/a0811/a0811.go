package a0811

import (
	"math"
	"slices"
	"strconv"
	"strings"
)

func checkEqualPartitions(nums []int, target int64) bool {
	n := len(nums)
	for mask := 1; mask < 1<<n; mask++ {
		arr := [2]int{1, 1}
		for i := range n {
			arr[mask>>i&1] *= nums[i]
		}
		if arr[0] == int(target) && arr[1] == int(target) {
			return true
		}
	}
	return false
}

func minAbsDiff(grid [][]int, k int) [][]int {
	m, n := len(grid), len(grid[0])
	ans := make([][]int, m-k+1)
	for i := range ans {
		ans[i] = make([]int, n-k+1)
	}
	if k == 1 {
		return ans
	}
	for i := range ans {
		for j := range ans[i] {
			res := []int{}
			for x := i; x < min(m, i+k); x++ {
				for y := j; y < min(n, j+k); y++ {
					res = append(res, grid[x][y])
				}
			}
			slices.Sort(res)
			minVal := math.MaxInt
			for index := 1; index < len(res); index++ {
				if res[index] == res[index-1] {
					continue
				}
				minVal = min(minVal, res[index]-res[index-1])
			}
			if minVal == math.MaxInt {
				ans[i][j] = 0
			} else {
				ans[i][j] = minVal
			}
		}
	}
	return ans
}

func minSwaps222(nums []int) int {
	cnt1 := 0
	for _, v := range nums {
		if v == 1 {
			cnt1++
		}
	}
	// 长度为cnt1的定长滑窗 最小数量的0
	maxCnt1 := 0
	winCnt := 0
	n := len(nums)
	for i := 0; i < 2*n; i++ {
		winCnt += nums[i%n]
		if i < cnt1-1 {
			continue
		}
		maxCnt1 = max(maxCnt1, winCnt)
		winCnt -= nums[(i-cnt1+1)%n]
	}
	return cnt1 - maxCnt1
}

func findSubstring(s string, words []string) (ans []int) {
	wordLen := len(words[0])          // 一个单词的长度
	windowLen := wordLen * len(words) // 所有单词的总长度，即窗口大小

	// 目标：窗口中的单词出现次数必须与 targetCnt 完全一致
	targetCnt := map[string]int{}
	for _, w := range words {
		targetCnt[w]++
	}

	// 枚举窗口起点，做 wordLen 次滑动窗口
	for start := range wordLen {
		cnt := map[string]int{}
		overload := 0
		// 枚举窗口最后一个单词的右端点+1
		for right := start + wordLen; right <= len(s); right += wordLen {
			// 1. inWord 进入窗口
			inWord := s[right-wordLen : right]
			// 下面 cnt[inWord]++ 后，inWord 的出现次数过多
			if cnt[inWord] == targetCnt[inWord] {
				overload++
			}
			cnt[inWord]++

			left := right - windowLen // 窗口第一个单词的左端点
			if left < 0 {             // 窗口大小不足 windowLen
				continue
			}

			// 2. 更新答案
			// 如果没有超出 targetCnt 的单词，那么也不会有少于 targetCnt 的单词
			if overload == 0 {
				ans = append(ans, left)
			}

			// 3. 窗口最左边的单词 outWord 离开窗口，为下一轮循环做准备
			outWord := s[left : left+wordLen]
			cnt[outWord]--
			if cnt[outWord] == targetCnt[outWord] {
				overload--
			}
		}
	}
	return
}

func longestOnes(nums []int, k int) (maxLen int) {
	// 窗口中0的个数
	winCnt0 := 0
	left := 0
	for i, v := range nums {
		// 像这种要判断的地方多想一下是否可以不要if
		winCnt0 += v ^ 1
		for winCnt0 > k {
			winCnt0 -= nums[left] ^ 1
			left++
		}
		maxLen = max(maxLen, i-left+1)
	}
	return
}

func longestSemiRepetitiveSubstring(s string) int {
	ans, left, same := 1, 0, 0
	for right := 1; right < len(s); right++ {
		if s[right] == s[right-1] {
			same++
		}
		if same > 1 { // same == 2
			left++
			for s[left] != s[left-1] {
				left++
			}
			same = 1
		}
		ans = max(ans, right-left+1)
	}
	return ans
}

func minCuttingCost(n int, m int, k int) int64 {
	fn := func(n int) (cost int) {
		for n > k {
			cost += (n - k) * (k)
			n -= k
		}
		return cost
	}
	return int64(fn(n) + fn(m))
}

func resultingString(s string) string {
	st := []byte{}
	for _, ch := range s {
		st = append(st, byte(ch))
		for len(st) >= 2 {
			first := st[len(st)-1]
			second := st[len(st)-2]
			if (first == 'z' && second == 'a') || (first == 'a' && second == 'z') || (second > first && second-first == 1) || (first > second && first-second == 1) {
				st = st[:len(st)-2]
			} else {
				break
			}
		}
	}
	return string(st)
}

func isConsecutive(x, y byte) bool {
	d := abs((int(x) - int(y)))
	return d == 1 || d == 25
}
func lexicographicallySmallestString(s string) string {
	n := len(s)
	memo := make([][]int8, n)
	for i := range memo {
		memo[i] = make([]int8, n)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	//左闭右闭区间 为什么返回值不是bool  因为在用记忆化搜索
	var canEmpty func(int, int) int8
	canEmpty = func(i, j int) (res int8) {
		if i > j {
			return 1
		}
		p := &memo[i][j]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		if isConsecutive(s[i], s[j]) && canEmpty(i+1, j-1) > 0 {
			return 1
		}
		for k := i + 1; k < j; k += 2 {
			if canEmpty(i, k) > 0 && canEmpty(k+1, j) > 0 {
				return 1
			}
		}
		return 0
	}
	memoDfs := make([]string, n)
	for i := range memoDfs {
		memoDfs[i] = "?"
	}
	var dfs func(int) string
	dfs = func(i int) (res string) {
		if i == n {
			return ""
		}
		p := &memoDfs[i]
		if *p != "?" {
			return *p
		}
		defer func() {
			*p = res
		}()
		// 包含s[i]
		res = string(s[i]) + dfs(i+1)
		for j := i + 1; j < n; j += 2 {
			if canEmpty(i, j) > 0 {
				res = min(res, dfs(j+1))
			}
		}
		return res
	}
	return dfs(0)
}

func kthLargestNumber(nums []string, k int) string {
	slices.SortFunc(nums, func(x, y string) int {
		iX, _ := strconv.Atoi(x)
		iY, _ := strconv.Atoi(y)
		return iY - iX
	})
	return nums[k-1]
}

func rearrangeArray(nums []int) []int {
	slices.Sort(nums)
	n := len(nums)
	ans := []int{}
	left, right := 0, n-1
	for left < right {
		ans = append(ans, nums[left])
		ans = append(ans, nums[right])
		left++
		right--
	}
	if left == right {
		ans = append(ans, nums[left])
	}
	return ans
}

func maxIncreasingSubarrays222(nums []int) (ans int) {
	n := len(nums)
	ans = 1
	preCnt := 0
	for i := 0; i < n; {
		i0 := i
		i++
		if i < n {
			if nums[i] <= nums[i-1] {
				preCnt = 0
				continue
			}
			for ; i < n && nums[i-1] < nums[i]; i++ {
			}
			cnt := i - i0
			ans = max(ans, cnt/2, min(cnt, preCnt))
			preCnt = cnt
		}
	}
	return
}

func maxIncreasingSubarrays(nums []int) (ans int) {
	cnt, preCnt := 0, 0
	n := len(nums)
	for i, x := range nums {
		cnt++
		if i == n-1 || x >= nums[i+1] {
			ans = max(ans, cnt/2, min(preCnt, cnt))
			preCnt = cnt
			cnt = 0
		}
	}
	return
}
func minSwaps(s string) (ans int) {
	ans = math.MaxInt
	n := len(s)
	cnt := [2]int{}
	for _, ch := range s {
		cnt[int(ch-'0')]++
	}
	if abs(cnt[1]-cnt[0]) > 1 {
		return -1
	}
	a := strings.Repeat("01", (n+1)/2)[:n]
	cntA := slices.Clone(cnt[:])
	for _, ch := range a {
		cntA[int(ch-'0')]--
	}
	diff := abs(cntA[0]) + abs(cntA[1])

	b := strings.Repeat("10", (n+1)/2)[:n]
	cntB := slices.Clone(cnt[:])
	for _, ch := range b {
		cntB[int(ch-'0')]--

	}
	diff2 := abs(cntB[0]) + abs(cntB[1])
	if diff%2 == 0 {
		ans = min(ans, diff/2)
	}
	if diff2%2 == 0 {
		ans = min(ans, diff2/2)
	}
	return
}
func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}

var power []int

func init222() {
	power = append(power, 1)
	for power[len(power)-1] < int(math.Pow(2, 31)) {
		power = append(power, power[len(power)-1]*3)
	}
}
func isPowerOfThree222(n int) bool {
	if n <= 0 {
		return false
	}
	for i := 0; i < len(power) && power[i] <= n; i++ {
		if power[i] == n {
			return true
		}
	}
	return false
}
func isPowerOfThree(n int) bool {

	for n >= 3 {
		if n%3 != 0 {
			return false
		}
		n /= 3
	}
	return n == 1
}

func longestString(x int, y int, z int) (ans int) {
	ans = (min(x, y) + z) * 2
	if x != y {
		ans += 2
	}
	return
}

/* aabb
bbab
bbaa */


func sumOfLargestPrimes(s string) int64 {
    
}