package grouppoint

import (
	"math"
	"math/bits"
	"slices"
	"strconv"
)

func maxPower1(s string) (ans int) {
	n := len(s)
	i := 0
	for i < n {
		end := i + 1
		for end < n && s[end] == s[i] {
			end++
		}
		cnt := end - i
		ans = max(ans, cnt)
		i = end
	}
	return
}
func checkZeroOnes1(s string) bool {
	cnt := [2]int{}
	n := len(s)
	i := 0
	for i < n {
		end := i + 1
		for end < n && s[end] == s[i] {
			end++
		}
		index := int(s[i] - '0')
		cnt[index] = max(cnt[index], end-i)
		i = end
	}
	return cnt[1] > cnt[0]
}
func longestContinuousSubstring1(s string) (ans int) {
	n := len(s)
	i := 0
	for i < n {
		end := i + 1
		for end < n && s[end] == s[end-1]+1 {
			end++
		}
		cnt := end - i
		ans = max(ans, cnt)
		i = end
	}
	return
}
func hasSpecialSubstring1(s string, k int) bool {
	n := len(s)
	i := 0
	for i < n {
		end := i + 1
		for end < n && s[end] == s[i] {
			end++
		}
		cnt := end - i
		if cnt == k {
			return true
		}
		i = end
	}
	return false
}
func makeFancyString2(s string) string {
	n := len(s)
	i := 0
	ans := []byte{}
	for i < n {
		end := i + 1
		for end < n && s[end] == s[i] {
			end++
		}
		cnt := min(end-i, 2)
		for cnt > 0 {
			ans = append(ans, s[i])
			cnt--
		}
		i = end
	}
	return string(ans)
}
func makeFancyString1(s string) string {
	n := len(s)
	i := 0
	ans := []byte{}
	for i < n {
		end := i + 1
		for end < n && s[end] == s[i] {
			end++
		}
		cnt := end - i
		if cnt < 3 {
			ans = append(ans, s[i:end]...)
		} else {
			ans = append(ans, s[i:i+2]...)
		}
		i = end
	}
	return string(ans)
}
func findLengthOfLCIS1(nums []int) (ans int) {
	n := len(nums)
	i := 0
	for i < n {
		end := i + 1
		for end < n && nums[end] > nums[end-1] {
			end++
		}
		cnt := end - i
		ans = max(ans, cnt)
		i = end
	}
	return
}
func maxTurbulenceSize_garb(nums []int) (ans int) {
	n := len(nums)
	i := 1
	for i < n {
		end := i
		// 后面一个数大于前面一个数
		flag := true
		if nums[end] == nums[end-1] {
			i++
			continue
		} else if nums[end] < nums[end-1] {
			flag = false
		}
		for end < n && ((flag && nums[end] > nums[end-1]) || (!flag && nums[end] < nums[end-1])) {
			end++
			flag = !flag
		}
		cnt := end - i
		ans = max(ans, cnt)
		i = end
	}
	return
}
func maxTurbulenceSize2(arr []int) int {
	ans := 0
	n := len(arr)
	i := 0
	for i < n {
		var flag bool
		if i+1 < n && arr[i+1] > arr[i] {
			flag = true
		} else if i+1 < n && arr[i+1] < arr[i] {
			flag = false
		} else {
			if 1 > ans {
				ans = 1
			}
			i++
			continue
		}
		cur := 2
		i++
		for i+1 < n && arr[i+1] != arr[i] && ((arr[i+1] < arr[i]) == flag) {
			flag = !flag
			cur++
			i++
		}
		if cur > ans {
			ans = cur
		}
	}
	return ans
}
func maxTurbulenceSize1(arr []int) int {
	ans := 0
	n := len(arr)
	i := 0
	for i < n {
		var flag bool
		if i+1 < n && arr[i+1] > arr[i] {
			flag = true
		} else if i+1 < n && arr[i+1] < arr[i] {
			flag = false
		} else {
			if 1 > ans {
				ans = 1
			}
			i++
			continue
		}
		end := i + 2
		for end+1 < n && arr[end-1] != arr[end] && ((arr[end-1] < arr[end]) == flag) {
			flag = !flag
			end++
		}
		if end-i > ans {
			ans = end - i
		}
		i = end
	}
	return ans
}

