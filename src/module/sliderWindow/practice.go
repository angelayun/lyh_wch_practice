package sliderwindow

import (
	"math"
)

// 1456
func maxVowels(s string, k int) (ans int) {
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
	cnt := map[string]int{}
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
