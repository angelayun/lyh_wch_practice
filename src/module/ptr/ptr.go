package ptr

import (
	"math"
	"slices"
	"sort"
	"unicode"
)

// 344
func reverseString1(s []byte) {
	n := len(s)
	for left, right := 0, n-1; left < right; left, right = left+1, right-1 {
		s[left], s[right] = s[right], s[left]
	}
}
func reverseString2(s []byte) {
	n := len(s)
	for i := 0; i < n>>1; i++ {
		s[i], s[n-i-1] = s[n-i-1], s[i]
	}
}

func reverseString(s []byte) {
	slices.Reverse(s)
}

// 125
func isPalindrome(s string) bool {
	n := len(s)
	left, right := 0, n-1
	for left <= right {
		if !unicode.IsLetter(rune(s[left])) && !unicode.IsDigit(rune(s[left])) {
			left++
			continue
		} else if !unicode.IsLetter(rune(s[right])) && !unicode.IsDigit(rune(s[right])) {
			right--
			continue
		} else if unicode.ToUpper(rune(s[left])) == unicode.ToUpper(rune(s[right])) {
			left++
			right--
		} else {
			return false
		}
	}
	return true
}

// 1750
func minimumLength(s string) (ans int) {
	n := len(s)
	left, right := 0, n-1
	for left <= right && s[left] == s[right] {
		c := s[left]
		for left <= right && s[left] == c {
			left++
		}
		for left <= right && s[right] == c {
			right--
		}
	}
	return max(right-left+1, 0)
}

// 2105 TODO
func minimumRefill(plants []int, capacityA int, capacityB int) (ans int) {
	return
}

// 977
func sortedSquares1(nums []int) []int {
	n := len(nums)
	ans := make([]int, n)
	i := n - 1
	for left, right := 0, n-1; left <= right; {
		x := nums[left] * nums[left]
		y := nums[right] * nums[right]
		if y > x {
			ans[i] = y
			right--
		} else {
			ans[i] = x
			left++
		}
		i--
	}
	return ans
}

func sortedSquares(nums []int) []int {
	n := len(nums)
	ans := make([]int, n)
	i := n - 1
	for left, right := 0, n-1; left < right; {
		x := nums[left]
		y := nums[right]
		if -x > y {
			ans[i] = x
			left++
		} else {
			ans[i] = y
			right--
		}
		i--
	}
	return ans
}

// 658
func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
func findClosestElements1(arr []int, k int, x int) []int {
	sort.SliceStable(arr, func(i, j int) bool {
		return abs(arr[i]-x) < abs(arr[j]-x)
	})
	arr = arr[:k]
	sort.Ints(arr)
	return arr
}
func findClosestElements(arr []int, k int, x int) []int {
	right := sort.SearchInts(arr, x)
	left := right - 1
	for ; k > 0; k-- {
		if left < 0 {
			right++
		} else if right >= len(arr) || abs(arr[left]-x) < abs(arr[right]-x) {
			left--
		} else {
			right++
		}
	}
	return arr[left : right+1]
}

// 1471
func getStrongest(arr []int, k int) []int {
	sort.Ints(arr)
	n := len(arr)
	mid := arr[(n-1)>>1]
	sort.SliceStable(arr, func(i, j int) bool {
		return abs(arr[i]-mid) >= abs(arr[j]-mid)
	})
	arr = arr[:k]
	return arr
}

// 167
func twoSum(numbers []int, target int) []int {
	n := len(numbers)
	left, right := 0, n-1
	for {
		sum := numbers[left] + numbers[right]
		if sum < target {
			left++
		} else if sum > target {
			right--
		} else {
			return []int{left + 1, right + 1}
		}
	}
}

// 633
func judgeSquareSum(c int) bool {
	left, right := 0, int(math.Sqrt(float64(c)))
	for left <= right {
		target := left*left + right*right
		if target == c {
			return true
		}
		if target > c {
			right--
		} else {
			left++
		}
	}
	return false
}

// 2824
func countPairs(nums []int, target int) (ans int) {
	sort.Ints(nums)
	left, right := 0, len(nums)-1
	for left < right {
		sum := nums[left] + nums[right]
		if sum < target {
			// 用示例1  -1,1,1,2,3 如果-1和2是能满足条件的 那么-1和2左边的1是不是都能满足条件
			ans += right - left
			left++
		} else {
			right--
		}
	}
	return
}

// LCP28
func purchasePlans(nums []int, target int) (ans int) {
	const MOD = 1e9 + 7
	sort.Ints(nums)
	left, right := 0, len(nums)-1
	for left <= right {
		sum := nums[left] + nums[right]
		if sum < target {
			ans = (ans + right - left) % MOD
			left++
		} else {
			right--
		}
	}
	return
}

// 15
func threeSum(nums []int) [][]int {
	sort.Ints(nums)
	n := len(nums)
	ans := [][]int{}
	for i := 0; i < n-2; i++ {
		v := nums[i]
		// 去重
		if i > 0 && nums[i-1] == v {
			continue
		}
		// 当前数是最小的数  与最小的俩数相加  都比0大  后面循环没意义了
		if v+nums[i+1]+nums[i+2] > 0 {
			break
		}
		// 当前数与最大的俩数都<0 当前这次循环没意义  只能看v的下一个数了
		if v+nums[n-1]+nums[n-2] < 0 {
			continue
		}
		left, right := i+1, n-1
		for left < right {
			sum := v + nums[left] + nums[right]
			if sum == 0 {
				ans = append(ans, []int{v, nums[left], nums[right]})
				left++
				for left < right && nums[left-1] == nums[left] {
					left++
				}
				right--
				for left < right && nums[right+1] == nums[right] {
					right--
				}
			} else if sum < 0 {
				left++
			} else {
				right--
			}
		}
	}
	return ans
}

// 16
func threeSumClosest(nums []int, target int) (ans int) {
	sort.Ints(nums)
	n := len(nums)
	// 初始化 ans 为前三个数的和
	ans = nums[0] + nums[1] + nums[2]
	minDiff := math.Abs(float64(ans - target))
	for i := 0; i < n-2; i++ {
		v := nums[i]
		// 去重
		if i > 0 && nums[i-1] == v {
			continue
		}
		// 当前数是最小的数  与最小的俩数相加  都比0大  后面循环没意义了
		if v+nums[i+1]+nums[i+2] > target {
			sum := v + nums[i+1] + nums[i+2]
			if float64(sum-target) < minDiff {
				ans = sum
			}
			break
		}
		// 当前数与最大的俩数都<0 当前这次循环没意义  只能看v的下一个数了
		if v+nums[n-1]+nums[n-2] < target {
			sum := v + nums[n-1] + nums[n-2]
			if float64(target-sum) < minDiff {
				minDiff = float64(target - sum)
				ans = sum
			}
			continue
		}
		left, right := i+1, n-1
		for left < right {
			sum := v + nums[left] + nums[right]
			if sum == target {
				return target
			} else if sum < target {
				if float64(target-sum) < minDiff {
					minDiff = float64(target - sum)
					ans = sum
				}
				left++
			} else {
				if float64(sum-target) < minDiff {
					minDiff = float64(sum - target)
					ans = sum
				}
				right--
			}
		}
	}
	return ans
}