// 2110
func getDescentPeriods1(prices []int) (ans int64) {
	n := len(prices)
	// ans = int64(n)
	i := 0
	for i < n {
		i0 := i
		for i++; i < n && prices[i] == prices[i-1]-1; i++ {
		}
		cnt := i - i0
		ans += int64(cnt * (i - i0 + 1) / 2)
	}
	return ans
}
func getDescentPeriods(prices []int) (ans int64) {
	for i, n := 0, len(prices); i < n; i++ {
		i0 := i
		for i++; i+1 < n && prices[i] == prices[i-1]-1; i++ {
		}
		cnt := i - i0
		ans += int64(cnt) * int64(cnt+1) / 2
	}
	return
}
func maxPower(s string) (ans int) {
	for i, n := 0, len(s); i < n; {
		i0 := i
		for i++; i < n && s[i] == s[i-1]; i++ {
		}
		cnt := i - i0
		ans = max(ans, cnt)
	}
	return
}
func checkZeroOnes(s string) bool {
	count := [2]int{}
	for i, n := 0, len(s); i < n; {
		i0 := i
		for i++; i < n && s[i] == s[i-1]; i++ {
		}
		cnt := i - i0
		index := int(s[i0] - '0')
		count[index] = max(count[index], cnt)
	}
	return count[1] > count[0]
}
func longestContinuousSubstring(s string) (ans int) {
	for i, n := 0, len(s); i < n; {
		i0 := i
		for i++; i < n && s[i] == s[i-1]+1; i++ {
		}
		cnt := i - i0
		ans = max(ans, cnt)
	}
	return
}
func hasSpecialSubstring(s string, k int) bool {
	for i, n := 0, len(s); i < n; {
		i0 := i
		for i++; i < n && s[i] == s[i-1]; i++ {
		}
		cnt := i - i0
		if cnt == k {
			return true
		}
	}
	return false
}
func makeFancyString(s string) string {
	ans := []byte{}
	for i, n := 0, len(s); i < n; {
		i0 := i
		for i++; i < n && s[i] == s[i-1]; i++ {
		}
		cnt := i - i0
		if cnt < 3 {
			ans = append(ans, s[i0:i]...)
		} else {
			ans = append(ans, s[i0:i0+2]...)
		}
	}
	return string(ans)
}
func findLengthOfLCIS(nums []int) (ans int) {
	for i, n := 0, len(nums); i < n; {
		i0 := i
		for i++; i < n && nums[i] > nums[i-1]; i++ {
		}
		cnt := i - i0
		ans = max(ans, cnt)
	}
	return
}

// 978
func maxTurbulenceSize(nums []int) (ans int) {
	ans = 1
	for i, n := 0, len(nums); i < n; {
		i0 := i
		i++
		if i < n && nums[i-1] == nums[i] {
			continue
		}
		flag := false
		// 后一个比前一个大flag为true
		if i < n {
			if nums[i] > nums[i-1] {
				flag = true
			} else {
				flag = false
			}
			for i++; i < n && nums[i] != nums[i-1] &&
				(flag && nums[i] < nums[i-1] ||
					(!flag && nums[i] > nums[i-1])); i++ {
				flag = !flag
			}
			cnt := i - i0
			ans = max(ans, cnt)
			i -= 1
		}
	}
	return
}

// 228
func summaryRanges(nums []int) []string {
	ans := []string{}
	for i, n := 0, len(nums); i < n; {
		i0 := i
		for i++; i < n && nums[i] == nums[i-1]+1; i++ {
		}
		cnt := i - i0
		intI0 := strconv.Itoa(nums[i0])
		if cnt > 1 {
			ans = append(ans, intI0+"->"+strconv.Itoa(nums[i-1]))
		} else {
			ans = append(ans, intI0)
		}
	}
	return ans
}

func longestAlternatingSubarray(nums []int, threshold int) (ans int) {
	for i, n := 0, len(nums); i < n; {
		i0 := i
		if nums[i0]%2 != 0 || nums[i0] > threshold {
			i++
			continue
		}
		for i++; i < n && nums[i]%2 != nums[i-1]%2 && nums[i] <= threshold; i++ {
		}
		ans = max(ans, i-i0)
	}
	return
}
func reductionOperations(nums []int) (ans int) {
	slices.Sort(nums)
	cnt := 0
	for i := 1; i < len(nums); i++ {
		if nums[i] != nums[i-1] {
			cnt++
		}
		ans += cnt
	}
	return ans
}
func longestMountain(nums []int) (ans int) {
	for i, n := 0, len(nums); i+1 < n; {
		i0 := i
		i++
		// 先是上升的 如果是下降的就不对
		if i < n && nums[i] == nums[i-1] || nums[i] < nums[i-1] {
			continue
		}
		for i < n && nums[i] > nums[i-1] {
			i++
		}
		mid := i
		for i < n && nums[i] != nums[i-1] && nums[i] < nums[i-1] {
			i++
		}
		if mid == i {
			continue
		}
		ans = max(ans, i-i0)
		i--
	}
	return
}
func winnerOfGame(colors string) bool {
	cnt := [2]int{}
	for i, n := 0, len(colors); i < n; {
		i0 := i
		for i++; i < n && colors[i-1] == colors[i]; i++ {
		}
		cnt[int(colors[i0]-'A')] += i - i0
	}
	return cnt[0] > cnt[1]
}

