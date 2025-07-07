package a0629

import (
	"fmt"
	"math"
	"math/bits"
	"slices"
	"sort"
	"strconv"
	"strings"
)

const mod = 1_000_000_007

var pow2 = [1_000_000]int{1}

func init() {
	for i := 1; i < len(pow2); i++ {
		pow2[i] = pow2[i-1] * 2 % mod
	}
}
func numSubseq(nums []int, target int) (ans int) {
	slices.Sort(nums)
	n := len(nums)
	left, right := 0, n-1
	for left <= right {
		if nums[left]+nums[right] <= target {
			ans += pow2[right-left]
			left++
		} else {
			right++
		}
	}
	return ans % mod
}

/*
	 func maximumCandies(candies []int, k int64) int {
		sum := 0
		for _, x := range candies {
			sum += x
		}
		left, right := 0, sum
		check:=func (mid int) bool {

		}
		for left+1<right{
			mid:=left+((right-left)>>1)
		}
	}
*/
func partitionString222(s string) []string {
	cnt := map[string]bool{}
	n := len(s)
	i := 0
	ans := []string{}
	tmp := []byte{}
	for i < n {
		tmp = append(tmp, s[i])
		if cnt[string(tmp)] == false {
			ans = append(ans, string(tmp))
			cnt[string(tmp)] = true
			tmp = []byte{}
		}
		i++
	}
	return ans
}
func partitionString(s string) (ans []string) {
	cnt := map[string]bool{}
	t := ""
	for _, ch := range s {
		t += string(ch)
		if !cnt[t] {
			ans = append(ans, t)
			cnt[t] = true
			t = ""
		}
	}
	return
}
func longestCommonPrefix333(words []string) []int {
	n := len(words)
	lcp := func(s, t string) (cnt int) {
		n := min(len(s), len(t))
		for i := 0; i < n && s[i] == t[i]; i++ {
			cnt++
		}
		return
	}
	res := make([]int, n-1)
	// 左边界  右边界
	type pair struct{ val, left, right int }
	var first, second pair
	for i := range res {
		res[i] = lcp(words[i], words[i+1])
		if res[i] > first.val {
			second = first
			first.val = res[i]
			first.left = i
			first.right = i + 1
		} else if res[i] > second.val {
			second.val = res[i]
			second.left = i
			second.right = i + 1
		}
	}
	ans := make([]int, n)
	for i := range ans {
		if first.left != i && first.right != i {
			ans[i] = first.val
		} else if second.left != i && second.right != i {
			ans[i] = second.val
		}
		if i-1 >= 0 && i+1 < n {
			ans[i] = max(ans[i], lcp(words[i-1], words[i+1]))
		}
	}
	return ans
}

func longestCommonPrefix(words []string) []int {
	n := len(words)
	lcp := func(s, t string) (cnt int) {
		n := min(len(s), len(t))
		for i := 0; i < n && s[i] == t[i]; i++ {
			cnt++
		}
		return
	}
	// 左边界  右边界
	type pair struct{ val, left, right int }
	var first, second pair
	for i := range n - 1 {
		curVal := lcp(words[i], words[i+1])
		if curVal > first.val {
			second = first
			first.val = curVal
			first.left = i
			first.right = i + 1
		} else if curVal > second.val {
			second.val = curVal
			second.left = i
			second.right = i + 1
		}
	}
	ans := make([]int, n)
	for i := range ans {
		if first.left != i && first.right != i {
			ans[i] = first.val
		} else if second.left != i && second.right != i {
			ans[i] = second.val
		}
		if i-1 >= 0 && i+1 < n {
			ans[i] = max(ans[i], lcp(words[i-1], words[i+1]))
		}
	}
	return ans
}
func longestCommonPrefix22(words []string) []int {
	n := len(words)
	res := make([]int, n-1)
	// 左边界  右边界
	type pair struct{ val, left, right int }
	var first, second, third pair
	for i := range res {
		a := words[i]
		b := words[i+1]
		j, k := 0, 0
		for j < len(a) && k < len(b) && a[j] == b[k] {
			j++
			k++
		}
		res[i] = min(j, k)
		if res[i] > first.val {
			second, third = first, second
			first.val = res[i]
			first.left = i
			first.right = i + 1
		} else if res[i] > second.val {
			third = second
			second.val = res[i]
			second.left = i
			second.right = i + 1
		} else if res[i] > third.val {
			third.val = res[i]
			third.left = i
			third.right = i + 1
		}
	}
	ans := make([]int, n)
	for i := range ans {
		if first.left != i && first.right != i {
			ans[i] = first.val
		} else if second.left != i && second.right != i {
			ans[i] = second.val
		} else {
			ans[i] = third.val
		}
		if i-1 >= 0 && i+1 < n {
			a := words[i-1]
			b := words[i+1]
			j, k := 0, 0
			for j < len(a) && k < len(b) && a[j] == b[k] {
				j++
				k++
			}
			tmp := min(j, k)
			ans[i] = max(ans[i], tmp)
		}
	}
	return ans
}

