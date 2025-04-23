package prefixsuffixdemo

import (
	"fmt"
	"math"
	"slices"
	"strconv"
	"strings"
)

func pivotIndex(nums []int) int {
	fmt.Println("test")
	n := len(nums)
	suffix := make([]int, n+1)
	suffix[n] = 0
	for i := n - 1; i >= 0; i-- {
		suffix[i] = suffix[i+1] + nums[i]
	}
	prefix := 0
	for i, x := range nums {
		if prefix == suffix[i+1] {
			return i
		}
		prefix += x
	}
	return -1
}
func pivotIndex1(nums []int) int {
	sum := 0
	for _, x := range nums {
		sum += x
	}
	leftS := 0
	// leftS +x = sum-leftS
	for i, x := range nums {
		if sum-x == 2*leftS {
			return i
		}
		leftS += x
	}
	return -1
}
func findMiddleIndex(nums []int) int {
	sum := 0
	for _, x := range nums {
		sum += x
	}
	leftS := 0
	// leftS +x = sum-leftS
	for i, x := range nums {
		if sum-x == 2*leftS {
			return i
		}
		leftS += x
	}
	return -1
}
func waysToSplitArray(nums []int) (ans int) {
	n := len(nums)
	suffix := make([]int, n)
	for i := n - 2; i >= 0; i-- {
		suffix[i] = suffix[i+1] + nums[i+1]
	}
	prefix := 0
	for i := 0; i < n-1; i++ {
		prefix += nums[i]
		if prefix >= suffix[i] {
			ans++
		}
	}
	return
}
func waysToSplitArray2(nums []int) (ans int) {
	n := len(nums)
	sum := 0
	for _, x := range nums {
		sum += x
	}
	prefix := 0
	for i := 0; i < n-1; i++ {
		prefix += nums[i]
		rightSum := sum - prefix
		if prefix > rightSum {
			ans++
		}
	}
	return
}
func minimumAverageDifference1(nums []int) int {
	ans := math.MaxInt
	n := len(nums)
	minIdx := n
	// 放的是和  后面再求平均值
	suffix := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		suffix[i] = suffix[i+1] + nums[i]
	}
	prefix := 0
	for i, x := range nums {
		prefix += x
		left := prefix / (i + 1)
		right := 0
		if n-(i+1) > 0 {
			right = suffix[i+1] / (n - (i + 1))
		}
		curVal := abs(right - left)
		if curVal < ans {
			ans = curVal
			minIdx = i
		}
	}
	return minIdx
}
func minimumAverageDifference(nums []int) (ans int) {
	prefix, suffix, n := 0, 0, len(nums)
	for _, x := range nums {
		suffix += x
	}
	minDiff := math.MaxInt
	for i, x := range nums[:n-1] {
		prefix += x
		suffix -= x
		d := abs(prefix/(i+1) - suffix/(n-i-1))
		if d < minDiff {
			minDiff = d
			ans = i
		}
	}
	if (prefix+nums[n-1])/n < minDiff {
		ans = n - 1
	}
	return
}
func maxScore1(s string) (ans int) {
	n := len(s)
	suffix := make([]int, n)
	suffix[n-1] = int(s[n-1] - '0')
	for i := n - 2; i >= 0; i-- {
		suffix[i] = suffix[i+1] + int(s[i]-'0')
	}
	prefix := int(s[0]-'0') ^ 1
	ans = prefix
	for i := 1; i < n; i++ {
		ans = max(ans, prefix+suffix[i])
		if s[i] == '0' {
			prefix++
		}
	}
	return ans
}