// 1759
func countHomogenous(s string) (ans int) {
	var mod int = 1e9 + 7
	calcSize := func(m int) int {
		return m * (1 + m) / 2 % mod
	}
	for i, n := 0, len(s); i < n; {
		i0 := i
		for i++; i < n && s[i-1] == s[i]; i++ {
		}
		ans = (ans + calcSize(i-i0)) % mod
	}
	return
}
func canSortArray(nums []int) bool {
	for i, n := 0, len(nums); i < n; {
		i0 := i
		for i++; i < n && bits.OnesCount(uint(nums[i])) == bits.OnesCount(uint(nums[i-1])); i++ {
		}
		slices.Sort(nums[i0:i])
	}
	return slices.IsSorted(nums)
}
func minCost(colors string, neededTime []int) (ans int) {
	for i, n := 0, len(colors); i < n; {
		sum := neededTime[i]
		mx := neededTime[i]
		for i++; i < n && colors[i] == colors[i-1]; i++ {
			sum += neededTime[i]
			mx = max(mx, neededTime[i])
		}
		ans += sum - mx
	}
	return
}
func alternatingSubarray(nums []int) (ans int) {
	for i, n := 0, len(nums); i < n; {
		i0 := i
		i++
		if nums[i] != nums[i-1]+1 {
			continue
		}
		for i++; i < n && nums[i] == nums[i-2]; i++ {

		}
		ans = max(ans, i-i0)
		i -= 1
	}
	return
}
func resultsArray_garb(nums []int, k int) []int {
	n := len(nums)
	ans := make([]int, n-k+1)
	for i := range ans {
		ans[i] = -1
	}
	if n == 1 && k == 1 {
		ans[0] = nums[0]
	}
	for i := 0; i < n; {
		i0 := i
		mx := nums[i0]
		for i++; i < n && nums[i] == nums[i-1]+1; i++ {
			mx := max(nums[i], mx)
			if i-i0 >= k-1 {
				ans[i-k+1] = mx
			}
		}
	}
	return ans
}
func resultsArray1(nums []int, k int) []int {
	n := len(nums)
	ans := make([]int, n-k+1)
	for i := range ans {
		ans[i] = -1
	}
	for i := 0; i < n; {
		i0 := i
		cnt := 0
		for i++; i < n && nums[i] == nums[i-1]+1; i++ {
			cnt++
		}
		if i-i0 >= k {
			for end := i - 1; end-k+1 >= 0 && end >= i0; end-- {
				ans[end-k+1] = nums[end]
			}
		}
	}
	return ans
}
func resultsArray(nums []int, k int) []int {
	n := len(nums)
	ans := make([]int, n-k+1)
	for i := range ans {
		ans[i] = -1
	}
	cnt := 0
	for i := 0; i < n; i++ {
		if i == 0 || nums[i] == nums[i-1]+1 {
			cnt++
		} else {
			cnt = 0
		}
		if cnt >= k {
			ans[i-k+1] = nums[i]
		}
	}
	return ans
}
func maxIncreasingSubarrays(nums []int) (ans int) {
	preCnt := 0
	for i, n := 0, len(nums); i < n; {
		i0 := i
		for i++; i < n && nums[i] > nums[i-1]; i++ {
		}
		ans = max(ans, min(i-i0, preCnt), i-i0)
		preCnt = i - i0
	}
	return
}
func hasIncreasingSubarrays(nums []int, k int) bool {
	preCnt := math.MinInt
	for i, n := 0, len(nums); i < n; {
		i0 := i
		for i++; i < n && nums[i] > nums[i-1]; i++ {
		}
		if max(min(i-i0, preCnt), i-i0) >= k {
			return true
		}
		preCnt = i - i0
	}
	return false
}
func longestMonotonicSubarray(nums []int) (ans int) {
	ans = 1
	for i, n := 0, len(nums); i+1 < n; {
		i0 := i
		i++
		if nums[i] == nums[i-1] {
			continue
		}
		flag := true
		if nums[i] < nums[i-1] {
			flag = false
		}
		for i++; i < n && ((nums[i] > nums[i-1] && flag) || (!flag && nums[i] < nums[i-1])); i++ {
		}
		ans = max(ans, i-i0)
		i--
	}
	return
}
func findSubstringInWraproundString(s string) (ans int) {
	for i, n := 0, len(s); i < n; {
		i0 := i
		for i++; i < n && s[i]-'a' == (s[i-1]-'a'+1)%25; i++ {
		}
		m := i - i0
		ans += (m * (m + 1)) / 2
	}
	return
}
func minimizedStringLength(s string) int {
	mask := 0
	for _, ch := range s {
		mask |= 1 << (ch - 'a')
	}
	return bits.OnesCount(uint(mask))
}
