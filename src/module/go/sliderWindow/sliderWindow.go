package sliderwindow

import (
	"cmp"
	"fmt"
	"math"
	"slices"
	"sort"
	"strconv"
	"strings"
)

// 1456
func maxVowels(s string, k int) (ans int) {
	fmt.Println("test")
	vowel := 0
	for i, in := range s {
		// a, e, i, o, u
		if in == 'a' || in == 'e' || in == 'i' || in == 'o' || in == 'u' {
			vowel++
		}
		if i < k-1 {
			continue
		}
		ans = max(ans, vowel)
		out := s[i-k+1]
		if out == 'a' || out == 'e' || out == 'i' || out == 'o' || out == 'u' {
			vowel--
		}
	}
	return
}

// 643
func findMaxAverage(nums []int, k int) float64 {
	var sum int = 0
	maxS := math.MinInt
	for i, in := range nums {
		sum += in
		if i < k-1 {
			continue
		}
		maxS = max(maxS, sum)
		out := nums[i-k+1]
		sum -= out
	}
	return float64(maxS) / float64(k)
}

// 1343
func numOfSubarrays(arr []int, k int, threshold int) (cnt int) {
	sum := 0
	for i, in := range arr {
		sum += in
		if i < k-1 {
			continue
		}
		if sum/k >= threshold {
			cnt++
		}
		out := arr[i-k+1]
		sum -= out
	}
	return
}

// 2090
func getAverages(nums []int, k int) []int {
	if k == 0 {
		return nums
	}
	sum := 0
	res := make([]int, len(nums))
	for i := range res {
		res[i] = -1
	}
	// fmt.Println(nums)
	// 怎样给res里面的元素赋值-1
	for i, in := range nums {
		sum += in
		if i < 2*k {
			continue
		}
		// fmt.Println(i, sum, sum/(2*k+1))
		res[i-k] = sum / (2*k + 1)
		out := nums[i-2*k]
		sum -= out
	}
	return res
}

// 2379
func minimumRecolors(blocks string, k int) int {
	maxCnt := 0
	cnt := 0
	for i, in := range blocks {
		if in == 'B' {
			cnt++
		}
		if i < k-1 {
			continue
		}
		maxCnt = max(maxCnt, cnt)
		// // fmt.Println(i, cnt, maxCnt) // 若不需要调试信息可注释掉
		out := i - k + 1
		// 修正：判断左边界字符是否为 'B'
		if blocks[out] == 'B' {
			cnt--
		}
	}
	return k - maxCnt
}

// 1052
func maxSatisfied(customers []int, grumpy []int, minutes int) int {
	s := [2]int{}
	maxS1 := 0
	for i, c := range customers {
		s[grumpy[i]] += c
		if i < minutes-1 {
			continue
		}
		maxS1 = max(maxS1, s[1])
		out := i - minutes + 1
		if grumpy[out] == 1 {
			s[1] -= customers[out]
		}
	}
	return s[0] + maxS1
}

// 2841
func maxSum1(nums []int, m int, k int) (ans int64) {
	sum := int64(0)
	cnt := map[int]int{}
	for i, c := range nums {
		sum += int64(c)
		cnt[c]++
		if i < k-1 {
			continue
		}
		if len(cnt) >= m && sum > ans {
			ans = sum
		}
		out := i - k + 1
		sum -= int64(nums[out])
		cnt[nums[out]]--
		if cnt[nums[out]] == 0 {
			delete(cnt, nums[out])
		}
	}
	return
}
func maxSum(nums []int, m int, k int) (ans int64) {
	sum := int64(0)
	cnt := map[int]int{}
	for i, c := range nums {
		sum += int64(c)
		cnt[c]++
		if i < k-1 {
			continue
		}
		if len(cnt) >= m && sum > ans {
			ans = sum
		}
		out := i - k + 1
		outEle := nums[out]
		sum -= int64(outEle)
		cnt[outEle]--
		if cnt[outEle] == 0 {
			delete(cnt, outEle)
		}
	}
	return
}

// 2461
func maximumSubarraySum(nums []int, k int) (ans int64) {
	sum := int64(0)
	cnt := map[int]int{}
	for i, c := range nums {
		sum += int64(c)
		cnt[c]++
		if i < k-1 {
			continue
		}
		if len(cnt) == k && sum > ans {
			ans = sum
		}
		outEle := nums[i-k+1]
		sum -= int64(outEle)
		cnt[outEle]--
		if cnt[outEle] == 0 {
			delete(cnt, outEle)
		}
	}
	return
}

// 1423
func maxScore(cardPoints []int, k int) (ans int) {
	n := len(cardPoints)
	m := n - k%n

	sum := 0
	mimSum := math.MaxInt
	totalSum := 0
	for i, card := range cardPoints {
		totalSum += card
		sum += card
		if i < m-1 {
			continue
		}
		mimSum = min(mimSum, sum)
		// fmt.Println(i, i-m+1, sum)
		outEle := cardPoints[i-m+1]
		sum -= outEle
	}
	// fmt.Println(totalSum, mimSum)
	if k >= n {
		ans = totalSum
	} else {
		ans = totalSum - mimSum
	}
	return
}