func maxScore3(s string) (ans int) {
	// 右边1的个数
	right := strings.Count(s, "1")
	// 左边0的个数
	left := 0
	for _, x := range s[:len(s)-1] {
		// 左右子串非空
		if x == '0' {
			left++
		} else {
			right--
		}
		ans = max(ans, right+left)
	}
	return
}
func maxScore(s string) (ans int) {
	score := strings.Count(s, "1")
	for _, x := range s[:len(s)-1] {
		// 左右子串非空
		if x == '0' {
			score++
		} else {
			score--
		}
		ans = max(ans, score)
	}
	return
}
func countGoodIntegers111(n int, k int) (ans int64) {
	// 预处理n的阶乘
	factorial := make([]int, n+1)
	factorial[0] = 1
	for i := 1; i <= n; i++ {
		factorial[i] = factorial[i-1] * i
	}
	base := int(math.Pow10((n - 1) / 2))
	vis := map[string]bool{}
	for i := base; i < base*10; i++ {
		x := i
		t := i
		// 如果是奇数位 中心点要去掉
		if n%2 > 0 {
			t /= 10
		}
		// 右边加上左边的反转位
		for ; t > 0; t /= 10 {
			x = x*10 + t%10
		}
		if x%k != 0 {
			continue
		}
		bs := []byte(strconv.Itoa(x))
		// map的key 确保不重复
		slices.Sort(bs)
		s := string(bs)
		if vis[s] {
			continue
		}
		vis[s] = true
		// 统计每个数字出现的次数
		cnt := [10]int{}
		for _, c := range bs {
			cnt[c-'0']++
		}
		// 计算组合数
		res := (n - cnt[0]) * factorial[n-1]
		for _, v := range cnt {
			res /= factorial[v]
		}
		ans += int64(res)
	}
	return
}
func countGoodIntegers02(n int, k int) (ans int64) {
	fac := make([]int, n+1)
	fac[0] = 1
	for i := 1; i <= n; i++ {
		fac[i] = fac[i-1] * i
	}
	base := int(math.Pow10((n - 1) / 2))
	vis := map[string]bool{}
	for i := base; i < base*10; i++ {
		x := i
		t := i
		if n%2 > 0 {
			t /= 10
		}
		for ; t > 0; t /= 10 {
			x = x*10 + t%10
		}
		if x%k != 0 {
			continue
		}
		bs := []byte(strconv.Itoa(x))
		slices.Sort(bs)
		s := string(bs)
		if vis[s] {
			continue
		}
		vis[s] = true
		cnt := [10]int{}
		for _, c := range bs {
			cnt[c-'0']++
		}
		res := (n - cnt[0]) * fac[n-1]
		for _, v := range cnt {
			res /= fac[v]
		}
		ans += int64(res)
	}
	return
}
func longestSubarray(nums []int) (ans int) {
	n := len(nums)
	prefix := make([]int, n+1)
	suffix := make([]int, n+1)
	for i, x := range nums {
		if x == 1 {
			prefix[i+1] = prefix[i] + 1
		} else {
			prefix[i+1] = 0
		}
	}
	for i, x := range slices.Backward(nums) {
		if x == 1 {
			suffix[i] = suffix[i+1] + 1
		} else {
			suffix[i] = 0
		}
	}
	for i, x := range nums {
		if x == 0 {
			ans = max(ans, prefix[i]+suffix[i+1])
		} else {
			ans = max(ans, prefix[i])
		}
	}
	return ans
}
func longestSubarray1(nums []int) (ans int) {
	n := len(nums)
	suffix := make([]int, n+1)
	for i, x := range slices.Backward(nums) {
		if x == 1 {
			suffix[i] = suffix[i+1] + 1
		} else {
			suffix[i] = 0
		}
	}
	prefix := 0
	for i, x := range nums {
		if x == 0 {
			ans = max(ans, prefix+suffix[i+1])
			prefix = 0
		} else {
			ans = max(ans, prefix)
			prefix++
		}
	}
	return ans
}
func longestMountain(arr []int) (ans int) {
	n := len(arr)
	suffix := make([]int, n)
	for i := n - 2; i >= 0; i-- {
		if arr[i+1] < arr[i] {
			suffix[i] = suffix[i+1] + 1
		} else {
			suffix[i] = 0
		}
	}
	prefix := make([]int, n)
	for i := 1; i < n; i++ {
		if arr[i] > arr[i-1] {
			prefix[i] = prefix[i-1] + 1
		} else {
			prefix[i] = 0
		}
	}
	for i := range arr {
		if prefix[i] > 0 && suffix[i] > 0 {
			ans = max(ans, prefix[i]+suffix[i]+1)
		}
	}
	return ans
}

