package a0806

import (
	"fmt"
	"math"
	"slices"
	"strings"
	"unicode"
)

func threeSumClosest(nums []int, target int) (ans int) {
	slices.Sort(nums)
	n := len(nums)
	minDiff := math.MaxInt
	for i, x := range nums[:n-2] {
		if i > 0 && nums[i-1] == x {
			continue
		}
		if x+nums[i+1]+nums[i+2] > target {
			if x+nums[i+1]+nums[i+2]-target < minDiff {
				return x + nums[i+1] + nums[i+2]
			}
			break
		}
		if x+nums[n-1]+nums[n-2] < target {
			if target-(x+nums[n-1]+nums[n-2]) < minDiff {
				ans = x + nums[n-1] + nums[n-2]
				minDiff = target - ans
			}
			continue
		}
		left, right := i+1, n-1
		for left < right {
			sum := x + nums[left] + nums[right]
			if sum == target {
				return sum
			} else if sum < target {
				if target-sum < minDiff {
					minDiff = target - sum
					ans = sum
				}
				left++
			} else {
				if sum-target < minDiff {
					minDiff = sum - target
					ans = sum
				}
				right--
			}
		}
	}
	return
}
func threeSum(nums []int) (ans [][]int) {
	slices.Sort(nums)
	n := len(nums)
	for i, x := range nums[:n-2] {
		if i > 0 && nums[i-1] == x {
			continue
		}
		if x+nums[i+1]+nums[i+2] > 0 {
			break
		}
		if x+nums[n-1]+nums[n-2] < 0 {
			continue
		}
		left, right := i+1, n-1
		for left < right {
			sum := x + nums[left] + nums[right]
			if sum == 0 {
				ans = append(ans, []int{x, nums[left], nums[right]})
				for left++; left < right && nums[left-1] == nums[left]; left++ {
				}
				for right--; left < right && nums[right+1] == nums[right]; right-- {
				}
			} else if sum < 0 {
				left++
			} else {
				right--
			}
		}
	}
	return
}

func fourSum(nums []int, target int) (ans [][]int) {
	slices.Sort(nums)
	n := len(nums)
	if n < 4 {
		return
	}
	for i, x := range nums[:n-3] {
		if i > 0 && nums[i-1] == x {
			continue
		}
		if x+nums[i+1]+nums[i+2]+nums[i+3] > target {
			break
		}
		if x+nums[n-1]+nums[n-2]+nums[n-3] < target {
			continue
		}
		for j := i + 1; j < n-2; j++ {
			y := nums[j]
			if j > i+1 && nums[j-1] == y {
				continue
			}
			if x+y+nums[j+1]+nums[j+2] > target {
				break
			}
			if x+y+nums[n-1]+nums[n-2] < target {
				continue
			}
			left, right := j+1, n-1
			for left < right {
				sum := x + y + nums[left] + nums[right]
				if sum == target {
					ans = append(ans, []int{x, y, nums[left], nums[right]})
					for left++; left < right && nums[left-1] == nums[left]; left++ {
					}
					for right--; left < right && nums[right+1] == nums[right]; right-- {
					}
				} else if sum < target {
					left++
				} else {
					right--
				}
			}
		}
	}
	return
}

func triangleNumber222(nums []int) (ans int) {
	slices.Sort(nums)
	n := len(nums)
	// 枚举最长边
	for i := 2; i < n; i++ {
		left, right := 0, i-1
		c := nums[i]
		for left < right {
			if nums[left]+nums[right] > c {
				ans += right - left
				right--
			} else {
				left++
			}
		}
	}
	return
}

func triangleNumber(nums []int) (ans int) {
	slices.Sort(nums)
	n := len(nums)
	// 枚举最长边
	for i := n - 1; i > 1; i-- {
		c := nums[i]
		if nums[0]+nums[1] > c {
			ans += (i + 1) * i * (i - 1) / 6
			break
		}
		if nums[i-1]+nums[i-2] < c {
			continue
		}
		left, right := 0, i-1
		for left < right {
			if nums[left]+nums[right] > c {
				ans += right - left
				right--
			} else {
				left++
			}
		}
	}
	return
}