// 1652
func decrypt1(code []int, k int) []int {
	n := len(code)
	res := make([]int, n)
	if k == 0 {
		return res
	}
	// 是否是正数
	flag := true
	if k < 0 {
		flag = false
		k = -k
	}
	sum := 0
	// 定长滑动窗口 （因为是循环窗口  所以是n*2）
	for i := 0; i < n*2; i++ {
		in := code[i%n]
		sum += in
		if i < k-1 {
			continue
		}
		if flag {
			// 如果是正数 应该填在i的前k个位置
			res[((i-k)%n+n)%n] = sum
		} else {
			// 如果是负数 应该填在i的右边一位
			res[((i+1)%n+n)%n] = sum
		}
		o := ((i-k+1)%n + n) % n
		out := code[o]
		sum -= out
	}
	return res
}
func decrypt(code []int, k int) []int {
	n := len(code)
	r := k + 1
	if k < 0 {
		k = -1
		r = n
	}
	sum := 0
	for i := r - k; i < r; i++ {
		sum += code[i]
	}
	ans := make([]int, n)
	for i := 0; i < n; i++ {
		ans[i] = sum
		sum += code[(r-i)%n] - code[(r-i-k)%n]
	}
	return ans
}

// 3
func lengthOfLongestSubstring1(s string) (ans int) {
	cnt := [128]int{}
	left := 0
	for i, c := range s {
		cnt[c]++
		for cnt[c] > 1 {
			cnt[s[left]]--
			left++
		}
		ans = max(ans, i-left+1)
	}
	return
}

// 3
func lengthOfLongestSubstring(s string) (ans int) {
	cnt := [128]bool{}
	left := 0
	for i, c := range s {
		for cnt[c] {
			cnt[s[left]] = false
			left++
		}
		cnt[c] = true
		ans = max(ans, i-left+1)
	}
	return
}

// 3090
func maximumLengthSubstring(s string) (maxLen int) {
	cnt := map[rune]int{}
	left := 0

	for i, in := range s {
		cnt[in]++
		for cnt[in] > 2 {
			cnt[rune(s[left])]--
			left++
		}
		maxLen = max(maxLen, i-left+1)
	}
	return

}
func maximumLengthSubstring1(s string) (maxLen int) {
	cnt := [26]int{}
	left := 0

	for i, in := range s {
		in -= 'a'
		cnt[in]++
		for cnt[in] > 2 {
			cnt[s[left]-'a']--
			left++
		}
		maxLen = max(maxLen, i-left+1)
	}
	return

}

// 1297
func maxFreq(s string, maxLetters int, minSize int, maxSize int) int {
	// TODO 这个没做出来
	// cnt := map[string]int{}
	left := 0
	winCnt := map[rune]int{}

	for i, in := range s {
		winCnt[in]++
		for len(winCnt) > maxLetters || i-left+1 > maxSize {
			out := s[left]
			left++
			winCnt[rune(out)]--
			if winCnt[rune(out)] == 0 {
				delete(winCnt, rune(out))
			}
		}
		// cnt[s[]]
	}
	return 0
}

// 1461
func hasAllCodes(s string, k int) bool {
	set := map[string]bool{}
	n := len(s)
	for i := 0; i <= n-k; i++ {
		set[s[i:i+k]] = true
	}
	return len(set) == 1<<k
}

// 2134
func minSwaps1(nums []int) int {
	// 先统计1的个数
	// 定长为k个数的窗口中0的数量最少
	cnt1 := 0
	for _, v := range nums {
		if v == 1 {
			cnt1++
		}
	}
	// println("1的个数是", cnt1)
	n := len(nums)
	if cnt1 == 0 {
		return 0
	}
	winCnt0 := 0
	minWinCnt0 := math.MaxInt
	for i := 0; i < n*2; i++ {
		x := nums[i%n]
		if x == 0 {
			winCnt0++
		}
		if i < cnt1-1 {
			continue
		}
		// println(i,winCnt0)
		minWinCnt0 = min(minWinCnt0, winCnt0)
		o := (i - cnt1 + 1) % n
		outE := nums[o]
		if outE == 0 {
			winCnt0--
		}
	}
	return minWinCnt0
}

// 下面是灵神的写法
func minSwaps(nums []int) int {
	// 先统计1的个数
	// 定长为k个数的窗口中1的数量最大
	cnt1 := 0
	for _, v := range nums {
		cnt1 += v
	}
	// println("1的个数是", cnt1)
	n := len(nums)

	winCnt1 := 0
	maxWinCnt1 := math.MinInt
	for i := 0; i < n*2; i++ {
		x := nums[i%n]
		winCnt1 += x
		if i < cnt1-1 {
			continue
		}
		// println(i,winCnt0)
		maxWinCnt1 = max(maxWinCnt1, winCnt1)
		winCnt1 -= nums[(i-cnt1+1)%n]
	}
	return cnt1 - maxWinCnt1
}