/*
	 func sumOfBeauties(nums []int) (ans int) {
		n := len(nums)
		suffix := make([]int, n)
		suffix[n-1] = nums[n-1]
		for i := n - 2; i >= 0; i-- {
			suffix[i] = min(suffix[i+1], nums[i])
		}
		prefix := make([]int, n)
		prefix[0] = nums[0]
		for i := 1; i < n; i++ {
			prefix[i] = max(prefix[i-1], nums[i])
		}
		for i := 1; i < n-1; i++ {
			x := nums[i]
			if x > prefix[i-1] && x < suffix[i+1] {
				ans += 2
			} else if x > nums[i-1] && x < nums[i+1] {
				ans++
			}
		}
		return
	}
*/
func sumOfBeauties(nums []int) (ans int) {
	n := len(nums)
	suffix := make([]int, n)
	suffix[n-1] = nums[n-1]
	for i := n - 2; i >= 0; i-- {
		suffix[i] = min(suffix[i+1], nums[i])
	}
	prefix := nums[0]

	for i := 1; i < n-1; i++ {
		x := nums[i]
		if x > prefix && x < suffix[i+1] {
			ans += 2
		} else if x > nums[i-1] && x < nums[i+1] {
			ans++
		}
		prefix = max(prefix, x)
	}
	return
}
func minimumSum(nums []int) (ans int) {
	ans = math.MaxInt
	n := len(nums)
	suffix := make([]int, n)
	suffix[n-1] = nums[n-1]
	for i := n - 2; i >= 0; i-- {
		suffix[i] = min(suffix[i+1], nums[i])
	}
	prefix := nums[0]

	for i := 1; i < n-1; i++ {
		x := nums[i]
		if prefix < x && suffix[i+1] < x {
			ans = min(ans, prefix+x+suffix[i+1])
		}
		prefix = min(prefix, x)
	}
	if ans == math.MaxInt {
		return -1
	}
	return ans
}
func bestClosingTime1(customers string) (ans int) {
	minCost := math.MaxInt
	n := len(customers)
	suffix := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		suffix[i] = suffix[i+1]
		if customers[i] == 'Y' {
			suffix[i]++
		}
	}
	prefix := 0
	for i := 0; i <= n; i++ {
		curVal := prefix + suffix[i]
		if curVal < minCost {
			minCost = curVal
			ans = i
		}
		if i < n && customers[i] == 'N' {
			prefix++
		}
	}
	return
}
func bestClosingTime(customers string) (ans int) {
	cost := strings.Count(customers, "Y")
	minCost := cost
	for i, c := range customers {
		if c == 'N' {
			// 当前点没有客 对于下一个点关门有贡献
			cost++
		} else {
			// 当前点有客 对于开门没影响 但是对于关门就有影响了
			cost--
			if cost < minCost {
				minCost = cost
				// 这时返回的是 i+1
				ans = i + 1
			}
		}
	}
	return
}

func numSplits(s string) (ans int) {
	n := len(s)
	cnt := map[byte]int{}
	suffix := make([]int, n)
	for i := n - 1; i >= 0; i-- {
		suffix[i] = len(cnt)
		cnt[s[i]]++
	}
	clear(cnt)
	prefix := 0
	for i := 0; i < n-1; i++ {
		cnt[s[i]]++
		prefix = len(cnt)
		if prefix == suffix[i] {
			ans++
		}
	}
	return
}
func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
func countValidSelections(nums []int) (ans int) {
	n := len(nums)
	suffix := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		suffix[i] += suffix[i+1] + nums[i]
	}
	prefix := 0
	for i, v := range nums {
		if v == 0 {
			if prefix == suffix[i+1] {
				ans += 2
			} else if abs(prefix-suffix[i+1]) == 1 {
				ans++
			}
		}
		prefix += v
	}
	return
}
func countValidSelections1(nums []int) (ans int) {
	total := 0
	for _, v := range nums {
		total += v
	}
	prefix := 0
	for _, v := range nums {
		if v == 0 {
			suffix := total - prefix
			if prefix == suffix {
				ans += 2
			} else if abs(prefix-suffix) == 1 {
				ans++
			}
		}
		prefix += v
	}
	return
}
func maxProfit122_00(prices []int) int {
	n := len(prices)
	memo := make([][2]int, n)
	for i := range memo {
		memo[i] = [2]int{-1, -1}
	}
	var dfs func(int, int) int
	dfs = func(i, hold int) (res int) {
		if i < 0 {
			if hold == 1 {
				return math.MinInt
			}
			return
		}
		p := &memo[i][hold]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		if hold == 1 {
			return max(dfs(i-1, hold), dfs(i-1, 0)-prices[i])
		} else {
			return max(dfs(i-1, hold), dfs(i-1, 1)+prices[i])
		}
		return
	}
	return dfs(n-1, 0)
}
func maxProfit122_01(prices []int) int {
	n := len(prices)
	dp := make([][2]int, n+1)
	dp[0][1] = math.MinInt
	for i, x := range prices {
		dp[i+1][0] = max(dp[i][0], dp[i][1]+x)
		dp[i+1][1] = max(dp[i][1], dp[i][0]-x)
	}
	return dp[n][0]
}
func maxProfit122_02(prices []int) int {
	f0, f1 := 0, math.MinInt
	for _, x := range prices {
		newF := max(f0, f1+x)
		f1 = max(f1, f0-x)
		f0 = newF
	}
	return f0
}