func numTriplets22(nums1 []int, nums2 []int) (ans int) {
	cnt1 := map[int]int{}
	for _, x := range nums1 {
		cnt1[x*x]++
	}
	cnt2 := map[int]int{}
	for _, x := range nums2 {
		cnt2[x*x]++
	}
	for i, x := range nums1 {
		for _, v := range nums1[i:] {
			ans += cnt2[x*v]
		}
	}
	for i, x := range nums1 {
		for _, v := range nums1[i:] {
			ans += cnt1[x*v]
		}
	}
	return
}

func numTriplets(nums1 []int, nums2 []int) int {
	slices.Sort(nums1)
	slices.Sort(nums2)
	fn := func(nums []int, target []int) (ans int) {
		for _, x := range nums {
			v := x * x
			left, right := 0, len(target)-1
			for left < right {
				prod := target[left] * target[right]
				if prod == v {
					if target[left] == target[right] {
						cnt := right - left + 1
						ans += cnt * (cnt - 1) / 2
					} else {
						leftCnt, rightCnt := 1, 1
						for left+1 < right && target[left+1] == target[left] {
							leftCnt++
							left++
						}
						for right-1 > left && target[right-1] == target[right] {
							rightCnt++
							right--
						}
						ans += leftCnt * rightCnt
					}
					left++
					right--
				} else if prod < v {
					left++
				} else {
					right--
				}
			}
		}
		return
	}
	return fn(nums1, nums2) + fn(nums2, nums1)
}
func threeSumMulti(arr []int, target int) (ans int) {
	slices.Sort(arr)
	n := len(arr)
	const mod = 1e9 + 7
	for i, x := range arr[:n-2] {
		v := target - x
		left, right := i+1, n-1
		for left < right {
			sum := arr[left] + arr[right]
			if sum == v {
				if arr[left] == arr[right] {
					cnt := right - left + 1
					ans = (ans + cnt*(cnt-1)/2) % mod
					break
				} else {
					leftCnt, rightCnt := 1, 1
					for left+1 < right && arr[left+1] == arr[left] {
						leftCnt++
						left++
					}
					for right-1 > left && arr[right-1] == arr[right] {
						rightCnt++
						right--
					}
					ans = (ans + leftCnt*rightCnt) % mod
				}
				left++
				right--
			} else if sum < v {
				left++
			} else {
				right--
			}
		}
	}
	return
}
func maxCollectedFruits(fruits [][]int) (ans int) {
	n := len(fruits)
	memo := make([][]int, n)
	for i := range memo {
		memo[i] = make([]int, n)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int) int
	dfs = func(i, j int) (res int) {
		if j < n-1-i || j >= n {
			return 0
		}
		if i == 0 {
			return fruits[i][j]
		}
		p := &memo[i][j]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		return max(dfs(i-1, j-1), dfs(i-1, j), dfs(i-1, j+1)) + fruits[i][j]
	}
	for i, rows := range fruits {
		ans += rows[i]
	}
	ans += dfs(n-2, n-1)
	for i := range fruits {
		for j := range i {
			fruits[j][i] = fruits[i][j]
		}
	}
	return ans + dfs(n-2, n-1)
}

func bagOfTokensScore(tokens []int, power int) (ans int) {
	slices.Sort(tokens)
	n := len(tokens)
	if n == 0 {
		return
	}
	if power < tokens[0] {
		return
	}
	left, right := 0, n-1
	for left < right {
		if power >= tokens[left] {
			power -= tokens[left]
			left++
			ans++
		} else if ans > 0 {
			ans--
			power += tokens[right]
			right--
		}
	}
	if left == right && power >= tokens[left] {
		ans++
	}
	return
}

func maxArea(height []int) (ans int) {
	n := len(height)
	left, right := 0, n-1
	for left < right {
		ans = max(ans, (right-left+1)*min(height[left], height[right]))
		if height[left] < height[right] {
			left++
		} else {
			right--
		}
	}
	return
}

func trap222(height []int) (ans int) {
	n := len(height)
	preMax := height[0]
	// height[right]
	sufMax := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		sufMax[i] = max(sufMax[i+1], height[i])
	}
	for i := 1; i < n-1; i++ {
		x := height[i]
		preMax = max(preMax, x)
		fmt.Println(i, min(preMax, sufMax[i+1])-x)
		ans += max(min(preMax, sufMax[i+1])-x, 0)
	}
	return
}

