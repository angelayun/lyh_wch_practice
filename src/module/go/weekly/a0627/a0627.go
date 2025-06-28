package a0627

import (
	"fmt"
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
func maxSubsequence(nums []int, k int) []int {
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