// 2653
func getSubarrayBeauty(nums []int, k int, x int) []int {
	const bias = 50
	cnt := [bias*2 + 1]int{}
	ans := make([]int, len(nums)-k+1)
	for i, in := range nums {
		// 滑入窗口
		cnt[in+bias]++
		if i < k-1 {
			continue
		}
		left := x
		for j, v := range cnt[:bias] {
			left -= v
			if left <= 0 {
				ans[i-k+1] = j - bias
				break
			}
		}
		// 滑出窗口
		cnt[nums[i-k+1]+50]--
	}
	return ans
}

// 2269
func divisorSubstrings(num int, k int) (ans int) {
	s := strconv.Itoa(num)
	n := len(s)

	for i := 0; i <= n-k; i++ {
		v, _ := strconv.Atoi(s[i : i+k])
		if v > 0 && num%v == 0 {
			ans++
		}
	}
	return
}

// 1984
func minimumDifference(nums []int, k int) int {
	ans := math.MaxInt
	// 从小到大排序
	sort.Ints(nums)
	for i := k - 1; i < len(nums); i++ {
		mn := nums[i-k+1]
		mx := nums[i]
		ans = min(ans, mx-mn)
	}
	return ans
}

// 624
func maxDistance1(arrays [][]int) (ans int) {
	// 这个写法是O(n^2) 会超时的
	for i := 0; i < len(arrays); i++ {
		for j := 0; j < len(arrays); j++ {
			if i == j {
				continue
			}
			ans = max(ans,
				arrays[j][len(arrays[j])-1]-arrays[i][0],
				arrays[i][len(arrays[i])-1]-arrays[j][0])
		}
	}
	return
}
func maxDistance(arrays [][]int) (ans int) {
	mn := math.MaxInt >> 1
	mx := math.MinInt >> 1
	for _, a := range arrays {
		x := a[0]
		y := a[len(a)-1]
		ans = max(ans, y-mn, mx-x)
		mn = min(mn, x)
		mx = max(mx, y)
	}
	return
}

// 1493
func longestSubarray(nums []int) int {
	maxlen := 0
	n := len(nums)
	left := 0
	// 窗口中包含0的个数
	winCnt0 := 0
	for right := 0; right < n; right++ {
		if nums[right] == 0 {
			winCnt0++
		}
		for left <= right && winCnt0 > 1 {
			if nums[left] == 0 {
				winCnt0--
			}
			left++
		}
		maxlen = max(maxlen, right-left+1-max(1, winCnt0))
	}
	return maxlen
}

// 1208
func abs(a int) int {
	if a > 0 {
		return a
	}
	return -a
}
func equalSubstring(s string, t string, maxCost int) int {
	maxlen := 0
	n := len(s)
	left := 0
	// 窗口中的预算
	winCost := 0
	for right := 0; right < n; right++ {
		cost := abs(int(s[right]) - int(t[right]))
		winCost += cost
		for left <= right && winCost > maxCost {
			cost = abs(int(s[left]) - int(t[left]))
			winCost -= cost
			left++
		}
		maxlen = max(maxlen, right-left+1)
	}
	return maxlen
}

// 2730
func longestSemiRepetitiveSubstring(s string) (maxLen int) {
	// 是否有相邻且相等的
	cnt := 0
	left := 0
	for i, c := range s {
		if i > 0 && rune(s[i-1]) == c {
			cnt++
		}
		for left <= i && cnt > 1 {
			if s[left+1] == s[left] {
				cnt--
			}
			left++
		}
		maxLen = max(maxLen, i-left+1)
	}
	return
}

// 904
func totalFruit(fruits []int) (ans int) {
	// 也就是说map里面的size最多只能为2  求最长宽度
	cnt := map[int]int{}
	left := 0
	for i, v := range fruits {
		cnt[v]++
		for len(cnt) > 2 {
			cnt[fruits[left]]--
			if cnt[fruits[left]] == 0 {
				delete(cnt, fruits[left])
			}
			left++
		}
		ans = max(ans, i-left+1)
	}
	return
}

// 这是别人写的 说明for里第一句是可以多条声明语句的
func maximumUniqueSubarray1(nums []int) (maxSum int) {
	set := map[int]bool{}
	for start, end, sum := 0, 0, 0; end < len(nums); end++ {
		//题目说了,删除包含若干个不同元素的子数组,如果重复,那肯定是不需要的.
		for set[nums[end]] { // 因重复而剔除start元素
			sum -= nums[start]
			delete(set, nums[start])
			start++
		}
		sum += nums[end]          // 加入end元素后的sum
		maxSum = max(maxSum, sum) // 求max
		set[nums[end]] = true     // 加入end元素
	}
	return
}

