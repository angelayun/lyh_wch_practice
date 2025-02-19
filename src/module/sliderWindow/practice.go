package sliderwindow

import (
	"fmt"
	"math"
	"slices"
	"sort"
	"strconv"
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
func decrypt(code []int, k int) []int {
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
	// TODO
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