func trap(height []int) (ans int) {
	n := len(height)
	left, right := 0, n-1
	preMax, sufMax := 0, 0
	for left <= right {
		preMax = max(preMax, height[left])
		sufMax = max(sufMax, height[right])
		if preMax < sufMax {
			ans += preMax - height[left]
			left++
		} else {
			ans += sufMax - height[right]
			right--
		}
	}
	return
}
func isPara(s string, i, j int) bool {
	for i < j && s[i] == s[j] {
		i++
		j--
	}
	return i >= j
}
func checkPalindromeFormation(a string, b string) bool {
	check := func(a, b string) bool {
		i, j := 0, len(a)-1
		for i < j && b[i] == a[j] {
			i++
			j--
		}
		return isPara(a, i, j) || isPara(b, i, j)
	}
	return check(a, b) || check(b, a)
}

const mod = 1_000_000_007

var pow2 = [100_001]int{1}

func init() {
	for i := 1; i < len(pow2); i++ {
		pow2[i] = pow2[i-1] * 2 % mod
	}
	return
}
func numSubseq(nums []int, target int) (ans int) {
	slices.Sort(nums)
	n := len(nums)
	left, right := 0, n-1
	for left < right {
		if nums[left]+nums[right] <= target {
			ans += pow2[right-left]
			left++
		} else {
			right--
		}
	}
	return
}

func merge222(nums1 []int, m int, nums2 []int, n int) {
	k := m + n + 1
	i, j := 0, 0
	for i < m || j < n {
		if i >= m {
			nums1[k] = nums2[j]
			j++
			k--
		} else if j >= n {
			nums1[k] = nums1[i]
			i++
			k--
		} else if nums2[j] > nums1[i] {
			nums1[k] = nums2[j]
			j++
			k--
		} else if nums2[j] < nums1[i] {
			nums1[k] = nums1[i]
			i++
			k--
		}
	}
}

func merge222454(nums1 []int, m int, nums2 []int, n int) {
	i, j := m-1, n-1
	k := m + n - 1
	for j >= 0 {
		if i >= 0 && nums1[i] > nums2[j] {
			nums1[k] = nums1[i]
			i--
		} else {
			j--
		}
		k--
	}
}

func mergeArrays(nums1 [][]int, nums2 [][]int) (ans [][]int) {
	i, n := 0, len(nums1)
	j, m := 0, len(nums2)
	for i < n || j < m {
		if i >= n {
			ans = append(ans, nums2[j:]...)
			break
		} else if j >= m {
			ans = append(ans, nums1[i:]...)
			break
		}
		if nums1[i][0] == nums2[j][0] {
			nums1[i][1] += nums2[j][1]
			ans = append(ans, nums1[i])
			i++
			j++
		} else if nums1[i][0] < nums2[j][0] {
			ans = append(ans, nums1[i])
			i++

		} else {
			ans = append(ans, nums2[j])
			j++
		}
	}
	return
}

func intersect(nums1 []int, nums2 []int) (ans []int) {
	slices.Sort(nums1)
	slices.Sort(nums2)
	i, n := 0, len(nums1)
	j, m := 0, len(nums2)
	for i < n && j < m {
		if nums1[i] < nums2[j] {
			i++
		} else if nums1[i] > nums2[j] {
			j++
		} else {
			ans = append(ans, nums1[i])
			i++
			j++
		}
	}
	return
}

func breakfastNumber(staple []int, drinks []int, x int) (ans int) {
	const mod = 1_000_000_007
	m := len(drinks)
	slices.Sort(staple)
	slices.Sort(drinks)
	// 5,10,20
	// 2,5,5
	j := m - 1
	for _, v := range staple {
		for j >= 0 && drinks[j]+v > x {
			j--
		}
		fmt.Println(v, (j + 1))
		ans = (ans + (j + 1)) % mod
	}
	return
}

func maxDistance222(nums1 []int, nums2 []int) (ans int) {
	m := len(nums2)
	j := 0
	for i, x := range nums1 {
		for j+1 < m && nums2[j+1] >= x {
			j++
		}
		ans = max(ans, j-i)
	}
	return
}