// 1695
func maximumUniqueSubarray(nums []int) (maxSum int) {
	set := map[int]bool{}
	left := 0
	sum := 0
	for _, v := range nums {
		for set[v] {
			set[nums[left]] = false
			sum -= nums[left]
			left++
		}
		sum += v
		set[v] = true
		maxSum = max(maxSum, sum)
	}
	return
}

// 2958
func maxSubarrayLength(nums []int, k int) (maxLen int) {
	cnt := map[int]int{}
	left := 0
	for i, v := range nums {
		cnt[v]++
		for cnt[v] > k {
			cnt[nums[left]]--
			left++
		}
		maxLen = max(i-left+1, maxLen)
	}
	return
}

// 2779
func maximumBeauty(nums []int, k int) (maxLen int) {
	// 从小到大排序
	// sort.Ints(nums)
	slices.Sort(nums)
	left := 0
	for i, v := range nums {
		for left <= i && nums[left] < v-2*k {
			left++
		}
		maxLen = max(maxLen, i-left+1)
	}
	return
}

// 2024
func maxConsecutiveAnswers(answerKey string, k int) (cnt int) {
	oper := [2]int{}
	left := 0
	for i, v := range answerKey {
		if v == 'T' {
			oper[0]++
		} else {
			oper[1]++
		}
		for oper[0] > k && oper[1] > k {
			outer := answerKey[left]
			if outer == 'T' {
				oper[0]--
			} else {
				oper[1]--
			}
			left++
		}
		cnt = max(cnt, i-left+1)
	}
	return
}

// 2024  这是灵神简洁的代码
func maxConsecutiveAnswers1(answerKey string, k int) (cnt int) {
	oper := [2]int{}
	left := 0
	for i, v := range answerKey {
		oper[v>>1&1]++
		for oper[0] > k && oper[1] > k {
			outer := answerKey[left]
			oper[outer>>1&1]--
			left++
		}
		cnt = max(cnt, i-left+1)
	}
	return
}

// 1004
func longestOnes1(nums []int, k int) (maxLen int) {
	// 窗口中0的个数
	winCnt0 := 0
	left := 0
	for i, v := range nums {
		if v == 0 {
			winCnt0++
		}
		for winCnt0 > k {
			if nums[left] == 0 {
				winCnt0--
			}
			left++
		}
		maxLen = max(maxLen, i-left+1)
	}
	return
}
func longestOnes(nums []int, k int) (maxLen int) {
	// 窗口中0的个数
	winCnt0 := 0
	left := 0
	for i, v := range nums {
		// 像这种要判断的地方多想一下是否可以不要if
		winCnt0 += 1 - v
		for winCnt0 > k {
			winCnt0 -= 1 - nums[left]
			left++
		}
		maxLen = max(maxLen, i-left+1)
	}
	return
}

// 1658
func minOperations_1658(nums []int, x int) (ans int) {
	// 先求出totalSum
	// 中间target 的最大长度
	totalSum := 0
	for _, v := range nums {
		totalSum += v
	}
	target := totalSum - x
	if target < 0 {
		return -1
	}
	winSum := 0
	left := 0
	winMaxLen := -1
	for i, v := range nums {
		winSum += v
		for winSum > target {
			winSum -= nums[left]
			left++
		}
		if winSum == target {
			winMaxLen = max(winMaxLen, i-left+1)
		}
	}
	if winMaxLen == -1 {
		return winMaxLen
	} else {
		return len(nums) - winMaxLen
	}
}

// 1838
func maxFrequency1(nums []int, k int) int {
	n := len(nums)
	// 特殊情况  当只有一个元素的时候
	if n == 1 {
		return 1
	}
	sort.Ints(nums)
	ans := -1
	cnt := 0
	left := 0
	for i := 1; i < len(nums); i++ {
		// 前面的元素都变成当前元素
		cnt += (i - left) * (nums[i] - nums[i-1])
		for left <= i && cnt > k {
			// 移除最左边元素的增量
			cnt -= nums[i] - nums[left]
			left++
		}
		if cnt <= k && cnt >= 0 {
			ans = max(ans, i-left+1)
		}
	}
	return ans
}

// 1838  我晕呢  上面的写法优化下来只剩下这么点了
func maxFrequency(nums []int, k int) int {
	n := len(nums)
	sort.Ints(nums)
	ans := 1
	cnt := 0
	left := 0
	for i := 1; i < n; i++ {
		// 前面的元素都变成当前元素
		cnt += (i - left) * (nums[i] - nums[i-1])
		for cnt > k {
			// 移除最左边元素的增量
			cnt -= nums[i] - nums[left]
			left++
		}
		ans = max(ans, i-left+1)
	}
	return ans
}