func maxProfit_309_00(prices []int) int {
	n := len(prices)
	memo := make([][2]int, n)
	for i := range memo {
		memo[i] = [2]int{-1, -1}
	}
	var dfs func(int, int) int
	dfs = func(i, hold int) (res int) {
		if i < 0 {
			if hold == 1 {
				return math.MinInt
			}
			return
		}
		p := &memo[i][hold]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		if hold == 1 {
			return max(dfs(i-1, 1), dfs(i-2, 0)-prices[i])
		} else {
			return max(dfs(i-1, 0), dfs(i-1, 1)+prices[i])
		}
		return
	}
	return dfs(n-1, 0)
}
func maxProfit309_01(prices []int) int {
	n := len(prices)
	dp := make([][2]int, n+2)
	dp[1][1] = math.MinInt
	for i, x := range prices {
		dp[i+2][0] = max(dp[i+1][0], dp[i+1][1]+x)
		dp[i+2][1] = max(dp[i+1][1], dp[i][0]-x)
	}
	return dp[n+1][0]
}
func maxProfit309_02(prices []int) int {
	pre0, f0, f1 := 0, 0, math.MinInt
	for _, p := range prices {
		pre0, f0, f1 = f0, max(f0, f1+p), max(f1, pre0-p)
	}
	return f0
}
func maxProfit188_00(k int, prices []int) int {
	n := len(prices)
	memo := make([][][2]int, n)
	for i := range memo {
		memo[i] = make([][2]int, k+1)
		for j := range memo[i] {
			memo[i][j] = [2]int{-1, -1}
		}
	}
	var dfs func(int, int, int) int
	dfs = func(i, j, hold int) (res int) {
		if j < 0 {
			return math.MinInt / 2
		}
		if i < 0 {
			if hold == 1 {
				return math.MinInt / 2
			}
			return
		}
		p := &memo[i][j][hold]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		if hold == 1 {
			return max(dfs(i-1, j, hold), dfs(i-1, j-1, 0)-prices[i])
		} else {
			return max(dfs(i-1, j, hold), dfs(i-1, j, 1)+prices[i])
		}
		return
	}
	return dfs(n-1, k, 0)
}

func maxProfit188_01(k int, prices []int) int {
	n := len(prices)
	dp := make([][][2]int, n+1)
	for i := range dp {
		dp[i] = make([][2]int, k+2)
		for j := range dp[i] {
			dp[i][j] = [2]int{math.MinInt / 2, math.MinInt / 2} // 防止溢出
		}
	}
	for j := 0; j <= k; j++ {
		dp[0][j+1][0] = 0
	}
	for i, p := range prices {
		// for j := 0; j <= k; j++ {
		for j := range k + 1 {
			dp[i+1][j+1][0] = max(dp[i][j+1][0], dp[i][j+1][1]+p)
			dp[i+1][j+1][1] = max(dp[i][j+1][1], dp[i][j][0]-p)
		}
	}
	return dp[n][k+1][0]
}
func maxProfit(prices []int) int {
	n := len(prices)
	dp := make([][][2]int, n+1)
	for i := range dp {
		dp[i] = make([][2]int, 4)
		for j := range dp[i] {
			dp[i][j] = [2]int{math.MinInt / 2, math.MinInt / 2} // 防止溢出
		}
	}
	for j := 0; j <= 2; j++ {
		dp[0][j+1][0] = 0
	}
	for i, p := range prices {
		// for j := 0; j <= k; j++ {
		for j := range 3 {
			dp[i+1][j+1][0] = max(dp[i][j+1][0], dp[i][j+1][1]+p)
			dp[i+1][j+1][1] = max(dp[i][j+1][1], dp[i][j][0]-p)
		}
	}
	return dp[n][3][0]
}
func numberOfWays(s string) (ans int64) {
	n := len(s)
	total0 := strings.Count(s, "0")
	cnt0 := 0
	for i, ch := range s {
		if ch == '0' {
			cnt1 := i - cnt0
			ans += int64(cnt1) * int64(n-total0-cnt1)
			cnt0++
		} else {
			ans += int64(cnt0) * (int64(total0 - cnt0))
		}
	}
	return
}

