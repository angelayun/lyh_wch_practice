package daily

import (
	"math"
	"slices"
	"strconv"
	"strings"
	"unicode"
)

// 3462
func maxSum(grid [][]int, limits []int, k int) (ans int64) {
	temp := []int{}
	cmp := func(a, b int) int { return b - a }
	for i, rows := range grid {
		slices.SortFunc(rows, cmp)
		for _, col := range rows {
			if limits[i] > 0 {
				temp = append(temp, col)
				limits[i]--
			} else {
				break
			}
		}
	}
	slices.SortFunc(temp, cmp)
	for _, v := range temp[:k] {
		ans += int64(v)
	}
	return ans
}

// 3456
func hasSpecialSubstring1(s string, k int) bool {
	n := len(s)
	cnt := 0
	for i, _ := range s {
		cnt++
		if i == n-1 || s[i+1] != s[i] {
			if cnt == k {
				return true
			}
			cnt = 0
		}
	}
	return false
}
func hasSpecialSubstring(s string, k int) bool {
	n := len(s)
	i := 0
	for i < n {
		start := i
		i++
		for i < n && s[i-1] == s[i] {
			i++
		}
		if i-start == k {
			return true
		}
	}
	return false
}

// 3452
func sumOfGoodNumbers(nums []int, k int) (ans int) {
	n := len(nums)
	for i, v := range nums {
		if (i-k < 0 || v > nums[i-k]) && (i+k >= n || v > nums[i+k]) {
			ans += v
		}
	}
	return
}

// 3447
func assignElements(groups []int, elements []int) []int {
	mx := slices.Max(groups)
	target := make([]int, mx+1)
	for i := range target {
		target[i] = -1
	}
	for i, x := range elements {
		// target[x] 比方说2把8标记过了 这时候x为8 就..
		if x > mx || target[x] >= 0 {
			continue
		}
		for y := x; y <= mx; y += x {
			// 没有被标记过 标记为i
			if target[y] < 0 {
				target[y] = i
			}
		}
	}
	for i, x := range groups {
		groups[i] = target[x]
	}
	return groups
}

// 1328
func breakPalindrome(palindrome string) string {
	s := []byte(palindrome)
	n := len(s)
	if n <= 1 {
		return ""
	}
	for i := 0; i < n>>1; i++ {
		if s[i] != 'a' {
			s[i] = 'a'
			return string(s)
		}
	}
	s[n-1] = 'a'
	return string(s)
}

// 3442
func maxDifference(s string) int {
	// 最大奇数次  - 最小正偶数次
	cnt := [26]int{}
	for _, c := range s {
		cnt[c-'a']++
	}
	mx := 0
	mn := math.MaxInt
	for _, v := range cnt {
		if v > 0 {
			if v&1 == 1 {
				mx = max(mx, v)
			} else {
				mn = min(mn, v)
			}

		}
	}
	return mx - mn
}

