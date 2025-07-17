package a0710

import (
	"fmt"
	"math"
	"slices"
	"strings"
)

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
func findMaxK(nums []int) int {
	ans := -1
	cnt := map[int]int{}
	for _, x := range cnt {
		if cnt[-x] > 0 {
			ans = max(ans, abs(x))
		}
		cnt[x]++
	}
	return ans
}

func numIdenticalPairs(nums []int) (ans int) {
	cnt := map[int]int{}
	for _, x := range nums {
		ans += cnt[x]
		cnt[x]++
	}
	return
}
func interchangeableRectangles(rectangles [][]int) int64 {
	type pair struct{ w, h int }
	cnt := map[pair]int{}
	ans := 0
	for _, r := range rectangles {
		w, h := r[0], r[1]
		g := gcd(w, h)
		cur := pair{w / g, h / g}
		ans += cnt[cur]
		cnt[cur]++
	}
	return int64(ans)
}

func gcd(a, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}
func maxPoints(points [][]int) (ans int) {
	type pair struct{ x, y int }
	n := len(points)

	for i := 0; i < n-1; i++ {
		x, y := points[i][0], points[i][1]
		cnt := map[pair]int{}
		for j := i + 1; j < n; j++ {
			x2, y2 := points[j][0], points[j][1]
			dx, dy := x2-x, y2-y
			if dx == 0 {
				dy = 1
			} else if dy == 0 {
				dx = 1
			}
			g := gcd(dx, dy)
			cur := pair{dx / g, dy / g}
			ans = max(ans, cnt[cur])
			cnt[cur]++
		}
	}
	return ans + 1
}
func maxPoints222(points [][]int) (ans int) {
	n := len(points)
	if n <= 2 {
		return n
	}
	type pair struct{ dx, dy int }
	for i := 0; i < n-1; i++ {
		x1, y1 := points[i][0], points[i][1]
		res := 0
		cnt := map[pair]int{}
		for j := i + 1; j < n; j++ {
			x2, y2 := points[j][0], points[j][1]
			dx, dy := x2-x1, y2-y1
			if dx == 0 {
				dy = 1
			} else if dy == 0 {
				dx = 1
			}
			g := gcd(dx, dy)
			cur := pair{dx / g, dy / g}
			cnt[cur]++
			res = max(res, cnt[cur])
		}
		ans = max(ans, res+1)
	}
	return
}

func numEquivDominoPairs111(dominoes [][]int) (ans int) {
	type pair struct{ x, y int }
	cnt := map[pair]int{}
	for _, item := range dominoes {
		x, y := item[0], item[1]
		cur := pair{x, y}
		ans += cnt[cur]
		if x != y {
			reverseCur := pair{y, x}
			ans += cnt[reverseCur]
		}
		cnt[cur]++
	}
	return
}
func numEquivDominoPairs(dominoes [][]int) (ans int) {
	type pair struct{ x, y int }
	cnt := map[pair]int{}
	for _, item := range dominoes {
		x, y := min(item[0], item[1]), max(item[0], item[1])
		cur := pair{x, y}
		ans += cnt[cur]
		cnt[cur]++
	}
	return
}
func maxProfit(prices []int) (ans int) {
	mn := prices[0]
	for _, x := range prices {
		ans = max(ans, x-mn)
		mn = min(x, mn)
	}
	return
}

func maximumDifference222(nums []int) (ans int) {
	ans = -1
	mn := nums[0]
	for _, x := range nums[1:] {
		if x > mn && x-mn > ans {
			ans = x - mn
		}
		mn = min(x, mn)
	}
	return
}
func maximumDifference(nums []int) (ans int) {
	mn := math.MaxInt
	for _, x := range nums {
		ans = max(ans, x-mn)
		mn = min(x, mn)
	}
	if ans == 0 {
		return -1
	}
	return
}

func containsNearbyDuplicate(nums []int, k int) bool {
	cnt := map[int]int{}
	for i, x := range nums {
		if j, ok := cnt[x]; ok && i-j <= k {
			return true
		}
		if (i+1)-cnt[x] <= k {
			return true
		}
		cnt[x] = i
	}
	return false
}