func myPow111(x float64, n int) float64 {
	ans := 1.0
	if n < 0 {
		n = -n
		x = 1 / x
	}
	for n > 0 {
		if n&1 == 1 {
			ans *= x
		}
		x *= x
		n >>= 1
	}
	return ans
}

const mod = 1e9 + 7

func myPow(x int, n int) int {
	ans := 1
	for n > 0 {
		if n&1 == 1 {
			ans = ans * x % mod
		}
		x = x * x % mod
		n >>= 1
	}
	return ans
}
func countGoodNumbers(n int64) int {
	// 偶数下标个数
	even := (n + 1) / 2
	// 奇数下标个数
	odd := n / 2
	return int(myPow(5, int(even))) * int(myPow(4, int(odd))) % mod
}
func maxSumTwoNoOverlap(nums []int, firstLen int, secondLen int) int {
	n := len(nums)
	preSum := make([]int, n+1)
	for i, x := range nums {
		preSum[i+1] = preSum[i] + x
	}
	f := func(firstLen, secondLen int) (ans int) {
		maxSum := 0
		for i := firstLen + secondLen; i < n; i++ {
			maxSum = max(maxSum, preSum[i-secondLen]-preSum[i-secondLen-firstLen])
			ans = max(ans, maxSum+preSum[i]-preSum[i-secondLen])
		}
		return
	}
	return max(f(firstLen, secondLen), f(secondLen, firstLen))
}

// maxSumOfThreeSubarrays 计算三个无重叠子数组的最大和的起始索引
func maxSumOfThreeSubarrays(nums []int, k int) []int {
	n := len(nums)
	// 计算前缀和后缀的初始和
	pre := sumSlice(nums[:k])
	suf := sumSlice(nums[n-k:])
	preM, sufM := pre, suf
	preI, sufI := 0, n-1
	// 存储前缀和后缀的最大和及其起始索引
	P := make([][2]int, n-k+1)
	S := make([][2]int, n-k+1)
	P[0] = [2]int{preM, preI}
	S[0] = [2]int{sufM, sufI}

	// 计算前缀最大和
	for i := 1; i < n-k+1; i++ {
		pre = pre - nums[i-1] + nums[i+k-1]
		if pre > preM {
			preM = pre
			preI = i
		}
		P[i] = [2]int{preM, preI}
	}

	// 计算后缀最大和
	for i := n - 2; i > k-2; i-- {
		suf = suf - nums[i+1] + nums[i-k+1]
		if suf >= sufM {
			sufM = suf
			sufI = i
		}
		S[n-(i+1)] = [2]int{sufM, sufI}
	}

	// 滑动中间窗口
	mx := 0
	ans := make([]int, 0)
	sm := sumSlice(nums[k-1 : k+k-1])
	for i := k; i < n-2*k+1; i++ {
		sm = sm - nums[i-1] + nums[i+k-1]
		pre, prei := P[i-k][0], P[i-k][1]
		suf, sufi := S[n-(i+2*k)][0], S[n-(i+2*k)][1]
		sm3 := sm + pre + suf
		if sm3 > mx {
			mx = sm3
			ans = []int{prei, i, sufi - k + 1}
		}
	}
	return ans
}

// sumSlice 计算切片元素的和
func sumSlice(slice []int) int {
	sum := 0
	for _, val := range slice {
		sum += val
	}
	return sum
}