func splitArray(nums []int, k int) [][]int {
	var result [][]int
	var current []int

	dfs(nums, k, 0, &current, &result)
	return result
}

func dfs(nums []int, k, start int, current *[]int, result *[][]int) {
	// 当子数组数量达到k且所有元素都被使用时，记录结果
	if len(*current) == k && start == len(nums) {
		temp := make([]int, len(nums))
		copy(temp, nums)
		*result = append(*result, temp)
		return
	}
	// 提前终止条件：子数组数量超过k或元素已用完但子数组不足k
	if len(*current) == k || start == len(nums) {
		return
	}

	// 尝试所有可能的分割点
	for end := start + 1; end <= len(nums); end++ {
		// 创建新的子数组
		subarray := nums[start:end]
		*current = append(*current, subarray...)

		// 递归处理剩余元素
		dfs(nums, k, end, current, result)

		// 回溯：撤销最后添加的子数组
		*current = (*current)[:len(*current)-len(subarray)]
	}
}

func minXor111(nums []int, k int) int {
	res := math.MaxInt
	n := len(nums)
	ans := [][]int{}
	path := []int{}
	var dfs func(int)
	dfs = func(i int) {
		if i == n {
			if len(path) == k {
				ans = append(ans, slices.Clone(path))
				res = min(res, slices.Min(path))
			}
			return
		}
		for j := i; j < n; j++ {
			xor := 0
			for k := i; k <= j; k++ {
				xor ^= nums[k]
			}
			path = append(path, xor)
			dfs(j + 1)
			path = path[:len(path)-1]
		}
	}
	dfs(0)
	fmt.Println(ans)
	mn, mx := math.MaxInt, math.MinInt
	for _, ls := range ans {
		curMn := slices.Min(ls)
		if curMn <= mn {
			mn = curMn
			mx = slices.Max(ls)
		}
	}
	return mx
}
func minXor(nums []int, k int) int {
	n := len(nums)
	memo := make([][]int, k+1)
	for i := range memo {
		memo[i] = make([]int, n)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int) int
	/*
		i 表示剩余要分割出的子数组个数
		j 表示要分割的是[0,j]
	*/
	dfs = func(i, j int) (res int) {
		if i == 0 {
			if j < 0 {
				return 0
			} else {
				return math.MaxInt
			}
		}
		p := &memo[i][j]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		res = math.MaxInt
		s := 0
		for l := j; l > i-2; l-- {
			s ^= nums[l]
			res = min(res, max(dfs(i-1, l-1), s))
		}
		return res
	}
	return dfs(k, n-1)
}

func findSpecialInteger22(arr []int) int {
	m := len(arr) / 4
	for _, i := range []int{m, 2*m + 1} {
		x := arr[i]
		if sort.SearchInts(arr, x+1)-sort.SearchInts(arr, x) > m {
			return x
		}
	}
	return arr[3*m+2]
}
func findSpecialInteger(arr []int) int {
	m := len(arr) / 4
	for _, i := range []int{m, 2*m + 1} {
		x := arr[i]
		j := sort.SearchInts(arr, x)
		if arr[j+m] == x {
			return x
		}
	}
	return arr[3*m+2]
}

func findLHS(nums []int) (ans int) {
	slices.Sort(nums)
	left := 0
	for right, x := range nums {
		for x-nums[left] > 1 {
			left++
		}
		if nums[right]-nums[left] == 1 {
			ans = max(ans, right-left+1)
		}
	}
	return
}
func maxNumOfMarkedIndices2(nums []int) int {
	slices.Sort(nums)
	n := len(nums)
	left, right := 0, n/2+1
	check := func(mid int) bool {
		for i, x := range nums[:mid] {
			if x*2 > nums[n-mid+i] {
				return false
			}
		}
		return true
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			left = mid
		} else {
			right = mid
		}
	}
	return left * 2
}