// 55 30 5 4 2
func merge(intervals [][]int) [][]int {
	ans := [][]int{}
	ans = append(ans, intervals[0])
	for i := 1; i < len(intervals); i++ {
		item := intervals[i]
		end := ans[len(ans)-1][1]
		start := item[0]
		if start <= end {
			ans[len(ans)-1][1] = max(ans[len(ans)-1][1], item[1])
		} else {
			ans = append(ans, item)
		}
	}
	return ans
}
func intervalIntersection222(firstList [][]int, secondList [][]int) (ans [][]int) {
	i, n := 0, len(firstList)
	j, m := 0, len(secondList)
	for i < n || j < m {
		if i >= n {
			ans = append(ans, secondList[j:]...)
		} else if j >= m {
			ans = append(ans, secondList[i:]...)
		} else if firstList[i][0] < secondList[j][0] {
			ans = append(ans, firstList[i])
			i++
		} else {
			ans = append(ans, secondList[j])
			j++
		}
	}
	return merge(ans)
}

func intervalIntersection(firstList [][]int, secondList [][]int) (ans [][]int) {
	i, n := 0, len(firstList)
	j, m := 0, len(secondList)
	for i < n && j < m {
		first := firstList[i]
		second := secondList[j]
		left := max(first[0], second[0])
		right := min(first[1], second[1])
		if left <= right {
			ans = append(ans, []int{left, right})
		}
		if right == first[1] {
			i++
		} else {
			j++
		}
	}
	return ans
}
func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
func smallestDifference222(a []int, b []int) (ans int) {
	slices.Sort(a)
	slices.Sort(b)
	i, n := 0, len(a)
	ans = math.MaxInt
	// j,m:=0,len(b)
	for _, x := range b {
		for i+1 < n && a[i+1] < x {
			i++
		}
		if i+1 < n {
			ans = min(ans, abs(a[i+1]-x))
		}
		ans = min(ans, abs(x-a[i]))
	}
	return
}

func smallestDifference(a []int, b []int) (ans int) {
	slices.Sort(a)
	slices.Sort(b)
	i, n := 0, len(a)
	ans = math.MaxInt
	// j,m:=0,len(b)
	for _, x := range b {
		for i+1 < n && a[i+1] < x {
			i++
		}
		if i < n {
			ans = min(ans, a[i]-x)
		}
		if i > 0 {
			ans = min(ans, x-a[i-1])
		}
	}
	return
}

func maxSum222(nums1 []int, nums2 []int) (ans int) {
	const mod = 1_000_000_007
	if nums1[0] > nums2[0] {
		nums1, nums2 = nums2, nums1
	}
	// a:=[2][]int{nums1,nums2}
	// cur:=0
	i, n := 0, len(nums1)
	j, m := 0, len(nums2)
	for i < n && j < m {
		if nums1[i] < nums2[j] {
			ans += nums1[i]
			i++
		}
		if i+1 < n && j+1 < m && nums1[i] == nums2[j] && nums2[j+1] > nums1[i+1] {

		}
	}
	return
}

func maxSum(nums1 []int, nums2 []int) int {
	const mod = 1e9 + 7
	a, b := 0, 0
	i, j := 0, 0
	len1, len2 := len(nums1), len(nums2)

	for i < len1 && j < len2 {
		if nums1[i] < nums2[j] {
			a += nums1[i]
			i++
		} else if nums1[i] > nums2[j] {
			b += nums2[j]
			j++
		} else {
			// 遇到公共元素，选择两条路径中较大的和继续
			preMax := max(a, b)
			a = preMax + nums1[i]
			b = a // 两条路径在此处合并，值相同
			i++
			j++
		}
	}

	// 处理剩余元素
	for ; i < len1; i++ {
		a += nums1[i]
	}
	for ; j < len2; j++ {
		b += nums2[j]
	}

	return max(a, b) % mod
}

func canChange(start string, target string) bool {
	s := strings.ReplaceAll(start, "_", "")
	t := strings.ReplaceAll(target, "_", "")
	if s != t {
		return false
	}
	j, m := 0, len(target)
	for i, ch := range start {
		if ch == '_' {
			continue
		}
		for j < m && target[j] == '_' {
			j++
		}
		if ch == 'L' {
			if i < j {
				return false
			}
		} else {
			if i > j {
				return false
			}
		}
		j++
	}
	return true
}

