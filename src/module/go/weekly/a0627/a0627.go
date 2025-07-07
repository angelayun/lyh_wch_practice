package a0627

import (
	"cmp"
	"container/heap"
	"fmt"
	"math"
	"slices"
	"sort"
)

func findKthNumber(m int, n int, k int) int {
	left, right := 0, m*n
	check := func(mid int) bool {
		// mid表示上界
		cnt := 0
		for i := 1; i <= m; i++ {
			cnt += min(n, mid/i)
		}
		return cnt >= k
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

func kthSmallest(matrix [][]int, k int) int {
	n := len(matrix)
	left, right := matrix[0][0]-1, matrix[n-1][n-1]+1
	check := func(mid int) bool {
		// 上界是mid的情况下 是否有k个元素满足条件
		cnt := 0
		i, j := 0, n-1
		for i < n && j >= 0 {
			if matrix[i][j] <= mid {
				cnt += j + 1
				i++
			} else {
				j--
			}
		}
		return cnt >= k
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

func smallestDistancePair(nums []int, k int) int {
	n := len(nums)
	slices.Sort(nums)
	left, right := -1, nums[n-1]-nums[0]+1
	check := func(mid int) bool {
		// 差值为mid的情况下 有多少满足
		cnt := 0
		left := 0
		for right, x := range nums {
			for left < n && x-nums[left] > mid {
				left++
			}
			cnt += right - left
		}
		return cnt >= k
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
func gcd(a, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}
func lcm(a int, b int) int {
	return a / gcd(a, b) * b
}
func nthUglyNumber(n int, a int, b int, c int) int {
	mn := min(a, b, c)
	l1 := lcm(a, b)
	l2 := lcm(b, c)
	l3 := lcm(a, c)
	l4 := lcm(lcm(a, b), c)
	left, right := mn+n-2, mn*n
	check := func(mid int) bool {
		cnt := mid/a + mid/b + mid/c - mid/l1 - mid/l2 - mid/l3 + mid/l4
		return cnt >= n
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
func nthMagicalNumber(n int, a int, b int) int {
	mn := min(a, b)
	left, right := mn+n-2, mn*n
	check := func(mid int) bool {
		cnt := mid/a + mid/b - mid/lcm(a, b)
		return cnt >= n
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	return right % 1_000_000_007
}

func preimageSizeFZF(k int) int {
	cnt5 := func(n int) int {
		res := 0
		for n > 0 {
			res += int(n / 5)
			n /= 5
		}
		return res
	}

	lowerBound := func(k int) int {
		var r int = 5 * int(k)
		var l int = 0
		for l+1 < r {
			m := (l + r) / 2
			if cnt5(m) >= k {
				r = m
			} else {
				l = m
			}
		}
		return r
	}

	return int(lowerBound(k+1) - lowerBound(k))
}

func searchRange111(nums []int, target int) []int {
	index, ok := slices.BinarySearch(nums, target)
	if ok {
		last := sort.SearchInts(nums[index+1:], target+1) - 1
		return []int{index, last}
	}
	return []int{-1, -1}
}
func searchRange(nums []int, target int) []int {
	n := len(nums)
	index := sort.SearchInts(nums, target)
	if index >= n || nums[index] != target {
		return []int{-1, -1}
	}
	last := sort.SearchInts(nums, target+1) - 1
	return []int{index, last}
}
func searchInsert(nums []int, target int) int {
	return sort.SearchInts(nums, target)
}
func search2(nums []int, target int) int {
	n := len(nums)
	index := sort.SearchInts(nums, target)
	if index >= n || nums[index] != target {
		return -1
	}
	return index
}
func search(nums []int, target int) int {
	index, ok := slices.BinarySearch(nums, target)
	if !ok {
		return -1
	}
	return index
}
func nextGreatestLetter22(letters []byte, target byte) byte {
	n := len(letters)
	index := sort.Search(n, func(i int) bool {
		return letters[i] > target
	})
	return letters[index%n]
}

func nextGreatestLetter(letters []byte, target byte) byte {
	n := len(letters)
	left, right := 0, n
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if letters[mid] > target {
			right = mid
		} else {
			left = mid
		}
	}
	return letters[right%n]
}

func maximumCount(nums []int) int {
	negCount := sort.SearchInts(nums, 0)
	negOneCount := len(nums) - sort.SearchInts(nums, 1)
	return max(negCount, negOneCount)
}
func successfulPairs(spells []int, potions []int, success int64) []int {
	n, m := len(spells), len(potions)
	slices.Sort(potions)
	ans := make([]int, n)
	for i, x := range spells {
		j := sort.SearchInts(potions, (int(success)+x-1)/x)
		ans[i] = m - j
	}
	return ans
}

func findTheDistanceValue111(arr1 []int, arr2 []int, d int) (ans int) {
	slices.Sort(arr1)
	slices.Sort(arr2)
	n := len(arr2)
	j := 0
	for _, x := range arr1 {
		for j < n && arr2[j] < x-d {
			j++
		}
		if j >= n || arr2[j] > x+d {
			ans++
		}
	}
	return
}
func findTheDistanceValue(arr1 []int, arr2 []int, d int) (ans int) {
	slices.Sort(arr1)
	n := len(arr1)
	for _, x := range arr2 {
		j := sort.SearchInts(arr1, x)
		if j >= n || arr2[j] > x+d {
			ans++
		}
	}
	return
}

func answerQueries(nums []int, queries []int) []int {
	slices.Sort(nums)
	for i := 1; i < len(nums); i++ {
		nums[i] += nums[i-1]
	}
	// 1 2 4 5
	// 1 3 7 12
	n := len(queries)
	ans := make([]int, n)
	for i, x := range queries {
		ans[i] = sort.SearchInts(nums, x+1)
	}
	return ans
}
func f(s string) int {
	// 统计 s  中（按字典序比较）最小字母的出现频次
	cnt := [26]int{}
	for _, x := range s {
		cnt[x-'a']++
	}
	for _, c := range cnt {
		if c != 0 {
			return c
		}
	}
	return 0
}
func numSmallerByFrequency(queries []string, words []string) []int {
	numW := make([]int, len(words))
	for i, s := range words {
		numW[i] = f(s)
	}
	slices.Sort(numW)
	ans := make([]int, len(queries))
	for i, q := range queries {
		ans[i] = len(words) - sort.SearchInts(numW, f(q)+1)
	}
	return ans
}

func solveQueries(nums []int, queries []int) []int {
	pos := map[int][]int{}
	for i, x := range nums {
		pos[x] = append(pos[x], i)
	}
	// 1 2 4 (7)
	// -3 1 2 4 8
	n := len(nums)
	for i, ls := range pos {
		first := ls[0]
		ls = slices.Insert(ls, 0, ls[len(ls)-1]-n)
		pos[i] = append(ls, first+n)
	}
	fmt.Println(pos)
	ans := make([]int, len(queries))
	/* for qi, i := range queries {
		p := pos[nums[i]]
		if len(p) == 3 {
			ans[qi] = -1
		} else {
			j := sort.SearchInts(p, i)
			ans[qi] = min(i-p[j-1], p[j+1]-i)
		}
	}
	return ans */
	for qi, i := range queries {
		x := nums[i]
		if len(pos[x]) == 3 {
			ans[qi] = -1
		} else {
			j := sort.SearchInts(pos[x], i)
			ans[qi] = min(i-pos[x][j-1], pos[x][j+1]-i)
		}
	}
	return ans
}

func countFairPairs123(nums []int, lower int, upper int) int64 {
	slices.Sort(nums)
	n := len(nums)
	l, r := n, n
	ans := 0
	for i, x := range nums {
		for l > 0 && nums[l-1] >= lower-x {
			l--
		}
		// 这个时候刚好r指向>=upper-x的位置
		for r > 0 && nums[r-1] > upper-x {
			r--
		}
		ans += min(r, i) - min(l, i)
	}
	return int64(ans)
}
func maxSubsequence22(nums []int, k int) []int {
	n := len(nums)
	idx := make([]int, n)
	for i := range idx {
		idx[i] = i
	}
	slices.SortFunc(idx, func(i, j int) int { return nums[j] - nums[i] })
	idx = idx[:k]
	slices.Sort(idx)
	for i, j := range idx {
		idx[i] = nums[j]
	}
	return idx
}
func countFairPairs23(nums []int, lower int, upper int) int64 {
	slices.Sort(nums)
	ans := 0
	for i, x := range nums {
		l := sort.SearchInts(nums[:i], lower-x)
		r := sort.SearchInts(nums[:i], upper-x+1)
		fmt.Println(r, l, x)
		ans += r - l
	}
	return int64(ans)
}
func countFairPairs(nums []int, lower int, upper int) int64 {
	slices.Sort(nums)
	n := len(nums)
	ans := 0
	l, r := n, n
	for i, x := range nums {
		for l > 0 && nums[l-1] >= lower-x {
			l--
		}
		for r > 0 && nums[r-1] > upper-x {
			r--
		}
		// l := sort.SearchInts(nums[:i], lower-x)
		// r := sort.SearchInts(nums[:i], upper-x+1)
		// fmt.Println(r,l,x)
		ans += max(r, i) - min(l, i)
	}
	return int64(ans)
}
func maximumBeauty222(items [][]int, queries []int) []int {
	// 按照价格从小到大排序
	slices.SortFunc(items, func(a, b []int) int { return a[0] - b[0] })
	for i := 1; i < len(items); i++ {
		items[i][1] = max(items[i-1][1], items[i][1])
	}
	m := len(queries)
	idx := make([]int, m)
	for i := range idx {
		idx[i] = i
	}
	slices.SortFunc(idx, func(i, j int) int { return queries[i] - queries[j] })
	ans := make([]int, m)
	maxBeauty, j := 0, 0
	for _, i := range idx {
		x := queries[i]
		for j < len(items) && items[j][0] <= x {
			maxBeauty = max(maxBeauty, items[j][1])
		}
		ans[i] = maxBeauty
	}
	return ans
}

func maximumBeauty12(items [][]int, queries []int) []int {
	// 按照价格从小到大排序
	slices.SortFunc(items, func(a, b []int) int {
		return a[0] - b[0]
	})
	n := len(items)
	for i := 1; i < n; i++ {
		items[i][1] = max(items[i-1][1], items[i][1])
	}
	m := len(queries)
	ans := make([]int, m)
	idx := make([]int, m)
	for i := range idx {
		idx[i] = i
	}
	// 从小到大
	slices.SortFunc(idx, func(i, j int) int { return queries[i] - queries[j] })
	j, maxBeauty := 0, 0
	for _, i := range idx {
		p := queries[i]
		for j < n && items[j][0] <= p {
			maxBeauty = items[j][1]
			j++
		}
		ans[9] = maxBeauty
	}
	return ans
}

func maximumBeauty34(items [][]int, queries []int) []int {
	// 按照价格从小到大排序
	slices.SortFunc(items, func(a, b []int) int {
		return a[0] - b[0]
	})
	n := len(items)
	for i := 1; i < n; i++ {
		items[i][1] = max(items[i-1][1], items[i][1])
	}
	m := len(queries)
	ans := make([]int, m)
	for i, q := range queries {
		j := sort.Search(n, func(i int) bool {
			return items[i][0] > q
		})
		if j > 0 {
			ans[i] = items[j-1][1]
		}
	}
	return ans
}

func maximumBeauty22233(items [][]int, queries []int) []int {
	// 按照价格从小到大排序
	slices.SortFunc(items, func(a, b []int) int {
		return a[0] - b[0]
	})
	n := len(items)
	k := 0
	for _, item := range items[1:] {
		if item[1] > items[k][1] {
			k++
			items[k] = item
		}
	}
	m := len(queries)
	ans := make([]int, m)
	for i, q := range queries {
		j := sort.Search(n, func(i int) bool {
			return items[i][0] > q
		})
		if j > 0 {
			ans[i] = items[j-1][1]
		}
	}
	return ans
}

func maximumBeauty(items [][]int, queries []int) []int {
	slices.SortFunc(items, func(a, b []int) int { return a[0] - b[0] })
	k := 0
	for _, item := range items[1:] {
		if item[1] > items[k][1] {
			k++
			items[k] = item
		}
	}
	idx := make([]int, len(queries))
	for i := range queries {
		idx[i] = i
	}
	slices.SortFunc(idx, func(i, j int) int { return queries[i] - queries[j] })

	ans := make([]int, len(queries))
	maxBeauty, j := 0, 0
	for _, i := range idx {
		q := queries[i]
		// 增量地遍历满足 queries[i-1] < price <= queries[i] 的物品
		for j < k+1 && items[j][0] <= q {
			maxBeauty = max(maxBeauty, items[j][1])
			j++
		}
		ans[i] = maxBeauty
	}
	return ans
}

func minAbsoluteSumDiff(nums1 []int, nums2 []int) int {
	n := len(nums1)
	const mod = 1_000_000_007
	ans, drop := 0, 0
	copyNums1 := append([]int{}, nums1...)
	slices.Sort(copyNums1)
	for i, x := range nums2 {
		val := abs(x - nums1[i])
		ans += val
		j := sort.SearchInts(copyNums1, x)
		if j < n {
			drop = max(drop, val-abs(x-copyNums1[j]))
		}
		if j > 0 {
			drop = max(drop, val-abs(x-copyNums1[j-1]))
		}
	}
	return (ans - drop) % mod
}
func minAbsoluteSumDiff2333(nums1 []int, nums2 []int) int {
	const mod = 1_000_000_007
	n := len(nums1)
	copyNums1 := append([]int{}, nums1...)
	slices.Sort(nums1)
	ans := 0
	drop := 0
	for i, x := range nums2 {
		val := abs(x - nums1[i])
		ans = (ans + val) % mod
		j := sort.SearchInts(copyNums1, x)
		if j < n {
			drop = max(drop, val-abs(x-copyNums1[j]))
		}
		if j > 0 {
			drop = max(drop, val-abs(x-copyNums1[j-1]))
		}
	}
	return (ans - drop) % mod
}
func findClosestElements(arr []int, k int, x int) []int {
	slices.SortFunc(arr, func(a, b int) int {
		return cmp.Or(cmp.Compare(abs(a-x), abs(b-x)), cmp.Compare(a, b))
	})
	ans := arr[:k]
	slices.Sort(ans)
	return ans
}

func getTriggerTime(increase [][]int, requirements [][]int) []int {
	n := len(increase)
	a0, a1, a2 := []int{0}, []int{0}, []int{0}
	for i, x := range increase {
		a0 = append(a0, x[0]+a0[i])
		a1 = append(a1, x[1]+a1[i])
		a2 = append(a2, x[2]+a2[i])
	}
	ans := []int{}
	for _, re := range requirements {
		i, j, k := sort.SearchInts(a0, re[0]), sort.SearchInts(a1, re[1]), sort.SearchInts(a2, re[2])
		if i <= n && j <= n && k <= n {
			ans = append(ans, max(i, j, k))
		} else {
			ans = append(ans, -1)
		}
	}
	return ans
}

func minimumTime111(time []int, totalTrips int) int64 {
	mn := slices.Min(time)
	left, right := mn-1, totalTrips/mn+1
	check := func(mid int) bool {
		// mid表示时间上限
		cnt := 0
		for _, x := range time {
			cnt += mid / x
		}
		return cnt >= totalTrips
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

func shipWithinDays111(weights []int, days int) int {
	sum, mx := 0, math.MinInt
	for _, w := range weights {
		sum += w
		mx = max(mx, w)
	}
	left, right := mx-1, sum
	check := func(mid int) bool {

		// mid当前一趟的运载能力
		cnt := 1
		s := mid
		for _, x := range weights {
			if s < x {
				cnt++
				s = mid
			}
			s -= x
		}
		return cnt <= days
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

func smallestDivisor(nums []int, threshold int) int {
	left, right := 0, slices.Max(nums)
	check := func(mid int) bool {
		// mid 当前除数
		sum := 0
		for _, x := range nums {
			// 上取整
			sum += (x + mid - 1) / mid
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
	left, right := 0, slices.Min(time)*totalTrips
	check := func(mid int) bool {
		// mid 当前时间
		sum := 0
		for _, x := range time {
			sum += mid / x
			if sum > totalTrips {
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
func shipWithinDays(weights []int, days int) int {
	mx := math.MinInt
	sum := 0
	for _, x := range weights {
		sum += x
		if x > mx {
			mx = x
		}
	}
	left, right := mx-1, sum
	check := func(mid int) bool {
		// mid 当前一趟可运载的重量
		s := mid
		cnt := 1
		for _, x := range weights {
			if s < x {
				s = mid
				cnt++
				if cnt > days {
					return false
				}
			}
			s -= x
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
	return (right)
}
func minEatingSpeed(piles []int, h int) int {
	sum := 0
	for _, x := range piles {
		sum += x
	}
	left, right := 0, sum
	check := func(mid int) bool {
		// mid 当前吃香蕉的速度
		s := 0
		for _, x := range piles {
			s += (mid + x - 1) / mid
			if s > h {
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
	return (right)
}
func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
func findRadius(houses []int, heaters []int) int {
	slices.Sort(houses)
	slices.Sort(heaters)
	left, right := -1, max(heaters[len(heaters)-1]-houses[0], houses[len(houses)-1]-heaters[0])
	check := func(mid int) bool {
		// 双指针法：i指向房屋，j指向供暖器
		i, j := 0, 0
		n, m := len(houses), len(heaters)

		for i < n && j < m {
			// 如果当前供暖器无法覆盖当前房屋，移动到下一个供暖器
			if abs(houses[i]-heaters[j]) <= mid {
				// 当前房屋被覆盖，检查下一个房屋
				i++
			} else {
				// 如果当前供暖器无法覆盖当前房屋，移动到下一个供暖器
				j++
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
	return (right)
}
func repairCars(ranks []int, cars int) int64 {
	mn := slices.Min(ranks)
	left, right := 0, mn*cars*cars
	check := func(mid int) bool {
		// mid 当时花的时间
		s := 0
		for _, x := range ranks {
			s += int(math.Sqrt(float64(mid / x)))
			if s >= cars {
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
	left, right := slices.Min(bloomDay)-1, slices.Max(bloomDay)
	check := func(mid int) bool {
		// mid 当前等待的时间
		cnt := 0
		tmp := 0
		for _, x := range bloomDay {
			if x <= mid {
				tmp++
			}
			if tmp >= k {
				cnt++
				tmp = 0
			}
		}
		return cnt >= m
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
func earliestSecondToMarkIndices222(nums []int, changeIndices []int) int {
	n, m := len(nums), len(changeIndices)
	if n > m {
		return -1
	}
	left, right := n-1, m
	lastT := make([]int, n)
	check := func(mid int) bool {
		// mid 最后考试的索引
		for i := range lastT {
			lastT[i] = -1
		}
		for i, x := range changeIndices[:mid] {
			lastT[x-1] = i
		}
		for _, x := range lastT {
			if x < 0 {
				return false
			}
		}
		cnt := 0
		for i, x := range changeIndices[:mid] {
			idx := x - 1
			if lastT[idx] == i {
				if nums[idx] > cnt {
					return false
				}
				cnt -= nums[idx]
			} else {
				cnt++
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
	if right > m {
		return -1
	}
	return right
}
func earliestSecondToMarkIndices(nums []int, changeIndices []int) int {
	n, m := len(nums), len(changeIndices)
	if n > m {
		return -1
	}
	left, right := n-1, m+1
	lastT := make([]int, n)
	check := func(mid int) bool {
		// mid 最大索引位置
		for i := range lastT {
			lastT[i] = -1
		}
		for i, x := range lastT[:mid] {
			lastT[x-1] = i
		}
		for i := range lastT {
			if lastT[i] < 0 {
				return false
			}
		}
		cnt := 0
		for i, x := range changeIndices[:mid] {
			idx := x - 1
			if lastT[idx] == i {
				if nums[i] > cnt {
					return false
				}
				cnt -= nums[i]
			} else {
				cnt++
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
	if right > m {
		return -1
	}
	return right
}
func maxSubsequence(nums []int, k int) []int {
	n := len(nums)
	idx := make([]int, n)
	for i := range idx {
		idx[i] = i
	}
	// 从大到小排序
	slices.SortFunc(idx, func(i, j int) int { return nums[j] - nums[i] })
	idx = idx[:k]
	slices.Sort(idx)
	for i, j := range idx {
		idx[i] = nums[j]
	}
	return idx
}
func hIndex(citations []int) int {
	n := len(citations)
	left, right := 0, citations[n-1]+1
	check := func(mid int) bool {
		cnt := 0
		// mid 当前引用次数
		for _, x := range citations {
			if x >= mid {
				cnt++
			}
		}
		return cnt >= mid
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

func maximumCandies(candies []int, K int64) int {
	k := int(K)
	sum := 0
	mx := math.MinInt
	for _, x := range candies {
		sum += x
		mx = max(mx, x)
	}
	// 如果每个孩子一个糖果都分不到的话
	if sum < k {
		return -1
	}
	left, right := -1, mx
	check := func(mid int) bool {
		// 每个小孩可以分到多少个糖果
		cnt := 0
		// mid 当前引用次数
		for _, x := range candies {
			cnt += x / mid
		}
		return cnt >= k
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
		if i == n-1 || ch != rune(s[i+1]) {
			groups[ch-'a'] = append(groups[ch-'a'], cnt)
			cnt = 0
		}
	}
	for _, a := range groups {
		if len(a) == 0 {
			continue
		}
		// 从大到小进行排序
		slices.SortFunc(a, func(x, y int) int { return y - x })
		// 哨兵节点
		a = append(a, 0, 0)
		ans = max(ans, a[0]-2, min(a[0]-1, a[1]), a[2])
	}
	if ans == 0 {
		return -1
	}
	return ans
}

func maxNumOfMarkedIndices222(nums []int) int {
	slices.Sort(nums)
	n := len(nums)
	left, right := 0, n/2+1
	check := func(mid int) bool {
		for i := range mid {
			if 2*nums[i] > nums[n-mid+i] {
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
		if nums[i]*2 < x {
			i++
		}
	}
	return i * 2
}

func furthestBuilding(heights []int, bricks int, ladders int) int {
	h := hp{}
	for i := 1; i < len(heights); i++ {
		diff := heights[i] - heights[i-1]
		if diff > 0 {
			heap.Push(&h, diff)
			bricks -= diff
			if bricks < 0 {
				if ladders > 0 {
					ladders--
					top := heap.Pop(&h).(int)
					bricks += top
				} else {
					return i - 1
				}
			}
		}
	}
	return len(heights) - 1
}

// 堆模板 Int 数组
type hp struct{ sort.IntSlice }

func (h *hp) Push(v interface{}) { h.IntSlice = append(h.IntSlice, v.(int)) }
func (h *hp) Pop() interface{} {
  a := h.IntSlice
  v := a[len(a)-1]
  h.IntSlice = a[:len(a)-1]
  return v
}