func minimumCardPickup(cards []int) (ans int) {
	ans = math.MaxInt
	cnt := map[int]int{}
	for i, x := range cards {
		if j, ok := cnt[x]; ok {
			ans = min(ans, i-j)
		}
		cnt[x] = i
	}
	if ans == math.MaxInt {
		return -1
	}
	return
}
func maxSum(nums []int) int {
	ans := -1
	cnt := [10]int{}
	for i := range cnt {
		cnt[i] = math.MinInt
	}
	for _, x := range nums {
		s := 0
		for v := x; v > 0; v /= 10 {
			s = max(s, v%10)
		}
		ans = max(ans, cnt[s]+x)
		cnt[s] = max(cnt[s], x)
	}
	return ans
}
func maximumSum(nums []int) (ans int) {
	ans = -1
	cnt := [82]int{}
	for i := range cnt {
		cnt[i] = math.MinInt / 2
	}
	for _, x := range nums {
		s := 0
		for v := x; v > 0; v /= 10 {
			s += v % 10
		}
		ans = max(ans, cnt[s]+x)
		cnt[s] = max(cnt[s], x)
	}
	return
}
func maximumSum222(nums []int) (ans int) {
	cnt := map[int]int{}
	for _, x := range nums {
		s := 0
		for v := x; v > 0; v /= 10 {
			s += v % 10
		}
		if y, ok := cnt[s]; ok {
			ans = max(ans, y+x)
		}
		cnt[s] = max(cnt[s], x)
	}
	return
}

func maxOperations(nums []int, k int) (ans int) {
	cnt := map[int]int{}
	for _, x := range nums {
		if cnt[k-x] > 0 {
			cnt[k-x]--
			ans++
		} else {
			cnt[x]++
		}
	}
	return
}

func pairSums(nums []int, target int) (ans [][]int) {
	cnt := map[int]int{}
	for _, x := range nums {
		if cnt[target-x] > 0 {
			cnt[target-x]--
			ans = append(ans, []int{x, target - x})
		} else {
			cnt[x]++
		}
	}
	return
}
func merge(meettings [][]int) [][]int {
	slices.SortFunc(meettings, func(x, y []int) int {
		return x[0] - y[0]
	})
	ans := [][]int{meettings[0]}
	for _, m := range meettings[1:] {
		left, right := m[0], m[1]
		if left <= ans[len(ans)-1][1] {
			ans[len(ans)-1][1] = max(ans[len(ans)-1][1], right)
		} else {
			ans = append(ans, m)
		}
	}
	return ans
}
func countDays(days int, meetings [][]int) (ans int) {
	meetings = merge(meetings)
	ans = days
	for _, m := range meetings {
		l, r := m[0], m[1]
		ans -= r - l + 1
	}
	return
}

func getLargestOutlier(nums []int) (ans int) {
	ans = math.MinInt
	sum := 0
	cnt := map[int]int{}
	for _, x := range nums {
		cnt[x]++
		sum += x
	}
	for _, x := range nums {
		cnt[x]--
		if _, ok := cnt[sum-2*x]; ok {
			ans = max(ans, sum-2*x)
		}
		cnt[x]++
	}
	return
}
func maxDistance(arrays [][]int) (ans int) {
	mn, mx := math.MaxInt, math.MinInt
	for _, ls := range arrays {
		curMn := ls[0]
		curMx := ls[len(ls)-1]
		ans = max(ans, mx-curMn, curMx-mn)
		mn = min(mn, curMn)
		mx = max(mx, curMx)
	}
	return
}

func countBadPairs(nums []int) int64 {
	cnt := map[int]int{}
	n := len(nums)
	ans := n * (n - 1) / 2
	for i, x := range nums {
		ans -= cnt[i-x]
		cnt[i-x]++
	}
	return int64(ans)
}

