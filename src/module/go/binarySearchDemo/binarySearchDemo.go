package binarysearchdemo

import (
	"fmt"
	"math"
	"slices"
	"sort"
)

func maximumCandies222(candies []int, K int64) int {
	k := int(K)
	totalSum := 0
	/* if len(candies) == 1 {
		return candies[0] / k
	} */
	for _, x := range candies {
		totalSum += x
	}
	if totalSum < k {
		return 0
	}
	left, right := -1, totalSum+1
	check := func(val int) bool {
		sum := 0
		for _, x := range candies {
			if val == 0 {
				sum += x
			} else {
				sum += x / val
			}
		}
		return sum >= k
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
func successfulPairs(spells []int, potions []int, success int64) []int {
	slices.Sort(spells)
	n := len(potions)
	ans := make([]int, len(spells))
	for i, x := range spells {
		ans[i] = n - sort.SearchInts(potions, int(success-1)/x+1)
	}
	return ans
}

func buildArray(nums []int) []int {
	n := len(nums)
	ans := make([]int, n)
	for i, x := range nums {
		ans[i] = nums[x]
	}
	return ans
}
func answerQueries(nums []int, queries []int) []int {
	sort.Ints(nums)
	for i := 1; i < len(nums); i++ {
		nums[i] += nums[i-1]
	}
	n := len(queries)
	ans := make([]int, n)
	for i, q := range queries {
		// ans[i] = sort.SearchInts(nums, q+1)
		ans[i] = sort.Search(len(nums), func(i int) bool { return nums[i] > q })
	}
	return ans
}

// 1 2 4 5
// 1 3 7 12
func f_1170(s string) int {
	// 返回中 按字典序比较  最小字母的出现频次
	cnt := make([]int, 26)
	for _, c := range s {
		cnt[c-'a']++
	}
	for _, v := range cnt {
		if v != 0 {

			return v
		}
	}
	return 0
}

// 1170
func numSmallerByFrequency(queries []string, words []string) []int {
	qn := len(queries)
	newQuery := make([]int, qn)
	for i, v := range queries {
		newQuery[i] = f_1170(v)
	}
	wn := len(words)
	newWord := make([]int, wn)
	for i, v := range words {
		newWord[i] = f_1170(v)
	}
	fmt.Println(newQuery)
	fmt.Println(newWord)
	slices.Sort((newWord))
	ans := make([]int, qn)
	for i, v := range newQuery {
		fmt.Println(v, sort.SearchInts(newWord, v+1))
		// ans[i] = wn - sort.SearchInts(newWord, v+1)
		ans[i] = wn - sort.Search(wn, func(i int) bool { return newWord[i] > v })
	}
	return ans
}
func minimizedMaximum2(n int, quantities []int) int {
	mx := slices.Max(quantities)
	return sort.Search(mx, func(max int) bool {
		fmt.Println(max)
		cnt := 0
		for _, q := range quantities {
			cnt += (q + max) / (max + 1)
		}
		return cnt <= n
	}) + 1
}
func minimizedMaximum(n int, quantities []int) int {
	mx := slices.Max(quantities)
	return sort.Search(mx, func(max int) bool {
		fmt.Println(max)
		cnt := 0
		for _, q := range quantities {
			cnt += (q + max - 1) / max
		}
		return cnt <= n
	}) + 1
}

func minAbsoluteSumDiff(nums1 []int, nums2 []int) int {
	const mod = 1e9 + 7
	n := len(nums1)
	sorted := make([]int, n)
	copy(sorted, nums1)
	sort.Ints(sorted)
	sum := 0
	mx := 0
	for i := 0; i < n; i++ {
		a := nums1[i]
		b := nums2[i]
		if a == b {
			continue
		}
		x := abs(a - b)
		sum += x
		r := sort.SearchInts(sorted, b)
		if r < n {
			nd := abs(sorted[r] - b)
			if r+1 < n {
				nd = min(nd, sorted[r+1]-b)
			}
			if nd < x {
				mx = max(mx, x-nd)
			}
		}
	}
	return (sum - mx) % mod
}

func smallestDivisor(nums []int, threshold int) int {
	left, right := 0, slices.Max(nums)
	check := func(m int) bool {
		sum := 0
		for _, x := range nums {
			sum += (x + m - 1) / m
			if sum > threshold {
				return false
			}
		}
		return true
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

func minimumTime(time []int, totalTrips int) int64 {
	minT := slices.Min(time)
	left, right := minT-1, minT*totalTrips
	check := func(m int) bool {
		cnt := 0
		for _, x := range time {
			cnt += x / m
			if cnt >= totalTrips {
				return true
			}
		}
		return false
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	return int64(right)
}
func shipWithinDays12(weights []int, days int) int {
	sum, mx := 0, 0
	for _, x := range weights {
		sum += x
		if x > mx {
			mx = x
		}
	}
	check := func(mid int) bool {
		cnt, sum := 0, 0
		for _, x := range weights {
			if sum+x > mid {
				sum = 0
				cnt++
				if cnt > days {
					return false
				}
			}
			sum += x
		}
		return true
	}
	left, right := mx-1, sum
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
func shipWithinDays(weights []int, days int) int {
	sum, mx := 0, 0
	for _, x := range weights {
		sum += x
		if x > mx {
			mx = x
		}
	}
	check := func(mid int) bool {
		cnt, sum := 0, 0
		for _, x := range weights {
			if sum+x > mid {
				sum = 0
				cnt++
				if cnt > days {
					return false
				}
			}
			sum += x
		}
		return true
	}
	left, right := mx-1, sum
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

func minEatingSpeed(piles []int, h int) int {
	mx := slices.Max(piles)
	check := func(mid int) bool {
		cnt := 0
		for _, x := range piles {
			// cnt += (x + mid - 1) / mid
			cnt += (x - 1/mid) + 1
			if cnt > h {
				return false
			}
		}
		return true
	}
	left, right := -1, mx
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

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
func findRadius(houses []int, heaters []int) (ans int) {
	slices.Sort(houses)
	slices.Sort(heaters)
	for i, j := 0, 0; i < len(houses); i++ {
		// 确保没有任何供暖器在房子左边时的情况
		cur := abs(heaters[j] - houses[i])
		// 房子左边的供暖器的最短距离
		for j < len(heaters) && heaters[j] <= houses[i] {
			cur = houses[i] - heaters[j]
			j++
		}
		// 右边的与左边比较谁更短，abs也是确保没有任何供暖器在房子左边时的情况
		if j < len(heaters) {
			cur = min(cur, abs(heaters[j]-houses[i]))
		}
		ans = max(ans, cur)
		if j > 0 {
			// 确保每次for循环，遍历的供暖器都在房子的左边
			j--
		}
	}
	return
}
func findRadius222(houses []int, heaters []int) int {
	left := 0
	slices.Sort(heaters)
	slices.Sort(houses)
	right := max(heaters[len(heaters)-1]-houses[0], houses[len(houses)-1]-heaters[0]) + 1
	check := func(mid int) bool {
		j := 0
		n := len(heaters)
		for _, x := range houses {
			for j < n && heaters[j] <= x {
				j++
			}
			if j < n {
				if abs(heaters[j]-x) > mid {
					return false
				}
			}
			if j > 0 {
				if abs(heaters[j-1]-x) > mid {
					return false
				}
			}
		}
		return true
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

// 1 2 3 4 5
func repairCars(ranks []int, cars int) int64 {
	mn := slices.Min(ranks)
	left := 0
	right := mn*cars*cars + 1
	check := func(mid int) bool {
		// mid表示修车花了多长时间
		sum := 0 // 修了多少辆车
		for _, x := range ranks {
			sum += int(math.Sqrt(float64(mid / x)))
			if sum >= cars {
				return true
			}
		}
		return false
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	return int64(right)
}

func minDays(bloomDay []int, m int, k int) int {
	n := len(bloomDay)
	if m*k > n {
		return -1
	}
	mx := slices.Max(bloomDay)
	check := func(mid int) bool {
		// mid表示当前是第几天
		// 循环 统计在mid天（包含mid）可以制成多少花
		cnt := 0
		// 相邻有多少朵满足条件的可以用来制成花的
		tmp := 0
		for _, x := range bloomDay {
			if x > mid {
				tmp = 0
			} else {
				tmp++
				if tmp >= k {
					cnt++
					if cnt >= m {
						return true
					}
				}
			}
		}
		return false
	}
	left, right := 0, mx
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
func earliestSecondToMarkIndices222(nums []int, changeIndices []int) int {
	// 有n门课程 在m天内可以去参加对应考试
	n, m := len(nums), len(changeIndices)
	if n > m {
		return -1
	}
	// 最后参加考试的时间
	lastT := make([]int, n)
	check := func(mid int) bool {
		for i := range lastT {
			lastT[i] = -1
		}
		for t := 0; t < mid; t++ {
			lastT[changeIndices[t]-1] = t
		}
		for _, t := range lastT {
			if t < 0 {
				// 有课程没有考虑
				return false
			}
		}
		cnt := 0
		for i := 0; i < mid; i++ {
			idx := changeIndices[i] - 1
			if i == lastT[idx] { // 考试
				if nums[idx] > cnt { // 没足够时间复习
					return false
				}
				cnt -= nums[idx] // 复习这门课程
			} else {
				cnt++ // 留着后面用
			}
		}
		return true
	}
	left, right := n-1, m+1
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	if right > m {
		return -1
	}
	return right
}

func minSpeedOnTime(dist []int, hour float64) int {
	mx := slices.Max(dist)
	left, right := 0, int(float64(mx)*float64(len(dist))/hour+2)
	check := func(mid int) bool {
		// mid为速度
		s := 0.0 // 表示需要多长时间
		for _, x := range dist {
			// s += (x + mid - 1) / mid
			s += (float64(x) + float64(mid) - 1) / float64(mid)
			if s > hour {
				return false
			}
		}
		return true
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	// math.Ceil()
	return right
}

func maximumCandies(candies []int, K int64) int {
	k := int(K)
	totalSum := 0
	for _, x := range candies {
		totalSum += x
	}
	// 每个人都不够拿到1个糖果
	if totalSum < k {
		return 0
	}
	// 只有一个小朋友  所有糖果都分给了这个小朋友
	left, right := 0, totalSum+1
	check := func(val int) bool {
		// val表示 可以拿到的糖果数
		sum := 0
		for _, x := range candies {
			sum += x / val
		}
		return sum >= k
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
func hIndex(citations []int) int {
	n := len(citations)
	left, right := 0, citations[n-1]+1
	check := func(mid int) bool {
		cnt := 0
		// mid 表示被引用的次数
		for i := n - 1; i >= 0; i-- {
			if citations[i] >= mid {
				cnt++
				if cnt >= mid {
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
func maximumLength(s string) (ans int) {
	groups := [26][]int{}
	n := len(s)
	cnt := 0
	for i, ch := range s {
		cnt++
		if i == n-1 || (byte(ch) != s[i+1]) {
			groups[ch-'a'] = append(groups[ch-'a'], cnt)
			cnt = 0
		}
	}
	for _, a := range groups {
		if len(a) == 0 {
			continue
		}
		a = append(a, 0, 0)
		slices.SortFunc(a, func(x, y int) int { return y - x })
		first, second, third := a[0], a[1], a[2]
		ans = max(ans, max(first-2, min(first-1, second), third))
	}
	if ans == 0 {
		return -1
	}
	return
}

func maxNumOfMarkedIndices222(nums []int) int {
	n := len(nums)
	slices.Sort(nums)
	// 0对肯定是不满足条件的
	left := 0
	// 最多n/2对  n/2 + 1对的话数据量都不够了
	right := n/2 + 1
	check := func(k int) bool {
		// 配置k对
		for i := 0; i < k; i++ {
			// 贪心的想应该是前k个和后k个匹配
			if nums[i]*2 > nums[n-k+i] {
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
	n := len(nums)
	slices.Sort(nums)
	left := 0
	// 上取整
	for _, x := range nums[(n+1)/2:] {
		if nums[left]*2 <= x {
			left++
		}
	}
	return left * 2
}
func maximumRemovals(s string, p string, removable []int) int {
	left, right := 0, len(removable)+1
	check := func(mid int) bool {
		set := map[int]struct{}{}
		for _, x := range removable[:mid] {
			set[x] = struct{}{}
		}
		j := 0
		for i, ch := range s {
			if _, ok := set[i]; ok {
				continue
			}
			if byte(ch) == p[j] {
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
func maxValue33(n int, index int, maxSum int) int {
	left, right := 0, maxSum
	// 最大值为x 一共有cnt个元素  数组总和
	sum := func(x, cnt int) int {
		if x >= cnt {
			return (x + x - cnt + 1) * cnt / 2
		}
		return (x+1)*x/2 + cnt - x
	}
	check := func(mid int) bool {
		mid++
		return sum(mid-1, index)+sum(mid, n-index) > maxSum
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
	// 正确的二分查找边界，元素至少为1
	left, right := 0, maxSum+1

	// 计算以x为峰值，长度为cnt的数组的总和
	sum := func(x, cnt int) int {
		if cnt == 0 {
			return 0
		}
		if x > cnt {
			// 等差数列求和：x + (x-1) + ... + (x-cnt+1)
			return (x + x - cnt + 1) * cnt / 2
		} else {
			// 前x项从1到x，后面补1
			return (x+1)*x/2 + (cnt - x)
		}
	}

	// 检查当峰值为mid时，总和是否不超过maxSum
	check := func(mid int) bool {
		// 左侧sum(mid-1, index)：峰值左侧的递减序列
		// 右侧sum(mid, n-index-1)：峰值及其右侧的递减序列
		total := sum(mid-1, index) + sum(mid, n-index)
		return total <= maxSum
	}

	// 二分查找模板
	for left+1 < right {
		mid := left + (right-left)/2
		if check(mid) {
			left = mid
		} else {
			right = mid
		}
	}

	// 返回right，因为right是最后一个满足条件的值
	return right
}
