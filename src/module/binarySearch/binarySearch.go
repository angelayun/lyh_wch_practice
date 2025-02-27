package binarysearch

import (
	"fmt"
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
func answerQueries(nums []int, queries []int) []int {
	slices.Sort(nums)
	n:=len(nums)
	prefix:=make([]int,n+1)
	for _,v:=nums{
		prefix[i+1]=prefix[i]+v
	}
	ans :=make([]int,len(queries))
	for i,v:=range queries{
		ans[i]= lowerBound(prefix,v)-1
	}
	return ans
}