func maxScoreSightseeingPair(values []int) (ans int) {
	mx := math.MinInt
	for i, x := range values {
		ans = max(ans, x-i+mx)
		mx = max(mx, i+x)
	}
	return
}
func countNicePairs(nums []int) (ans int) {
	cnt := map[int]int{}
	mod := 1_000_000_007
	for _, x := range nums {
		rev := 0
		for v := x; v > 0; v /= 10 {
			rev = rev*10 + v%10
		}
		ans = (ans + cnt[x-rev]) % mod
		cnt[x-rev]++
	}
	return
}
func findIndices(nums []int, indexDifference int, valueDifference int) []int {
	n := len(nums)
	mn := math.MaxInt
	mnIndex := -1
	for j := indexDifference; j < n; j++ {
		x := nums[j]
		if x-mn >= valueDifference {
			return []int{mnIndex, j}
		}
		if x < mn {
			mn = x
			mnIndex = j
		}
	}
	return []int{-1, -1}
}

func numOfSubarraysee222(arr []int) (ans int) {
	const mod = 1_000_000_007
	preSum := 0
	cnt := [2]int{1, 0}
	for _, x := range arr {
		preSum += x
		ans += cnt[preSum&1^1]
		cnt[preSum&1]++
	}
	return ans % mod
}
func numOfSubarrays222(arr []int) (ans int) {
	const mod = 1_000_000_007
	preSum := 0
	cnt := [2]int{1, 0}
	for _, x := range arr {
		preSum += x
		preSum = preSum & 1
		ans += cnt[preSum^1]
		cnt[preSum]++
	}
	return ans % mod
}
func subarraysDivByK2(nums []int, k int) (ans int) {
	preSum := 0
	cnt := make([]int, k)
	cnt[0] = 1
	for _, x := range nums {
		preSum += x
		preSum = (preSum%k + k) % k
		ans += cnt[preSum]
		cnt[preSum]++
	}
	return
}

func checkSubarraySum33(nums []int, k int) bool {
	n := len(nums)
	if n < 2 {
		return false
	}
	// 前缀和为0的位置在-1
	cnt := map[int]int{0: -1}
	preSum := 0
	for i, x := range nums {
		preSum += x
		preSum = (preSum%k + k) % k
		if j, ok := cnt[preSum]; ok {
			if i-j > 2 {
				return true
			}
		} else {
			cnt[preSum] = i
		}
	}
	return false
}
func findMaxLength22(nums []int) (ans int) {
	cnt := map[int]int{0: -1}
	preSum := 0
	for j, x := range nums {
		preSum += 2*x - 1
		if i, ok := cnt[preSum]; ok {
			ans = max(ans, j-i)
		} else {
			cnt[preSum] = j
		}
	}
	return
}
func findMaxLengt22h(nums []int) (ans int) {
	cnt := map[int]int{0: -1}
	preSum := 0
	for j, x := range nums {
		preSum += 2*x - 1
		if i, ok := cnt[preSum]; ok {
			ans = max(ans, j-i)
		} else {
			cnt[preSum] = j
		}
	}
	return
}
func findLongestSubarray22(array []string) []string {
	n := len(array)
	preSum := make([]int, n+1)
	for i, ch := range array {
		preSum[i+1] = preSum[i] + 2*(int(ch[0])>>6&1) - 1
	}
	begin, end := 0, 0
	cnt := map[int]int{0: -1}
	for i, x := range preSum {
		if j, ok := cnt[x]; ok {
			if i-j > end-begin {
				begin = j
				end = i
			}
		} else {
			cnt[x] = i
		}
	}
	return array[begin:end]
}

func maximumSubarraySum222(nums []int, k int) int64 {
	/* i-j=k  ->i=k+j
	i-j=-k ->i=-k+j */
	preSum := 0
	cnt := map[int]int{0: 1}
	ans := 0
	for _, x := range nums {
		preSum += x
		ans = max(ans, cnt[preSum-k], cnt[preSum+k])
		cnt[preSum]++
	}
	return int64(ans)
}
func maximumSubarraySum222333(nums []int, k int) int64 {
	sum := 0
	minS := map[int]int{}
	ans := math.MinInt
	for _, x := range nums {
		s, ok := minS[x-k]
		if ok {
			ans = max(ans, sum+x-s)
		}
		s, ok = minS[x+k]
		if ok {
			ans = max(ans, sum+x-s)
		}
		s, ok = minS[x]
		if !ok || sum < s {
			minS[x] = sum
		}
		sum += x
	}
	if ans == math.MinInt {
		return -1
	}
	return int64(ans)
}