// 3443
func abs(a int) int {
	if a > 0 {
		return a
	}
	return -a
}
func maxDistance(s string, k int) (ans int) {
	cnt := ['X']int{}
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

// 2444
func countSubarrays(nums []int, minK int, maxK int) (ans int64) {
	minI, maxI, i0 := -1, -1, -1
	for i, x := range nums {
		if x == minK {
			minI = i
		}
		if x == maxK {
			maxI = i
		}
		if x < minK || x > maxK {
			i0 = i
		}
		ans += int64(max(0, min(minI, maxI)-i0))
	}
	return
}

// 3306
func f_3306(word string, k int) (ans int64) {
	// strconv.FormatUint()
	strconv.Atoi(word)
	cnt := map[rune]int{}
	cnt0 := 0
	left := 0
	for _, ch := range word {
		if strings.ContainsRune("aeiou", ch) {
			cnt[ch]++
		} else {
			cnt0++
		}
		for len(cnt) >= 5 && cnt0 >= k {
			y := word[left]
			if strings.ContainsRune("aeiou", rune(y)) {
				cnt[rune(y)]--
				if cnt[rune(y)] == 0 {
					delete(cnt, rune(y))
				}
			} else {
				cnt0--
			}
			left++
		}
		ans += int64(left)
	}
	return
}
func countOfSubstrings(word string, k int) (ans int64) {
	// vowels := "aeiou"
	return f_3306(word, k) - f_3306(word, k+1)
}

// 3438
func findValidPair(s string) string {
	cnt := [10]int{}
	for _, ch := range s {
		cnt[ch-'0']++
	}
	for i := 0; i < len(s)-1; i++ {
		x, y := s[i]-'0', s[i+1]-'0'
		if x != y && cnt[x] == int(x) && cnt[y] == int(y) {
			return s[i : i+2]
		}
	}
	return ""
}

// 3432
func countPartitions(nums []int) (ans int) {
	n := len(nums)
	sum := 0
	for _, v := range nums {
		sum += v
	}
	if sum&1 == 0 {
		return n - 1
	}
	return 0
}

// 3433
func countMentions(numberOfUsers int, events [][]string) []int {
	return []int{}
}

// 2597
func beautifulSubsets1(nums []int, k int) int {
	// 去掉空集
	ans := -1
	cnt := map[int]int{}
	var dfs func(int)
	dfs = func(i int) {
		if i == len(nums) {
			ans++
			return
		}
		// 不选
		dfs(i + 1)
		x := nums[i]
		if cnt[x-k] == 0 && cnt[x+k] == 0 {
			cnt[x]++
			dfs(i + 1)
			cnt[x]--
		}
	}
	dfs(0)
	return ans
}
func beautifulSubsets(nums []int, k int) int {
	// 去掉空集
	ans := -1
	cnt := map[int]int{}
	var dfs func(int)
	dfs = func(i int) {
		ans++
		if i == len(nums) {
			return
		}
		for j := i; j < len(nums); j++ {
			x := nums[j]
			if cnt[x-k] == 0 && cnt[x+k] == 0 {
				cnt[x]++
				dfs(j + 1)
				cnt[x]--
			}
		}
	}
	dfs(0)
	return ans
}

// 1763
// longestNiceSubstring 函数用于找到字符串 s 中最长的美好子字符串
// longestNiceSubstring 函数用于找到字符串 s 中最长的美好子字符串
func longestNiceSubstring(s string) string {
	n := len(s)
	mxLen := 0
	mxStart := 0
	// 遍历不同的字母个数限制，从 1 到 26
	for limit := 1; limit <= 26; limit++ {
			l, r := 0, 0
			cnt := 0
			// 用于记录小写字母和大写字母的出现情况
			lower, upper := 0, 0
			// 用于记录小写字母和大写字母的出现次数
			lowerCnt := make(map[rune]int)
			upperCnt := make(map[rune]int)
			for r < n {
					char := rune(s[r])
					lowerChar := unicode.ToLower(char)
					// 如果当前字母第一次出现，增加字母个数
					if lowerCnt[lowerChar] == 0 && upperCnt[lowerChar] == 0 {
							cnt++
					}
					if unicode.IsLower(char) {
							pos := int(char - 'a')
							// if lowerCnt[char] == 0 {
									lower |= (1 << pos)
							// }
							lowerCnt[char]++
					} else {
							pos := int(lowerChar - 'a')
							// if upperCnt[lowerChar] == 0 {
									upper |= (1 << pos)
							// }
							upperCnt[lowerChar]++
					}
					r++
					// 当字母个数超过限制时，移动左指针
					for cnt > limit {
							char := rune(s[l])
							lowerChar := unicode.ToLower(char)
							if unicode.IsLower(char) {
									pos := int(char - 'a')
									lowerCnt[char]--
									if lowerCnt[char] == 0 {
											lower ^= (1 << pos)
									}
							} else {
									pos := int(lowerChar - 'a')
									upperCnt[lowerChar]--
									if upperCnt[lowerChar] == 0 {
											upper ^= (1 << pos)
									}
							}
							if lowerCnt[lowerChar] == 0 && upperCnt[lowerChar] == 0 {
									cnt--
							}
							l++
					}
					// 如果当前子字符串是美好子字符串且长度更长，更新最长美好子字符串的信息
					if lower^upper == 0 && r-l > mxLen {
							mxLen = r - l
							mxStart = l
					}
			}
	}
	return s[mxStart : mxStart+mxLen]
}