func canTransform(start string, target string) bool {
	s := strings.ReplaceAll(start, "X", "")
	t := strings.ReplaceAll(target, "X", "")
	if s != t {
		return false
	}
	j := 0
	for i, ch := range start {
		if ch == 'X' {
			continue
		}
		for target[j] == 'X' {
			j++
		}
		if ch == 'L' {
			if i < j {
				return false
			}
		} else {
			if i > j {
				return false
			}
		}
		j++
	}
	return true
}
func expressiveWords(s string, words []string) (ans int) {
	check := func(s, t string) bool {
		i, n := 0, len(s)
		j, m := 0, len(t)
		for i < n && j < m {
			if s[i] != t[j] {
				return false
			}
			ch := s[i]
			cntI := 0
			for i < n && s[i] == ch {
				cntI++
				i++
			}
			cntJ := 0
			for j < m && t[j] == ch {
				cntJ++
				j++
			}
			if cntI < cntJ || cntI > cntJ && cntI < 3 {
				return false
			}
		}
		return i == n && j == m
	}
	for _, w := range words {
		if check(s, w) {
			ans++
		}
	}
	return
}

func isLongPressedName(name string, typed string) bool {
	i, n := 0, len(name)
	for j, ch := range typed {
		if byte(ch) == name[i] {
			i++
		} else if j > 0 && typed[j-1] == byte(ch) {
			continue
		} else {
			return false
		}
	}
	return i == n
}

func maxDistance(nums1 []int, nums2 []int) (ans int) {
	j, m := 0, len(nums2)
	for i, x := range nums1 {
		for j+1 < m && nums2[+1] > x {
			j++
		}
		ans = max(ans, j-i)
	}
	return
}

func maximumRemovals(s string, p string, removable []int) int {
	n := len(removable)
	left, right := -1, n
	check := func(mid int) bool {
		dic := map[int]bool{}
		for _, i := range removable[:mid] {
			dic[i] = true
		}
		j, m := 0, len(p)
		for i, ch := range s {
			if dic[i] {
				continue
			}
			if j < m && p[j] == byte(ch) {
				j++
			}
			if j == m {
				return true
			}
		}
		return false
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			left = mid
		} else {
			right = mid
		}
	}
	return left
}

func isSubsequence(s string, t string) bool {
	i, n := 0, len(s)
	for _, ch := range t {
		if i < n && s[i] == byte(ch) {
			i++
			if i == n {
				return true
			}
		}
	}
	return i == n
}

func findLUSlength(strs []string) int {
	ans := -1
next:
	for i, a := range strs {
		if len(a) < ans {
			continue
		}
		for j, b := range strs {
			if i != j && isSubsequence(a, b) {
				continue next
			}
		}
		ans = max(ans, len(a))
	}
	return ans
}
func findLongestWord(s string, dictionary []string) (ans string) {
	for _, t := range dictionary {
		if isSubsequence(t, s) {
			if len(t) > len(ans) || t == ans && t < ans {
				ans = t
			}
		}
	}
	return
}

func appendCharacters(s string, t string) int {
	i, n := 0, len(t)
	for _, ch := range s {
		if i < n && t[i] == byte(ch) {
			i++
			if i == n {
				return 0
			}
		}
	}
	return n - i
}

func canMakeSubsequence(str1 string, str2 string) bool {
	j, n := 0, len(str2)
	if len(str1) < n {
		return false
	}
	for _, ch := range str1 {
		if j < n {
			if byte(ch) == str2[j] || ((ch-'a'+1)%26 == (rune(str2[j])-'a')%26) {
				j++
			}
			if j == n {
				return true
			}
		}
	}
	return j == n
}

func camelMatch(queries []string, pattern string) []bool {
	check := func(s, t string) bool {
		j, n := 0, len(t)
		for _, ch := range s {
			if j < n && byte(ch) == t[j] {
				j++
			} else if unicode.IsUpper(ch) {
				return false
			}
			if j == n {
				return true
			}
		}
		return j == n
	}
	ans := make([]bool, len(queries))
	for i, q := range queries {
		ans[i] = check(q, pattern)
	}
	return ans
}

func minimumAddedInteger(nums1 []int, nums2 []int) int {
	slices.Sort(nums1)
	slices.Sort(nums2)
	fmt.Println(nums1)
	fmt.Println(nums2)
	for i := 2; i >= 0; i-- {
		diff := nums2[0] - nums1[i]
		j, n := 0, len(nums2)
		for _, v := range nums1 {
			if j < n && v-nums2[j] == diff {
				j++
			}
			if j == n {
				return diff
			}
		}
	}
	return -1
}