func goodIndices111(nums []int, k int) (ans []int) {
	n := len(nums)
	suffix := make([]int, n)
	for i := n - 2; i >= 0; i-- {
		if suffix[i+1] >= suffix[i] {
			suffix[i] = suffix[i+1] + 1
		} else {
			suffix[i] = 0
		}
	}
	prefix := make([]int, n)
	for i := 1; i < n; i++ {
		if nums[i] <= nums[i-1] {
			prefix[i] = prefix[i-1] + 1
		} else {
			prefix[i] = 0
		}
	}
	fmt.Println(suffix)
	fmt.Println(prefix)
	for i := range nums {
		if prefix[i] >= k && suffix[i] >= k {
			ans = append(ans, i)
		}
	}
	return ans
}
func goodIndices(nums []int, k int) (ans []int) {
	n := len(nums)
	dec := make([]int, n)
	dec[n-1] = 1
	for i := n - 2; i >= 0; i-- {
		if nums[i] <= nums[i+1] {
			dec[i] = dec[i+1] + 1
		} else {
			dec[i] = 1
		}
	}
	for i, asc := 1, 1; i < n-k; i++ {
		if asc >= k && dec[i+1] >= k {
			ans = append(ans, i)
		}
		if nums[i-1] >= nums[i] {
			asc++
		} else {
			asc = 1
		}
	}
	return
}

func goodDaysToRobBank(security []int, time int) (ans []int) {
	n := len(security)
	if time*2 >= n { // i 最小为 time，而且需要满足 i+time<n，即 time*2<n，不满足则直接返回空数组
		return
	}
	dec := make([]int, n)
	for i := n - 2; i >= time; i-- {
		if security[i] <= security[i+1] {
			dec[i] = dec[i+1] + 1
		}
	}
	for i, asc := 0, 0; i < n-time; i++ {
		if i > 0 && security[i-1] >= security[i] {
			asc++
		} else {
			asc = 0
		}
		if asc >= time && dec[i] >= time {
			ans = append(ans, i)
		}
	}
	return
}
func minFlipsMonoIncr1(s string) (ans int) {
	ans = math.MaxInt
	n := len(s)
	// 前面有多少位的1  后面有多少位的0
	suffix := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		suffix[i] = suffix[i+1]
		if s[i] == '0' {
			suffix[i]++
		}
	}
	for i, pre := 0, 0; i < n; i++ {
		ans = min(ans, suffix[i+1]+pre)
		if s[i] == '1' {
			pre++
		}
	}
	return ans
}
func minFlipsMonoIncr(s string) (ans int) {
	n := len(s)
	cnt0 := strings.Count(s, "0")
	pre := 0
	ans = min(cnt0, n-cnt0)
	// 前面有多少位的1  后面有多少位的0
	for i := 0; i < n; i++ {
		if s[i] == '1' {
			pre++
		} else {
			cnt0--
		}
		ans = min(ans, cnt0+pre)
	}
	return ans
}
func increasingTriplet(nums []int) bool {
	// 前缀最小值  后缀最大值
	n := len(nums)
	suffix := make([]int, n)
	suffix[n-1] = nums[n-1]
	for i := n - 2; i >= 0; i-- {
		suffix[i] = max(suffix[i+1], nums[i])
	}
	prefix := nums[0]
	for i := 1; i < n-1; i++ {
		if prefix < nums[i] && nums[i] < suffix[i+1] {
			return true
		}
		prefix = min(prefix, nums[i])
	}
	return false
}
func minimumDeletions(s string) (ans int) {
	n := len(s)
	cnt0 := strings.Count(s, "a")
	pre := 0
	ans = min(cnt0, n-cnt0)
	// 前面有多少位的b  后面有多少位的a
	for i := 0; i < n; i++ {
		if s[i] == 'b' {
			pre++
		} else {
			cnt0--
		}
		ans = min(ans, cnt0+pre)
	}
	return ans
}

func maximumSum(arr []int) (ans int) {
	n := len(arr)
	ans = slices.Max(arr)
	suffix := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		x := arr[i]
		if x >= 0 {
			suffix[i] = suffix[i+1] + x
		}
	}
	prefix := 0
	if arr[0] >= 0 {
		prefix = arr[0]
	}
	for i := 1; i < n-1; i++ {
		x := arr[i]
		if x >= 0 {
			ans = max(ans, prefix+x+suffix[i+1])
			prefix = prefix + x
		} else {
			ans = max(ans, prefix+suffix[i+1])
			prefix = 0
		}
	}
	return
}