func maxNumOfMarkedIndices(nums []int) int {
	slices.Sort(nums)
	n := len(nums)
	i := 0
	for _, x := range nums[(n+1)/2:] {
		if nums[i]*2 <= x {
			i++
		}
	}
	return i * 2
}
func maximumRemovals(s string, p string, removable []int) int {
	n := len(removable)
	left, right := 0, n

	check := func(mid int) bool {
		set := map[int]bool{}
		for _, i := range removable[:mid] {
			set[i] = true
		}
		// mid 可移除的最大索引
		j := 0
		for i, ch := range s {
			if set[i] {
				continue
			}
			if j < len(p) && p[j] == byte(ch) {
				j++
				if j == len(p) {
					return true
				}
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

func maxValue11(n int, index int, maxSum int) int {
	left, right := 0, maxSum+1
	// 当峰值为x时 总个数为cnt个时 数组和
	sum := func(x, cnt int) int {
		if cnt == 0 {
			return 0
		}
		if x > cnt {
			return (x + (x - cnt + 1)) * cnt / 2
		} else {
			return (1+x)*x/2 + (cnt - x)
		}
	}
	check := func(mid int) bool {
		// 检查当峰值为mid时  数组和为超过maxSum
		// 可以这样理解 峰值元素在index位置  左边只有index个元素晨大值为mid-1
		// 右边元素个数是n-index
		total := sum(mid-1, index) + sum(mid, n-index)
		return total <= maxSum
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

func maxValue(n int, index int, maxSum int) int {
	left, right := 0, maxSum+1
	sum := func(x, cnt int) int {
		// 当峰值为x时 总个数为cnt时 返回数组总和
		if cnt == 0 {
			return 0
		}
		if x > cnt {
			return (x + (x - cnt + 1)) * cnt / 2
		} else {
			return (1+x)*x/2 + (cnt - x)
		}
	}
	check := func(mid int) bool {
		total := sum(mid-1, index) + sum(mid, n-index)
		return total >= maxSum
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

func possibleStringCount(word string) int {
	ans := 1
	for i := 1; i < len(word); i++ {
		if word[i] == word[i-1] {
			ans++
		}
	}
	return ans
}

func maximumOr222(nums []int, k int) int64 {
	ans := math.MinInt
	n := len(nums)
	suffix := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		suffix[i] = max(suffix[i+1]|nums[i], nums[i])
	}
	prefix := 0
	for i, x := range nums {
		ans = max(ans, prefix|suffix[i+1]|(x<<k))
		prefix |= x
	}
	return int64(ans)
}

func goodIndices(nums []int, k int) (ans []int) {
	n := len(nums)
	suffix := make([]int, n)
	suffix[n-1] = 1
	for i := n - 2; i >= 0; i-- {
		if nums[i+1] >= nums[i] {
			suffix[i] = suffix[i+1] + 1
		} else {
			suffix[i] = 1
		}
	}
	prefix := 1
	for i := 1; i < n; i++ {
		if i >= k {
			if prefix >= k && i+1 < n && suffix[i+1] >= k {
				ans = append(ans, i)
			}
		}
		if nums[i-1] >= nums[i] {
			prefix++
		} else {
			prefix = 1
		}
	}
	return
}

func maxScore111(nums []int) int64 {
	n := len(nums)
	suffixGcd := make([]int, n+1)
	suffixLcm := make([]int, n+1)
	suffixLcm[n] = 1
	for i := n - 1; i >= 0; i-- {
		x := nums[i]
		suffixGcd[i] = gcd(suffixGcd[i+1], x)
		suffixLcm[i] = lcm(suffixLcm[i+1], x)
	}
	// 题目说明是最多移除一个元素（所以也可以不移除）
	ans := suffixGcd[0] * suffixLcm[0]
	prefixGcd, prefixLcm := 0, 1
	for i, x := range nums {
		ans = max(ans, gcd(prefixGcd, suffixGcd[i+1])*lcm(prefixLcm, suffixLcm[i+1]))
		prefixGcd = gcd(prefixGcd, x)
		prefixLcm = lcm(prefixLcm, x)
	}
	return int64(ans)
}

func minMaxWeight(n int, edges [][]int, threshold int) int {
	if len(edges) < n-1 {
		return -1
	}
	type edge struct{ y, w int }
	g := make([][]edge, n)
	maxW := math.MinInt
	for _, e := range edges {
		x, y, w := e[0], e[1], e[2]
		g[y] = append(g[y], edge{x, w})
		maxW = max(maxW, w)
	}
	left, right := 0, maxW+1
	vis := make([]int, n)
	check := func(mid int) bool {
		// mid为当前可访问到的最大权重
		remain := n
		var dfs func(int)
		dfs = func(x int) {
			remain--
			vis[x] = mid
			for _, item := range g[x] {
				if item.w <= mid && vis[item.y] != mid {
					dfs(item.y)
				}
			}
		}
		dfs(0)
		return remain == 0
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	if right > maxW {
		return -1
	}
	return right
}

func minimizeSet(d1 int, d2 int, uniqueCnt1 int, uniqueCnt2 int) int {
	left, right := 0, (uniqueCnt1+uniqueCnt2)*2
	lcmD := lcm(d1, d2)
	check := func(mid int) bool {
		left1 := max(uniqueCnt1-mid/d2+mid/lcmD, 0)
		left2 := max(uniqueCnt2-mid/d1+mid/lcmD, 0)
		common := max(mid-(mid/d1+mid/d2-mid/lcmD), 0)
		return common >= left1+left2
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	return right
}

func minLength(s string, numOps int) int {
	n := len(s)
	left, right := 0, n
	// 判断能否在 numOps 次操作内，把每段连续相同子串的长度都变成 ≤m 的
	check := func(mid int) bool {
		// mid为当前相同子串的长度
		cnt := 0
		if mid == 1 {
			// 改成 0101...
			for i, b := range s {
				// 如果 s[i] 和 i 的奇偶性不同，cnt 加一
				cnt += (int(b) ^ (i & 1))
			}
			// n-cnt 表示改成 1010...
			cnt = min(cnt, n-cnt)
		} else {
			k := 0
			for i := range n {
				k++
				// 到达连续相同子串的末尾
				if i == n-1 || s[i] != s[i+1] {
					cnt += k / (mid + 1)
					k = 0
				}
			}
		}
		return cnt <= numOps
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	return right
}

func mySqrt(x int) int {
	left, right := -1, min(x+1, 1<<31-1)
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if mid*mid <= x {
			left = mid
		} else {
			right = mid
		}
	}
	return left
}

func searchMatrix(matrix [][]int, target int) bool {
	m, n := len(matrix), len(matrix[0])
	// 右上角
	i, j := 0, n-1
	for i < m && j >= 0 {
		if matrix[i][j] == target {
			return true
		} else if matrix[i][j] < target {
			i++
		} else {
			j--
		}
	}
	return false
}

/*
	 func firstBadVersion(n int) int {
		left, right := -1, n+1
		for left+1 < right {
			mid := left + ((right - left) >> 1)
			if isBadVersion(right) {
				right = mid
			} else {
				left = mid
			}
		}
		return right
	}

	func guessNumber(n int) int {
		left, right := 0, n+1
		for left+1 < right {
			mid := left + ((right - left) >> 1)
			if guess(mid)>=0 {
				right = mid
			} else {
				left = mid
			}
		}
		return right
	}
*/
func findPeakElement(nums []int) int {
	n := len(nums)
	left, right := -1, n-1
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if nums[mid] > nums[mid+1] {
			right = mid
		} else {
			left = mid
		}
	}
	return right
}

func findPeakGrid(mat [][]int) []int {
	m := len(mat)
	left, right := -1, m-1
	indexOfMax := func(rows []int) (idx int) {
		for i, x := range rows {
			if x > rows[idx] {
				idx = i
			}
		}
		return
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		j := indexOfMax(mat[mid])
		if mat[mid][j] > mat[mid+1][j] {
			right = mid
		} else {
			left = mid
		}
	}
	return []int{right, indexOfMax(mat[right])}
}

/* func findInMountainArray(target int, arr *MountainArray) int {
	n := arr.length()
	peak := sort.Search(n-1, func(i int) bool { return arr.get(i) >= arr.get(i+1) })
	i := sort.Search(peak, func(i int) bool { return arr.get(i) >= target })
	if arr.get(i) != target {
		i := peak + sort.Search(n-1-peak, func(i int) bool { return arr.get(i+peak) <= target })
		if arr[i] != target {
			return -1
		}
	}
	return i
} */

func hasMatch(s string, p string) bool {
	star := strings.IndexByte(p, '*')
	i := strings.Index(s, p[:star])
	return i >= 0 && strings.Contains(s[i+star:], p[star+1:])
}

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

// j i k
// 1

func goodDaysToRobBank(nums []int, k int) (ans []int) {
	n := len(nums)
	if k == 0 {
		for i := range n {
			ans = append(ans, i)
		}
		return
	}
	suffix := make([]int, n)
	suffix[n-1] = 1
	for i := n - 2; i >= 0; i-- {
		if nums[i] <= nums[i+1] {
			suffix[i] = suffix[i+1] + 1
		} else {
			suffix[i] = 1
		}
	}
	prefix := 1
	for i := 1; i < n-1; i++ {
		if prefix >= k && suffix[i+1] >= k && nums[i-1] >= nums[i] && nums[i] <= nums[i+1] {
			ans = append(ans, i)
		}
		if nums[i-1] >= nums[i] {
			prefix++
		} else {
			prefix = 1
		}
	}
	return
}

// 前一段是递减的  后一段是递增的

func lengthOfLastWord(s string) int {
	arr := strings.Fields(s)
	return len(arr[len(arr)-1])
}

func strStr(haystack string, needle string) int {
	return strings.Index(haystack, needle)
}
func addBinary(a string, b string) string {
	iB, _ := strconv.Atoi(b)
	iA, _ := strconv.Atoi(a)
	x, y := strconv.FormatInt(int64(iA), 2), strconv.FormatInt(int64(iB), 2)
	fmt.Println(x, y)
	return ""
}

func majorityElement(nums []int) int {
	votes := 0
	x := 0
	for _, v := range nums {
		if votes == 0 {
			x = v
		}
		if x == v {
			votes++
		} else {
			votes--
		}
	}
	return x
}

func minFlipsMonoIncr(s string) (ans int) {
	ans = math.MaxInt
	// 后面0的个数
	suffix := strings.Count(s, "0")
	prefix := 0
	for i, ch := range s {
		if ch == '0' {
			suffix--
		}
		fmt.Println(i)
		ans = min(ans, prefix+suffix)
		if ch == '1' {
			prefix++
		}
	}
	return
}

func increasingTriplet(nums []int) bool {
	// 前缀最小值   后缀最大值
	n := len(nums)
	suffix := make([]int, n)
	suffix[n-1] = nums[n-1]
	for i := n - 2; i >= 0; i-- {
		suffix[i] = max(suffix[i+1], nums[i])
	}
	prefix := nums[0]
	for i := 1; i < n-1; i++ {
		x := nums[i]
		if prefix < x && x < suffix[i+1] {
			return true
		}
		prefix = min(prefix, x)
	}
	return false
}

func minimumDeletions(s string) (ans int) {
	ans = math.MaxInt
	// 后面0的个数
	suffix := strings.Count(s, "a")
	prefix := 0
	for _, ch := range s {
		if ch == 'a' {
			suffix--
		}
		ans = min(ans, prefix+suffix)
		if ch == 'b' {
			prefix++
		}
	}
	return
}
func maximumSum(arr []int) int {
	n := len(arr)
	suffix := make([]int, n)
	suffix[n-1] = arr[n-1]
	for i := n - 2; i >= 0; i-- {
		x := arr[i]
		suffix[i] = max(suffix[i+1]+x, x)
	}
	fmt.Println(suffix)
	prefix := arr[0]
	ans := prefix
	for i := 1; i < n-1; i++ {
		x := arr[i]
		ans = max(ans, max(prefix, 0)+suffix[i+1], prefix+max(suffix[i+1], 0))
		prefix = max(prefix+x, x)
	}
	return ans
}

func trap222(height []int) (ans int) {
	n := len(height)
	suffix := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		suffix[i] = max(suffix[i+1], height[i])
	}
	fmt.Println(suffix)
	prefix := 0
	for i, h := range height {
		prefix = max(prefix, h)
		ans += min(suffix[i+1], prefix) - h
	}
	return
}
func trap33(height []int) (ans int) {
	n := len(height)
	left, right := 0, n-1
	suffix, prefix := 0, 0
	for left <= right {
		suffix = max(suffix, height[right])
		prefix = max(prefix, height[left])
		if prefix < suffix {
			ans += prefix - height[left]
			left++
		} else {
			ans += prefix - height[right]
			right--
		}
	}
	return
}

func trap(height []int) (ans int) {
	// n := len(height)
	st := []int{}
	for i, h := range height {
		for len(st) > 0 && height[st[len(st)-1]] <= h {
			bottomH := height[st[len(st)-1]]
			st = st[:len(st)-1]
			if len(st) == 0 {
				break
			}
			left := st[len(st)-1]
			ans += (i - left) * (min(h, height[left]) - bottomH)
		}
		st = append(st, i)
	}
	return
}

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
func differenceOfDistinctValues222333(grid [][]int) [][]int {
	m, n := len(grid), len(grid[0])
	ans := make([][]int, m)
	set := map[int]struct{}{}
	for i := range m {
		ans[i] = make([]int, n)
		for j := range n {
			clear(set)
			for x, y := i-1, j-1; x >= 0 && y >= 0; x, y = x-1, y-1 {
				set[grid[x][y]] = struct{}{}
			}
			topLeft := len(set)
			clear(set)
			for x, y := i+1, j+1; x < m && y < n; x, y = x+1, y+1 {
				set[grid[x][y]] = struct{}{}
			}
			bottomRight := len(set)
			ans[i][j] = abs(topLeft - bottomRight)
		}
	}
	return ans
}

func differenceOfDistinctValues222(grid [][]int) [][]int {
	m, n := len(grid), len(grid[0])
	ans := make([][]int, m)
	for i := range ans {
		ans[i] = make([]int, n)
	}
	set := map[int]struct{}{}
	for k := 1; k < m+n; k++ {
		// k= i-j+n  比方说以右上角来说0 -(n-1)+n=0-n+1+n=1
		minJ := max(0, n-k)       // 把i等于0代入k= i-j+n
		maxJ := min(n-1, m-1+n-k) // 把i等于m-1代入
		clear(set)
		for j := minJ; j <= maxJ; j++ {
			i := k + j - n
			ans[i][j] = len(set)
			set[grid[i][j]] = struct{}{}
		}
		clear(set)
		for j := maxJ; j >= minJ; j-- {
			i := k + j - n
			ans[i][j] = abs(ans[i][j] - len(set))
			set[grid[i][j]] = struct{}{}
		}
	}
	return ans
}

func differenceOfDistinctValues(grid [][]int) [][]int {
	m, n := len(grid), len(grid[0])
	ans := make([][]int, m)
	for i := range ans {
		ans[i] = make([]int, n)
	}
	for k := 1; k < m+n; k++ {
		// k= i-j+n  比方说以右上角来说0 -(n-1)+n=0-n+1+n=1
		minJ := max(0, n-k)       // 把i等于0代入k= i-j+n
		maxJ := min(n-1, m-1+n-k) // 把i等于m-1代入
		set := uint(0)
		for j := minJ; j <= maxJ; j++ {
			i := k + j - n
			ans[i][j] = bits.OnesCount(set)
			set |= 1 << grid[i][j]
		}
		set = 0
		for j := maxJ; j >= minJ; j-- {
			i := k + j - n
			ans[i][j] = abs(ans[i][j] - bits.OnesCount(set))
			set |= 1 << grid[i][j]
		}
	}
	return ans
}

func minSumOfLengths(arr []int, target int) (ans int) {
	ans = math.MaxInt
	n := len(arr)
	dp := make([]int, n+1)
	for i := range dp {
		dp[i] = math.MaxInt / 2
	}
	left := 0
	winSum := 0
	for right, x := range arr {
		winSum += x
		for winSum > target {
			winSum -= arr[left]
			left++
		}
		if winSum == target {
			ans = min(ans, dp[left]+(right-left+1))
			dp[right+1] = min(dp[right], right-left+1)
		} else {
			dp[right+1] = dp[right]
		}
	}
	fmt.Println(ans)
	if ans >= math.MaxInt/2 {
		return -1
	}
	return
}

func maximumOr111(nums []int, k int) int64 {
	n := len(nums)
	suffix := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		suffix[i] = suffix[i+1] | nums[i]
	}
	ans := 0
	prefix := 0
	for i, x := range nums {
		ans = max(ans, suffix[i+1]|prefix|(x<<k))
		prefix |= x
	}
	return int64(ans)
}
func maximumOr(nums []int, k int) int64 {
	orAll, fixed := 0, 0
	for _, x := range nums {
		fixed |= orAll & x
		orAll |= x
	}
	ans := 0
	for _, x := range nums {
		ans = max(ans, orAll^x|fixed|(x<<k))
	}
	return int64(ans)
}

func lengthOfLIS(nums []int) int {
	g := []int{}
	for _, x := range nums {
		j := sort.SearchInts(g, x)
		if j == len(g) {
			g = append(g, x)
		} else {
			g[j] = x
		}
	}
	return len(g)
}
func minimumMountainRemovals(nums []int) (ans int) {
	n := len(nums)
	g := []int{}
	suffix := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		x := nums[i]
		j := sort.SearchInts(g, x)
		if j == len(g) {
			g = append(g, x)
		} else {
			g[j] = x
		}
		suffix[i] = len(g)
	}
	prefix := 0
	g = []int{}
	for i, x := range nums {
		j := sort.SearchInts(g, x)
		if j == len(g) {
			g = append(g, x)
		} else {
			g[j] = x
		}
		prefix = len(g)
		if prefix >= 2 && suffix[i] >= 2 {
			ans = max(ans, prefix+suffix[i]-1)
		}
	}
	return
}

func constructProductMatrix(grid [][]int) [][]int {
	const mod = 12345
	suffix := 1
	m, n := len(grid), len(grid[0])
	ans := make([][]int, m)
	for i := range ans {
		ans[i] = make([]int, n)
	}
	for i := m - 1; i >= 0; i-- {
		for j := n - 1; j >= 0; j-- {
			ans[i][j] = suffix
			suffix = (suffix * grid[i][j]) % mod
		}
	}
	prefix := 1
	for i, rows := range grid {
		for j, col := range rows {
			ans[i][j] = ans[i][j] * prefix % mod
			prefix = prefix * col % mod
		}
	}
	return ans
}
func gcd(a, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}
func lcm(a int, b int) int {
	return a / gcd(a, b) * b
}
func maxScore(nums []int) int64 {
	n := len(nums)
	suffixGcd := make([]int, n+1)
	suffixLcm := make([]int, n+1)
	suffixLcm[n] = 1
	for i := n - 1; i >= 0; i-- {
		x := nums[i]
		suffixGcd[i] = gcd(suffixGcd[i+1], x)
		suffixLcm[i] = lcm(suffixLcm[i+1], x)
	}
	// 题目说明是最多移除一个元素（所以也可以不移除）
	ans := suffixGcd[0] * suffixLcm[0]
	prefixGcd, prefixLcm := 0, 1
	for i, x := range nums {
		ans = max(ans, gcd(prefixGcd, suffixGcd[i+1])*lcm(prefixLcm, suffixLcm[i+1]))
		prefixGcd = gcd(prefixGcd, x)
		prefixLcm = lcm(prefixLcm, x)
	}
	return int64(ans)
}

func minimumTime(s string) (ans int) {
	n := len(s)
	suffix := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		ch := s[i]
		if ch == '1' {
			suffix[i] = min(suffix[i+1]+2, n-i)
		} else {
			suffix[i] = suffix[i+1]
		}
	}
	ans = suffix[0]
	prefix := 0
	for i, ch := range s {
		if ch == '1' {
			prefix = min(prefix+2, i+1)
			ans = max(ans, prefix+suffix[i+1])
		}
	}
	return
}

func countPalindromicSubsequence(s string) (ans int) {
	pre, suf, has := [26]int{}, [26]int{}, [26]int{}
	for _, ch := range s[1:] {
		suf[ch-'a']++
	}
	n := len(s)
	for i := 1; i < n; i++ {
		pre[s[i-1]-'a']++
		suf[s[i]-'a']--
		for j := 0; j < 26; j++ {
			if pre[j] > 0 && suf[j] > 0 {
				has[s[i]-'a'] |= 1 << j
			}
		}
	}
	for _, mask := range has {
		ans += bits.OnesCount(uint(mask))
	}
	return
}

func countPalindromes111(s string) (ans int) {
	const mod = 1e9 + 7
	n := len(s)
	suf := [10]int{}
	suf2 := [10][10]int{}
	for i := n - 1; i >= 0; i-- {
		d := s[i] - '0'
		for j, c := range suf {
			suf2[d][j] += c
		}
		suf[d]++
	}
	pre := [10]int{}
	pre2 := [10][10]int{}
	for _, d := range s[:n-1] {
		d -= '0'
		suf[d]--
		for j, c := range suf {
			suf2[d][j] -= c
		}
		for j, sf := range suf2 {
			for k, c := range sf {
				ans += pre2[j][k] * c
			}
		}
		for j, c := range pre {
			pre2[d][j] += c
		}
		pre[d]++
	}
	return ans % mod
}

func countPalindromes(s string) (ans int) {
	const mod = 1_000_000_007
	suf := [10]int{}
	suf2 := [10][10]int{}
	n := len(s)
	for i := n - 1; i >= 0; i-- {
		d := s[i] - '0'
		for j, c := range suf {
			suf2[d][j] += c
		}
		suf[d]++
	}
	pre := [10]int{}
	pre2 := [10][10]int{}
	for _, d := range s[:n-1] {
		d -= '0'
		suf[d]--
		for j, c := range suf {
			suf2[d][j] -= c
		}
		for j, sf := range suf2 {
			for k, c := range sf {
				ans += pre2[j][k] * c
			}
		}
		for j, c := range pre {
			pre2[d][j] += c
		}
		pre[d]++
	}

	return ans % mod
}

func minimumScore(s string, t string) int {
	n, m := len(s), len(t)
	suf := make([]int, n+1)
	suf[n] = m
	for i, j := n-1, m-1; i >= 0; i-- {
		if s[i] == t[j] {
			j--
		}
		if j < 0 { // t 是 s 的子序列
			return 0
		}
		suf[i] = j + 1
	}

	ans := suf[0] // 删除 t[:suf[0]]
	j := 0
	for i := range s {
		if s[i] == t[j] { // 注意上面判断了 t 是 s 子序列的情况，这里 j 不会越界
			j++
			ans = min(ans, suf[i+1]-j) // 删除 t[j:suf[i+1]]
		}
	}
	return ans
}

func countQuadruplets(nums []int) (ans int) {
	n := len(nums)
	cnt := map[int]int{}
	for i, x := range nums {
		for j := i + 1; j < n; j++ {
			ans += cnt[nums[j]-x]
		}
		for k := 0; k < i; k++ {
			cnt[nums[k]+x]++
		}
	}
	return
}
func isIsomorphic(s string, t string) bool {
	s2t := map[byte]byte{}
	t2s := map[byte]byte{}
	for i, ch := range s {
		if cur, ok := s2t[byte(ch)]; ok {
			if cur != t[i] {
				return false
			}
		} else {
			s2t[byte(ch)] = t[i]
		}
		if cur, ok := t2s[t[i]]; ok {
			if cur != byte(ch) {
				return false
			}
		} else {
			t2s[t[i]] = byte(ch)
		}
	}
	return true
}

func isAnagram(s string, t string) bool {
	cntS := [26]int{}
	for _, x := range s {
		cntS[x-'a']++
	}
	cntT := [26]int{}
	for _, x := range t {
		cntT[x-'a']++
	}
	for i := 0; i < 26; i++ {
		if cntS[i] != cntT[i] {
			return false
		}
	}
	return true
}

func isHappy(n int) bool {
	fn := func(n int) (ans int) {
		for n > 0 {
			x := n % 10
			ans += x * x
			n /= 10
		}
		return
	}
	slow := fn(n)
	fast := fn(slow)
	for fast != slow {
		slow = fn(slow)
		fast = fn(fn(fast))
	}
	return fast == 1
}

func findLucky(arr []int) (ans int) {
	cnt := map[int]int{}
	for _, x := range arr {
		cnt[x]++
	}
	for k, c := range cnt {
		if k == c {
			if k > ans {
				ans = k
			}
		}
	}
	return
}