// 2516
func takeCharacters(s string, k int) int {
	cnt := [3]int{}
	// 整个s字符串每种字符的个数
	for _, v := range s {
		// 一开始，把所有字母都取走
		cnt[v-'a']++
	}
	// 字母个数不足 k
	if cnt[0] < k || cnt[1] < k || cnt[2] < k {
		return -1
	}
	left := 0
	mx, left := 0, 0
	for i, v := range s {
		// 移入窗口，相当于不取走 c
		cnt[v-'a']--
		// 窗口之外的 c 不足 k
		for cnt[v-'a'] < k {
			// 移出窗口，相当于取走 s[left]
			cnt[s[left]-'a']++
			left++
		}
		mx = max(mx, i-left+1)
	}
	return len(s) - mx
}

// 2831
func longestEqualSubarray(nums []int, k int) (ans int) {
	posLists := make([][]int, len(nums)+1)
	for i, x := range nums {
		posLists[x] = append(posLists[x], i)
	}
	for _, pos := range posLists {
		if len(pos) <= ans {
			// 无法让ans变得更大
			continue
		}
		left := 0
		for right, p := range pos {
			// p-pos[left]+1 这个是整段长度  right-left+1是窗口长度
			for p-pos[left]+1-(right-left+1) > k {
				left++
			}
			ans = max(ans, right-left+1)
		}
	}
	return
}

// 2271
func maximumWhiteTiles(tiles [][]int, carpetLen int) (ans int) {
	slices.SortFunc(tiles, func(a, b []int) int {
		return a[0] - b[0]
	})
	cover := 0
	n := len(tiles)
	left := 0
	for right := 0; right < n; right++ {
		// 把右边长度加进来
		cover += tiles[right][1] - tiles[right][0] + 1
		for tiles[left][1] < tiles[right][1]-carpetLen+1 {
			cover -= tiles[left][1] - tiles[left][0] + 1
			left++
		}
		uncover := max(0, tiles[right][1]-carpetLen+1-tiles[left][0])
		ans = max(ans, cover-uncover)
	}
	return ans
}

// 2555
func maximizeWin(pos []int, k int) (ans int) {
	n := len(pos)
	preSum := make([]int, n+1)
	left := 0
	for right := 0; right < n; right++ {
		for pos[right]-pos[left] > k {
			left++
		}
		ans = max(ans, right-left+1+preSum[left])
		// 上一个线段的最大长度
		preSum[right+1] = max(preSum[right], right-left+1)
	}
	return ans
}

// 2009
func minOperations_2009(nums []int) int {
	n := len(nums)
	slices.Sort(nums)
	a := slices.Compact(nums)
	left := 0
	ans := 0
	for right, x := range a {
		for a[left] < x-n+1 {
			left++
		}
		ans = max(ans, right-left+1)
	}
	return n - ans
}

// 209
func minSubArrayLen1(target int, nums []int) int {
	// 我自己写的循环内更新
	ans := math.MaxInt
	left, sum := 0, 0
	for right, x := range nums {
		sum += x
		for sum >= target {
			ans = min(ans, right-left+1)
			sum -= nums[left]
			left++
		}
	}
	if ans == math.MaxInt {
		return 0
	}
	return ans
}
func minSubArrayLen(target int, nums []int) int {
	// 循环外更新
	ans := math.MaxInt
	left, sum := 0, 0
	for right, x := range nums {
		sum += x
		for sum-nums[left] >= target {
			sum -= nums[left]
			left++
		}
		if sum >= target {
			ans = min(ans, right-left+1)
		}
	}
	if ans == math.MaxInt {
		return 0
	}
	return ans
}

// 2904
func shortestBeautifulSubstring(s string, k int) string {
	if strings.Count(s, "1") < k {
		return ""
	}
	ans := s
	left := 0
	// 窗口中1的个数
	cnt := 0
	// minLen := math.MaxInt
	for right, c := range s {
		// cnt += int(c - '0')
		cnt += int(c & 1)

		for cnt > k || s[left] == '0' {
			cnt -= int(s[left] & 1)
			left++
		}
		if cnt == k {
			t := s[left : right+1]
			if len(t) < len(ans) || (len(t) == len(ans) && t < ans) {
				ans = t
			}
		}
	}
	return ans
}

// 1234 这个确实不是那么容易理解  "WQWRQQQW"
// 'Q', 'W', 'E', 'R'
// WQWRQQQW
// WQERQERW
func balancedString(s string) int {
	// TODO 这个题意还需要再理解一下
	n := len(s)
	m := n / 4
	cnt := ['X']int{}
	for _, c := range s {
		cnt[c]++
	}
	if cnt['W'] == m && cnt['E'] == m && cnt['R'] == m && cnt['Q'] == m {
		return 0
	}
	ans := len(s)
	left := 0
	for right, c := range s {
		cnt[c]--
		for cnt['W'] <= m && cnt['E'] <= m && cnt['R'] <= m && cnt['Q'] <= m {
			fmt.Println(left, right)
			ans = min(ans, right-left+1)
			cnt[s[left]]++
			left++
		}
	}
	return ans
}