func maxSubarraySum222(nums []int, k int) int64 {
	minS := make([]int, k)
	for i := range k - 1 {
		minS[i] = math.MaxInt / 2 // 防止下面减法溢出
	}

	ans := math.MinInt
	s := 0
	for j, x := range nums {
		s += x
		i := j % k
		ans = max(ans, s-minS[i])
		minS[i] = min(minS[i], s)
	}
	return int64(ans)
}

func maxSubarraySum(nums []int, k int) int64 {
	n := len(nums)
	preSum := make([]int, n+1)
	for i, x := range nums {
		preSum[i+1] = preSum[i] + x
	}
	minS := make([]int, k)
	for i := range minS {
		minS[i] = math.MaxInt / 2
	}
	ans := math.MinInt
	for i, s := range preSum {
		j := i % k
		ans = max(ans, s-minS[j])
		minS[j] = min(minS[j], preSum[i])
	}
	return int64(ans)
}

func beautifulSubstrings(s string, k int) int64 {
	// 找到最小的d使得d*d是4k的倍数，然后用d替换k
	for d := 1; ; d++ {
		if (d*d)%(4*k) == 0 {
			k = d
			break
		}
	}
	ans := 0
	type pair struct{ i, sum int }
	// k-1和-1同余
	cnt := map[pair]int{{k - 1, 0}: 1}
	sum := 0
	const aeiouMask = 1<<0 | 1<<4 | 1<<8 | 1<<14 | 1<<20
	for i, c := range s {
		sum += (2*(aeiouMask>>(byte(c)-'a')&1) - 1)
		p := pair{i % k, sum}
		ans += cnt[p]
		cnt[p]++
	}

	return int64(ans)
}

func vowelStrings222(words []string, queries [][]int) []int {
	n := len(words)
	prefix := make([]int, n+1)
	for i, w := range words {
		prefix[i+1] = prefix[i]
		if strings.Contains("aeiou", w[:1]) && strings.Contains("aeiou", w[len(w)-1:]) {
			prefix[i+1]++
		}
	}
	m := len(queries)
	ans := make([]int, m)
	for i, q := range queries {
		s, e := q[0], q[1]
		ans[i] = prefix[e+1] - prefix[s]
	}
	return ans
}
func vowelStrings(words []string, queries [][]int) []int {
	n := len(words)
	prefix := make([]int, n+1)
	const aeiouMask = 1<<0 | 1<<4 | 1<<8 | 1<<14 | 1<<20
	for i, w := range words {
		prefix[i+1] = prefix[i]
		if aeiouMask>>(w[0]-'a')&1 == 1 && aeiouMask>>(w[len(w)-1]-'a')&1 == 1 {
			prefix[i+1]++
		}
	}
	m := len(queries)
	ans := make([]int, m)
	for i, q := range queries {
		s, e := q[0], q[1]
		ans[i] = prefix[e+1] - prefix[s]
	}
	return ans
}

func maxNonOverlapping(nums []int, target int) (ans int) {
	cnt := map[int]int{0: -1}
	preIndex, sum := -1, 0
	for i, x := range nums {
		sum += x
		if j, ok := cnt[sum-target]; ok {
			if j >= preIndex {
				ans++
				preIndex = i
			}
		}
		cnt[sum] = i
	}
	return
}
func numSubarraysWithSum(nums []int, goal int) (ans int) {
	s := 0
	cnt := map[int]int{0: 1}
	for _, x := range nums {
		s += x
		ans += cnt[s-goal]
		cnt[s]++
	}
	return
}

func subarraySum(nums []int, k int) (ans int) {
	s := 0
	cnt := map[int]int{0: 1}
	for _, x := range nums {
		s += x
		ans += cnt[s-k]
		cnt[s]++
	}
	return
}

func numOfSubarrays(arr []int) (ans int) {
	const mod = 1_000_000_007
	cnt := [2]int{1}
	s := 0
	for _, x := range arr {
		s += x
		s = s & 1
		ans += cnt[s^1]
		cnt[s]++
	}
	return ans % mod
}
func subarraysDivByK(nums []int, k int) (ans int) {
	cnt := make([]int, k)
	cnt[0] = 1
	s := 0
	for _, x := range nums {
		s += x
		s = (s + k) % k
		ans += cnt[s]
		cnt[s]++
	}
	return
}
func checkSubarraySum(nums []int, k int) bool {
	cnt := map[int]int{0: -1}
	s := 0
	for i, x := range nums {
		s += x
		s = (s%k + k) % k
		if j, ok := cnt[s]; ok {
			if j-i > 2 {
				return true
			}
		} else {

			cnt[s] = i
		}
	}
	return false
}

