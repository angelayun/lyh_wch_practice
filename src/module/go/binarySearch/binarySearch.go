package binarysearch

import (
	"fmt"
	"hash/fnv"
	"math/bits"
	"slices"
	"sort"
)

// 返回第一个大于等于target的索引   模板
func lowerBound(nums []int, target int) int {
	left, right := -1, len(nums)
	for left+1 < right {
		mid := left + (right-left)>>1
		if nums[mid] >= target {
			right = mid
		} else {
			left = mid
		}
	}
	return right
}

// 返回第一个大于target的索引   模板
func upperBound(nums []byte, target byte) int {
	left, right := -1, len(nums)
	for left+1 < right {
		mid := left + (right-left)>>1
		if nums[mid] > target {
			right = mid
		} else {
			left = mid
		}
	}
	return right
}

// 34
func searchRange1(nums []int, target int) []int {
	n := len(nums)
	first := lowerBound(nums, target)
	if first == n || nums[first] != target {
		return []int{-1, -1}
	}
	second := lowerBound(nums, target+1) - 1
	return []int{first, second}
}
func searchRange2(nums []int, target int) []int {
	index := sort.SearchInts(nums, target)
	fmt.Println(index)
	// 我看用api写一下
	start, ok := slices.BinarySearch(nums, target)
	if !ok {
		return []int{-1, -1}
	}
	end := sort.SearchInts(nums, target+1) - 1
	return []int{start, end}
}
func searchRange(nums []int, target int) []int {
	start := sort.SearchInts(nums, target)
	if start == len(nums) || nums[start] != target {
		return []int{-1, -1}
	}
	end := sort.SearchInts(nums, target+1) - 1
	return []int{start, end}
}

// 35
func searchInsert(nums []int, target int) int {
	return lowerBound(nums, target)
}

// 704
func search1(nums []int, target int) int {
	left, right := -1, len(nums)
	for left+1 < right {
		mid := left + (right-left)>>1
		if nums[mid] == target {
			return mid
		} else if nums[mid] > target {
			right = mid
		} else {
			left = mid
		}
	}
	return -1
}
func search(nums []int, target int) int {
	index := lowerBound(nums, target)
	if index == len(nums) || nums[index] != target {
		return -1
	}
	return index
}

// 744
func nextGreatestLetter1(letters []byte, target byte) byte {
	left, right := -1, len(letters)
	for left+1 < right {
		mid := left + (right-left)>>1
		if letters[mid] > target {
			right = mid
		} else {
			left = mid
		}
	}
	if right < len(letters) {
		return letters[right]
	}
	return letters[0]
}

// 744
func nextGreatestLetter(letters []byte, target byte) byte {
	index := upperBound(letters, target)
	if index == len(letters) || letters[index] != target {
		return letters[0]
	}
	return letters[index]
}

// 2529
func maximumCount1(nums []int) int {
	// 找到0的左边界
	left := lowerBound(nums, 0)
	right := lowerBound(nums, 1) - 1
	// fmt.Println(left, right)
	cnt0 := right - left + 1
	negCnt := left
	posCnt := len(nums) - cnt0 - negCnt
	return max(negCnt, posCnt)
}
func maximumCount(nums []int) int {
	negCount := sort.SearchInts(nums, 0)
	posCount := len(nums) - sort.SearchInts(nums, 1)
	return max(posCount, negCount)
}

// 2300
func successfulPairs(spells []int, potions []int, success int64) []int {
	slices.Sort(potions)
	ans := make([]int, len(spells))
	for i, x := range spells {
		// y := int((success-1)/x) + 1
		y := (int(success)-1)/x + 1
		// index := lowerBound(potions, y)
		index := sort.SearchInts(potions, y)
		ans[i] = len(potions) - index
	}
	return ans
}

// 1385
func findTheDistanceValue(arr1 []int, arr2 []int, d int) (ans int) {
	slices.Sort(arr2)
	j := 0
	n := len(arr2)
	for _, v := range arr1 {
		for j < n && arr2[j] < v-d {
			j++
		}
		if j == n || arr2[j-1] > v+d {
			ans++
		}
	}
	return
}

// 2389
func answerQueries1(nums []int, queries []int) []int {
	slices.Sort(nums)
	n := len(nums)
	prefix := make([]int, n+1)
	for i, v := range nums {
		prefix[i+1] = prefix[i] + v
	}
	ans := make([]int, len(queries))
	for i, v := range queries {
		ans[i] = lowerBound(prefix, v) - 1
	}
	return ans
}

// 灵神的思路是直接在nums上做前缀和  然后使用api
func answerQueries(nums []int, queries []int) []int {
	sort.Ints(nums)
	for i := 1; i < len(nums); i++ {
		nums[i] += nums[i-1]
	}
	n := len(queries)
	ans := make([]int, n)
	for i, q := range queries {
		ans[i] = sort.SearchInts(nums, q+1)
	}
	return ans
}
func f_1170(s string) int {
	// 返回中 按字典序比较）最小字母的出现频次
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
		// 右边界
		ans[i] = wn - sort.SearchInts(newWord, v+1)
	}
	return ans
}

// 2563
// 0 1 4 4 5 7
// x是0 y最小得是3  最大是6
// x是1 y最小得是2  最大是5
// x是4 y最小得是-1 最大是2
func countFairPairs(nums []int, lower int, upper int) (ans int64) {
	slices.Sort(nums)
	for i, x := range nums {
		r := sort.SearchInts(nums[:i], upper-x+1)
		l := sort.SearchInts(nums[:i], lower-x)
		ans += int64(r - l)
	}
	return ans
}

// 2070
func maximumBeauty(items [][]int, queries []int) []int {
	// 按照x轴从左到右排序
	slices.SortFunc(items, func(a, b []int) int {
		return a[0] - b[0]
	})
	n := len(queries)
	ids := make([]int, n)
	for i := range ids {
		ids[i] = i
	}
	slices.SortFunc(ids, func(a, b int) int {
		return queries[a] - queries[b]
	})
	ans := make([]int, n)
	j, maxVal := 0, 0
	for _, i := range ids {
		q := queries[i]
		for j < len(items) && items[j][0] <= q {
			maxVal = max(maxVal, items[j][1])
			j++
		}
		ans[i] = maxVal
	}
	return ans
}
// 3453
func separateSquares(squares [][]int) float64 {
	// 总面积
	totArea := 0
	// 最大的y
	maxY := 0
	for _, sq := range squares {
		l := sq[2]
		totArea += l * l
		maxY = max(maxY, sq[1]+l)
	}

	check := func(y float64) bool {
		area := 0.
		for _, sq := range squares {
			yi := float64(sq[1])
			if yi < y {
				l := float64(sq[2])
				// 求的是正方形
				area += l * min(y-yi, l)
			}
		}
		return area >= float64(totArea)/2
	}
	// 左开右开区间
	left, right := 0., float64(maxY)
	for range bits.Len(uint(maxY * 1e5)) {
		mid := (left + right) / 2
		if check(mid) {
			// 还可以再向里面收缩  收缩到一个最小的
			right = mid
		} else {
			left = mid
		}
	}
	return (left + right) / 2 // 区间中点误差小
}
// 2226