// 2875
func minSizeSubarray(nums []int, target int) int {
	totalSum := 0
	for _, x := range nums {
		totalSum += x
	}
	ans := math.MaxInt
	winTarget := target % totalSum
	left, s, n := 0, 0, len(nums)
	for right := 0; right < 2*n; right++ {
		x := nums[right%n]
		s += x
		for s > winTarget {
			s -= nums[left%n]
			left++
		}
		if s == winTarget {
			ans = min(ans, right-left+1)
		}
	}
	if ans == math.MaxInt {
		return -1
	}
	return ans + target/totalSum*n
}

// 76
func minWindow(s string, t string) string {
	cnt := [128]int{}
	needCount := 0
	for _, c := range t {
		if cnt[c] == 0 {
			needCount++
		}
		cnt[c]++
	}
	ansLeft, ansRight := -1, len(s)
	left := 0
	for right, c := range s {
		cnt[c]--
		if cnt[c] == 0 {
			needCount--
		}
		for needCount == 0 {
			if right-left < ansRight-ansLeft {
				ansLeft, ansRight = left, right
			}
			if cnt[s[left]] == 0 {
				needCount++
			}
			cnt[s[left]]++
			left++
		}
	}
	if ansLeft < 0 {
		return ""
	}
	return s[ansLeft : ansRight+1]
}

// 1358
func numberOfSubstrings_1358(s string) (ans int) {
	cnt := [3]int{}
	left := 0
	for _, c := range s {
		cnt[c-'a']++
		// for cnt[0] > 0 && cnt[1] > 0 && cnt[2] > 0 {

		for cnt[0] >= 1 && cnt[1] >= 1 && cnt[2] >= 1 {
			cnt[s[left]-'a']--
			left++
		}
		ans += left
	}
	return
}

// 2962
func countSubarrays1(nums []int, k int) (ans int64) {
	mx := math.MinInt
	for _, v := range nums {
		mx = max(mx, v)
	}
	left := 0
	cnt := 0
	for _, v := range nums {
		if v == mx {
			cnt++
		}
		for cnt >= k {
			if nums[left] == mx {
				cnt--
			}
			left++
		}
		ans += int64(left)
	}
	return
}

// 灵神  数组求最大值
func countSubarrays_2962(nums []int, k int) (ans int64) {
	mx := slices.Max(nums)
	left := 0
	cnt := 0
	for _, v := range nums {
		if v == mx {
			cnt++
		}
		for cnt >= k {
			if nums[left] == mx {
				cnt--
			}
			left++
		}
		ans += int64(left)
	}
	return
}

// 3325
func numberOfSubstrings_3325(s string, k int) (ans int) {
	cnt := [26]int{}
	left := 0
	for _, c := range s {
		cnt[c-'a']++
		// 第一反应是判断cn中任一一个字符>=k  但是当前只有c-'a'这个index操作了 所以判断这一个就行了
		for cnt[c-'a'] >= k {
			cnt[s[left]-'a']--
			left++
		}
		ans += left
	}
	return ans
}

// 2799
func countCompleteSubarrays(nums []int) (ans int) {
	cnt := map[int]int{}
	for _, v := range nums {
		cnt[v]++
	}
	winCnt := map[int]int{}
	left := 0
	for _, v := range nums {
		winCnt[v]++
		for len(winCnt) == len(cnt) {
			winCnt[nums[left]]--
			if winCnt[nums[left]] == 0 {
				delete(winCnt, nums[left])
			}
			left++
		}
		ans += left
	}
	return ans
}

// 2537  这个题目第一反应没出来
func countGood1(nums []int, k int) (ans int64) {
	cnt := map[int]int{}
	left := 0
	pair := 0
	for _, v := range nums {
		pair += cnt[v]
		cnt[v]++
		for pair >= k {
			cnt[nums[left]]--
			pair -= cnt[nums[left]]
			left++
		}
		ans += int64(left)
	}
	return ans
}

// 3298
func validSubstringCount(word1 string, word2 string) (ans int64) {
	cnt := [26]int{}
	needCount := 0
	for _, c := range word2 {
		if cnt[c-'a'] == 0 {
			needCount++
		}
		cnt[c-'a']++
	}
	left := 0
	for _, c := range word1 {
		cnt[c-'a']--
		if cnt[c-'a'] == 0 {
			needCount--
		}
		for needCount == 0 {
			if cnt[word1[left]-'a'] == 0 {
				needCount++
			}
			cnt[word1[left]-'a']++
			left++
		}
		ans += int64(left)
	}
	return ans
}