func beautifulSubarrays(nums []int) int64 {
	s := 0
	cnt := map[int]int{0: 1}
	ans := 0
	for _, x := range nums {
		s ^= x
		ans += cnt[s]
		cnt[s]++
	}
	return int64(ans)
}

func findMaxLength(nums []int) (ans int) {
	cnt := map[int]int{0: -1}
	s := 0
	for i, x := range nums {
		s += 2*x - 1
		if j, ok := cnt[s]; ok {
			ans = max(ans, i-j)
		} else {
			cnt[s] = i
		}
	}
	return
}
func findLongestSubarray3421(array []string) []string {
	s := 0
	cnt := map[int]int{-1: 0, 0: -1}
	begin, end := 0, 0
	for i, x := range array {
		ch := x[0]
		// fmt.Println(ch,2*(int(ch)>>6&1) - 1)
		s += 2*(int(ch)>>6&1) - 1
		if j, ok := cnt[s]; ok {
			if i-j >= end-begin {
				end, begin = i, j
			}
		} else {
			cnt[s] = i
		}
	}
	fmt.Println(begin, end)
	// return []string{""}
	return array[begin:end]
}
func findLongestSubarray222(array []string) []string {
	n := len(array)
	s := make([]int, n+1)
	for i, str := range array {
		s[i+1] = s[i] + 2*(int(str[0])>>6&1) - 1
	}
	begin, end := 0, 0
	cnt := map[int]int{}
	for i, x := range s {
		if j, ok := cnt[x]; ok {
			if i-j > end-begin {
				begin, end = j, i
			}
		} else {
			cnt[x] = i
		}
	}
	return array[begin:end]
}

func findLongestSubarray(array []string) []string {
	n := len(array)
	begin, end := 0, 0
	cnt := make([]int, 2*n+1)
	for i := range cnt {
		cnt[i] = -1
	}
	// 所有下标都偏移n位
	s := n
	// 相当于前缀和中的s[0]=0
	cnt[s] = 0
	for i := 1; i <= n; i++ {
		s += 2*(int(array[i-1][0])>>6&1) - 1
		if j := cnt[s]; j > -1 {
			if i-j > end-begin {
				begin, end = j, i
			}
		} else {
			cnt[s] = i
		}
	}
	return array[begin:end]
}
func maximumSubarraySum32(nums []int, k int) int64 {
	sum := 0
	ans := math.MinInt
	minS := map[int]int{}
	for _, x := range nums {
		s, ok := minS[x-k]
		if ok {
			ans = max(ans, sum+x-s)
		}
		s, ok = minS[x+k]
		if ok {
			ans = max(ans, sum+x-s)
		}
		s, ok = minS[x]
		if !ok || sum < s {
			minS[x] = sum
		}
		sum += x
	}
	if ans == math.MinInt {
		return 0
	}
	return int64(ans)
}

func maximumSubarraySum(nums []int, k int) int64 {
	sum := 0
	ans := math.MinInt
	minS := map[int]int{}
	for _, x := range nums {
		s, ok := minS[x-k]
		if ok {
			ans = max(ans, sum+x-s)
		}
		s, ok = minS[x+k]
		if ok {
			ans = max(ans, sum+x-s)
		}
		s, ok = minS[x]
		if !ok || sum < s {
			minS[x] = sum
		}
		sum += x
	}
	if ans == math.MinInt {
		return 0
	}
	return int64(ans)
}
func minSumOfLengths(arr []int, target int) (ans int) {
	n := len(arr)
	dp := make([]int, n+1)
	for i := range dp {
		dp[i] = math.MaxInt / 2
	}
	ans = math.MaxInt
	left:=0
	for right,x:=range arr{
		
	}
	if ans == math.MaxInt {
		return -1
	}
	return
}