// 713
func numSubarrayProductLessThanK(nums []int, k int) (ans int) {
	prod := 1
	left := 0
	for right, v := range nums {
		prod *= v
		for left <= right && prod >= k {
			prod /= nums[left]
			left++
		}
		ans += right - left + 1
	}
	return
}

// 3258
func countKConstraintSubstrings_3258_a(s string, k int) (ans int) {
	cnt := [2]int{}
	left := 0
	for right, c := range s {
		cnt[c&1]++
		for cnt[0] > k && cnt[1] > k {
			cnt[s[left]&1]--
			left++
		}
		ans += right - left + 1
	}
	return
}

// 2302
func countSubarrays(nums []int, k int64) (ans int64) {
	var sum int64 = 0
	left := 0
	for right, v := range nums {
		sum += int64(v)
		for int64(right-left+1)*sum >= k {
			sum -= int64(nums[left])
			left++
		}
		ans += int64(right) - int64(left) + 1
	}
	return
}

// 2762 温习
func continuousSubarrays(nums []int) (ans int64) {
	// 求子数组中最大值减去最小值不能大于2
	cnt := map[int]int{}
	left := 0
	for right, v := range nums {
		cnt[v]++
		for {
			mx, mn := v, v
			for k := range cnt {
				mx = max(mx, k)
				mn = min(mn, k)
			}
			if mx-mn <= 2 {
				break
			}
			y := nums[left]
			cnt[y]--
			if cnt[y] == 0 {
				delete(cnt, y)
			}
			left++
		}
		ans += int64(right - left + 1)
	}
	return ans
}

// 930 要温习
func numSubarraysWithSum(nums []int, goal int) (ans int) {
	sum := 0
	cnt := map[int]int{}
	cnt[0] = 1
	for _, v := range nums {
		sum += v
		ans += cnt[sum-goal]
		cnt[sum]++
	}
	return
}

// 3258
func countKConstraintSubstrings_3258(s string, k int) (ans int) {
	left := 0
	cnt := [2]int{}
	for right, c := range s {
		cnt[c-'0']++
		for cnt[0] > k && cnt[1] > k {
			cnt[s[left]-'0']--
			left++
		}
		ans += right - left + 1
	}
	return ans
}

// 3261
func countKConstraintSubstrings(s string, k int, queries [][]int) []int64 {
	n := len(s)
	posLeft := make([]int, n)
	preSum := make([]int, n+1)
	l := 0
	cnt := [2]int{}
	for r, c := range s {
		cnt[c-'0']++
		for cnt[0] > k && cnt[1] > k {
			cnt[s[l]-'0']--
			l++
		}
		posLeft[r] = l
		preSum[r+1] = preSum[r] + r - l + 1
	}
	m := len(queries)
	ans := make([]int64, m)
	fmt.Println(posLeft)
	for i, q := range queries {
		l, r := q[0], q[1]
		// fmt.Println(posLeft[l:r+1], l, sort.SearchInts(posLeft[l:r+1], l))
		// sort.SearchInts(posLeft[l:r+1], l) 搜索l在posLeft[l:r+1]出现的第一个索引位置
		j := l + sort.SearchInts(posLeft[l:r+1], l)
		ans[i] = int64((preSum[r+1] - preSum[j]) + (j-l+1)*(j-l)/2)
	}
	return ans
}

// 3134
// check_3134 检查满足唯一度不超过 upper 的子数组数量是否不少于 k
func check_3134(nums []int, upper int, k int) bool {
	cnt := 0
	left := 0
	freq := make(map[int]int)
	for right, v := range nums {
		freq[v]++
		// 当唯一度超过 upper 时，移动左指针
		for len(freq) > upper {
			freq[nums[left]]--
			if freq[nums[left]] == 0 {
				delete(freq, nums[left])
			}
			left++
		}
		// 统计满足条件的子数组数量
		cnt += right - left + 1
		if cnt >= k {
			return true
		}
	}
	return false
}

// medianOfUniquenessArray 计算数组所有子数组的唯一度中位数
func medianOfUniquenessArray(nums []int) int {
	n := len(nums)
	// 总共的子数组个数
	totalSize := (1 + n) * n / 2
	k := (totalSize + 1) / 2
	left, right := 0, n
	for left < right {
		mid := left + (right-left)/2
		if check_3134(nums, mid, k) {
			right = mid
		} else {
			left = mid + 1
		}
	}
	return left
}

// TODO 看到3439来了
func abs_2593(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func f_2593(s string, k int) (ans int) {
	for m := 1; m <= 26 && m*k <= len(s); m++ {
		cnt := [26]int{}
		check := func() {
			for i := range cnt {
				if cnt[i] >= 0 && cnt[i] != k {
					return
				}
			}
			// 刚好每个字符都等于k
			ans++
		}
		for right, in := range s {
			cnt[in-'a']++
			// 刚好包含了k*m个字符  这里用的是if  所以
			if left := right + 1 - k*m; left >= 0 {
				check()
				cnt[s[left]-'a']--
			}
		}
	}
	return
}

// 2593
func countCompleteSubstrings(word string, k int) (ans int) {
	n := len(word)
	i := 0
	for i < n {
		start := i
		i++
		for i < n && abs_2593(int(word[i])-int(word[i-1])) <= 2 {
			i++
		}
		ans += f_2593(word[start:i], k)
	}
	return
}

// 462
func minMoves2(nums []int) (ans int) {
	slices.Sort(nums)
	mid := len(nums) / 2
	for _, x := range nums {
		ans += abs_2593(x - nums[mid])
	}
	return
}

// 2602
func minOperations(nums []int, queries []int) []int64 {
	slices.Sort(nums)
	fmt.Println(nums)
	n := len(nums)
	sum := make([]int, n+1)
	for i, v := range nums {
		sum[i+1] = sum[i] + v
	}
	ans := make([]int64, len(queries))
	for i, q := range queries {
		j := sort.SearchInts(nums, q)
		fmt.Println(q, j)
		// j是开区间
		left := q*j - sum[j]
		right := sum[n] - sum[j] - q*(n-j)
		ans[i] = int64(left + right)
	}
	return ans
}

// 2593
func findScore(nums []int) (ans int64) {
	n := len(nums)
	type pair struct{ v, i int }
	a := make([]pair, n+1)
	for i, v := range nums {
		a[i] = pair{v, i}
	}
	sort.Slice(a, func(i, j int) bool {
		a, b := a[i], a[j]
		return a.v < b.v || a.v == b.v && a.i < b.i
	})
	vis := make([]bool, n+2)
	for _, p := range a {
		if !vis[p.i] {
			vis[p.i-1] = true
			vis[p.i+1] = true
			ans += int64(p.v)
		}
	}
	return
}
func findScore1(nums []int) (ans int64) {
	n := len(nums)
	type pair struct{ v, i int }
	a := make([]pair, n)
	for i, v := range nums {
		a[i] = pair{v, i + 1}
	}
	/* sort.Slice(a, func(i, j int) bool {
		a, b := a[i], a[j]
		return a.v < b.v || a.v == b.v && a.i < b.i
	}) */
	slices.SortStableFunc(a, func(a, b pair) int {
		return cmp.Or(cmp.Compare(a.v, b.v), cmp.Compare(a.i, b.i))
	})
	vis := make([]bool, n+2)
	for _, p := range a {
		if !vis[p.i] {
			vis[p.i-1] = true
			vis[p.i+1] = true
			ans += int64(p.v)
		}
	}
	return
}

// findSubstringInWraproundString 计算字符串 s 中所有在环绕字符串 "abcdefghijklmnopqrstuvwxyz" 里的不同非空子串的数量
func findSubstringInWraproundString(s string) (ans int) {
	// 用于记录以每个字母结尾的最长连续子串的长度
	cnt := make([]int, 26)
	n := len(s)
	i := 0
	for i < n {
		start := i
		i++
		for i < n && (s[i]-s[i-1]+26)%26 == 1 {
			i++
		}
		size := i - start
		if size > cnt[s[start]-'a'] {
			cnt[s[start]-'a'] = size
		}
	}
	/* for i := 0; i < n; i++ {
			// 如果当前字符和前一个字符不是连续环绕的，重置长度
			if i > 0 && (s[i]-s[i-1]+26)%26 != 1 {
					length = 0
			}
			length++
			index := int(s[i] - 'a')
			// 更新以当前字母结尾的最长连续子串长度
			if length > cnt[index] {
					cnt[index] = length
			}
			fmt.Println(cnt)
	} */
	// 累加每个字母结尾的最长连续子串长度，得到不同非空子串的总数
	for _, v := range cnt {
		ans += v
	}
	return ans
}

// 3305
func check3305(word string, k int) (ans int) {
	// 元音
	cnt := map[rune]int{}
	// 辅音
	cnt2 := 0
	left := 0
	for right, ch := range word {
		if strings.ContainsRune("aeiou", ch) {
			cnt[ch]++
		} else {
			cnt2++
		}
		for left <= right && len(cnt) >= 5 && cnt2 >= k {
			y := rune(word[left])
			if strings.ContainsRune("aeiou", y) {
				cnt[y]--
				if cnt[y] == 0 {
					delete(cnt, y)
				}
			} else {
				cnt2--
			}
			left++
		}
		ans += left
	}
	return
}
func countOfSubstrings(word string, k int) int {
	return check3305(word, k) - check3305(word, k+1)
}
func countGood(nums []int, k int) (ans int64) {
	cnt := map[int]int64{}
	left := 0
	var pair int64
	for _, x := range nums {
		pair += cnt[x]
		cnt[x]++
		for pair >= int64(k) {
			cnt[nums[left]]--
			pair-=cnt[nums[left]]
			left++
		}
		ans+=int64(left)
	}
	return
}
