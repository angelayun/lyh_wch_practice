package ptr

import (
	"fmt"
	"math"
	"math/bits"
	"slices"
	"sort"
	"strconv"
	"strings"
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

// 18
func fourSum(nums []int, target int) [][]int {
	slices.Sort(nums)
	n := len(nums)
	ans := [][]int{}
	for i := 0; i < n-3; i++ {
		x := nums[i]
		// 去重
		if i > 0 && nums[i-1] == x {
			continue
		}
		// 当前数是最小的数  与最小的俩数相加  都比0大  后面循环没意义了
		if x+nums[i+1]+nums[i+2]+nums[i+3] > target {
			break
		}
		// 当前数与最大的俩数都<0 当前这次循环没意义  只能看v的下一个数了
		if x+nums[n-1]+nums[n-2]+nums[n-3] < target {
			continue
		}
		for j := i + 1; j < n-2; j++ {
			y := nums[j]
			// 去重
			if j > i+1 && nums[j-1] == y {
				continue
			}
			// 当前数是最小的数  与最小的俩数相加  都比0大  后面循环没意义了
			if x+y+nums[j+1]+nums[j+2] > target {
				break
			}
			// 当前数与最大的俩数都<0 当前这次循环没意义  只能看v的下一个数了
			if x+y+nums[n-1]+nums[n-2] < target {
				continue
			}
			left, right := j+1, n-1
			for left < right {
				sum := x + y + nums[left] + nums[right]
				if sum == target {
					ans = append(ans, []int{x, y, nums[left], nums[right]})
					left++
					for left < right && nums[left-1] == nums[left] {
						left++
					}
					right--
					for left < right && nums[right+1] == nums[right] {
						right--
					}
				} else if sum < target {
					left++
				} else {
					right--
				}
			}
		}
	}
	return ans
}

// 611
func triangleNumber1(nums []int) (ans int) {
	slices.Sort(nums)
	n := len(nums)
	for k := 2; k < n; k++ {
		i, j := 0, k-1
		for i < j {
			if nums[i]+nums[j] > nums[k] {
				ans += j - i
				j--
			} else {
				i++
			}
		}
	}
	return ans
}
func triangleNumber(nums []int) (ans int) {
	slices.Sort(nums)
	n := len(nums)
	for k := n - 1; k >= 2; k-- {
		if nums[0]+nums[1] > nums[k] {
			ans += (k + 1) * k * (k - 1) / 6
			break
		}
		if nums[k-1]+nums[k-2] < nums[k] {
			continue
		}
		i, j := 0, k-1
		for i < j {
			if nums[i]+nums[j] > nums[k] {
				ans += j - i
				j--
			} else {
				i++
			}
		}
	}
	return ans
}

// 2824
func countPairs_2824(nums []int, target int) (ans int) {
	slices.Sort(nums)
	n := len(nums)
	for left, right := 0, n-1; left < right; {
		sum := nums[left] + nums[right]
		if sum < target {
			ans += right - left
			left++
		} else {
			right--
		}
	}
	return
}

// 1577 TODO
// 923
func threeSumMulti(arr []int, target int) (ans int) {
	const MOD = 1e9 + 7
	slices.Sort(arr)
	n := len(arr)
	for i := 0; i < n; i++ {
		T := target - arr[i]
		j := i + 1
		k := n - 1
		for j < k {
			sum := arr[j] + arr[k]
			if sum < T {
				j++
			} else if sum > T {
				k--
			} else if arr[j] != arr[k] {
				left := 1
				right := 1
				for j < k && arr[j+1] == arr[j] {
					j++
					left++
				}
				for j < k && arr[k-1] == arr[k] {
					right++
					k--
				}
				ans = (ans + (left * right)) % MOD
				j++
				k--
			} else {
				m := k - j + 1
				ans = (ans + m*(m-1)/2) % MOD
				break
			}
		}
	}
	return ans
}

// 948
func bagOfTokensScore(tokens []int, power int) (ans int) {
	slices.Sort(tokens)
	n := len(tokens)
	left, right := 0, n-1
	for left <= right {
		if tokens[left] <= power {
			power -= tokens[left]
			left++
			ans++
		} else if ans > 0 && left < right {
			power += tokens[right]
			right--
			ans--
		} else {
			right--
		}
		fmt.Println(left, right, power, ans)
	}
	return
}

// 11
func maxArea(height []int) (ans int) {
	n := len(height)
	left, right := 0, n-1
	for left < right {
		if height[left] < height[right] {
			ans = max(ans, (right-left)*height[left])
			left++
		} else {
			ans = max(ans, (right-left)*height[right])
			right--
		}
	}
	return
}

// 42
func trap(height []int) (ans int) {
	n := len(height)
	left, right := 0, n-1
	preMax, sufMax := 0, 0
	for left < right {
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

// 1616
/*
题目说明了两个字符串长度是相同的，先努力的去匹配a的前缀和b的后缀，
然后就是看中间未匹配的部分不管是a还是b 只要中间未配置的部分是回文串就满足题意
（同理  去匹配b的前缀和a的后缀）
*/
func isPalindrome_1616(s string, i int, j int) bool {
	for i < j && s[i] == s[j] {
		i++
		j--
	}
	return i >= j
}
func check_1616(a, b string) bool {
	i, j := 0, len(a)
	for i < j && b[i] == a[j] {
		i++
		j--
	}
	return isPalindrome_1616(a, i, j) || isPalindrome_1616(b, i, j)
}
func checkPalindromeFormation(a string, b string) bool {
	return check_1616(a, b) || check_1616(b, a)
}

// 27
func removeElement1(nums []int, val int) (ans int) {
	n := len(nums)
	fast, slow := 0, 0
	for fast < n {
		if nums[fast] != val {
			nums[slow] = nums[fast]
			slow++
			fast++
			ans++
		} else {
			fast++
		}
	}
	return
}

// 下面是灵神的写法 确实简洁
func removeElement(nums []int, val int) int {
	k := 0
	for _, x := range nums {
		if x != val {
			nums[k] = x
			k++
		}
	}
	return k
}

// 26
func removeDuplicates_26(nums []int) int {
	n := len(nums)
	k := 0
	for i := 1; i < n; i++ {
		if nums[k] != nums[i] {
			k++
			nums[k] = nums[i]
		}
	}
	return k
}

// 80
func removeDuplicates(nums []int) int {
	n := len(nums)
	k := 2
	for i := 2; i < n; i++ {
		if nums[k-2] != nums[i] {
			nums[k] = nums[i]
			k++
		}
	}
	return min(k, n)
}

// 283
func moveZeroes_1(nums []int) {
	n := len(nums)
	k := 0
	for _, v := range nums {
		if v != 0 {
			nums[k] = v
			k++
		}
	}
	for k < n {
		nums[k] = 0
		k++
	}
}
func moveZeroes(nums []int) {
	// k是指的当前不为0的位置
	k := 0
	for i, v := range nums {
		if v != 0 {
			nums[i], nums[k] = nums[k], nums[i]
			k++
		}
	}
}

// 905
func sortArrayByParity(nums []int) []int {
	// k是指的当前偶数元素的位置
	k := 0
	for i, v := range nums {
		if v&1 == 0 {
			nums[k], nums[i] = nums[i], nums[k]
			k++
		}
	}
	return nums
}

// 922
func sortArrayByParityII(nums []int) []int {
	// p0存放的是偶数元素的位置
	i, j := 0, 1
	for i < len(nums) {
		if nums[i]%2 == 0 {
			i += 2
		} else if nums[j]%2 == 1 {
			j += 2
		} else {
			nums[i], nums[j] = nums[j], nums[i]
			i += 2
			j += 2
		}
	}
	return nums
}

// 2460
func applyOperations1(nums []int) []int {
	n := len(nums)
	for i := 0; i < n-1; i++ {
		if nums[i] == nums[i+1] {
			nums[i] *= 2
			nums[i+1] = 0
		}
	}
	k := 0
	for i, v := range nums {
		if v != 0 {
			nums[k], nums[i] = nums[i], nums[k]
			k++
		}
	}
	return nums
}

// 把上面两遍的循环变成一遍
func applyOperations(nums []int) []int {
	n := len(nums)
	k := 0
	for i := 0; i < n; i++ {
		if i < n-1 && nums[i] == nums[i+1] {
			nums[i] *= 2
			nums[i+1] = 0
		}
		if nums[i] != 0 {
			nums[k], nums[i] = nums[i], nums[k]
			k++
		}
	}
	return nums
}

// 1089
func duplicateZeros_d(arr []int) {
	// 这个不对 没有考虑数组最后一位如果是0的情况  这个0是否需要复制
	n := len(arr)
	// 先统计整个有多少个0
	cnt0 := 0
	for _, v := range arr {
		if v == 0 {
			cnt0++
		}
	}
	for i := n - 1; i > n-cnt0; i-- {
		if arr[i] == 0 {
			cnt0--
		}
	}
	fmt.Println(cnt0)
	j := n - 1
	// 要移除cnt0个0
	for i := n - cnt0 - 1; i >= 0; i-- {
		if arr[i] == 0 {
			arr[j] = arr[i]
			j--
		}
		if j >= 0 {
			arr[j] = arr[i]
			j--
		}
	}
}

// 2540
func getCommon(nums1 []int, nums2 []int) int {
	n := len(nums1)
	m := len(nums2)
	i, j := 0, 0
	for i < n && j < m {
		if nums1[i] < nums2[j] {
			i++
		} else if nums2[j] < nums1[i] {
			j++
		} else {
			break
		}
	}
	return nums1[i]
}

// 88
func merge(nums1 []int, m int, nums2 []int, n int) {
	n--
	m--
	i, j := n, m
	k := i + j - 1
	for i >= 0 || j >= 0 {
		if i < 0 {
			nums1[k] = nums2[j]
			j--
		} else if j < 0 {
			nums1[k] = nums1[i]
			i--
		} else if nums1[i] > nums2[j] {
			nums1[k] = nums1[i]
			i--
		} else {
			nums1[k] = nums2[j]
			j--
		}
	}
}

// 2570
func mergeArrays(nums1 [][]int, nums2 [][]int) [][]int {
	ans := [][]int{}
	i, j := 0, 0
	n, m := len(nums1), len(nums2)
	for i < n || j < m {
		if j >= m {
			return append(ans, nums1[i:]...)
		} else if i >= n {
			return append(ans, nums2[j:]...)
		} else if nums1[i][0] < nums2[j][0] {
			ans = append(ans, nums1[i])
			i++
		} else if nums2[j][0] < nums1[i][0] {
			ans = append(ans, nums2[j])
			j++
		} else {
			nums1[i][1] += nums2[j][1]
			ans = append(ans, nums1[i])
			i++
			j++
		}
	}
	return ans
}

// LCP 18
func breakfastNumber(staple []int, drinks []int, cost int) (ans int) {
	slices.Sort(staple)
	slices.Sort(drinks)
	const MOD = 1e9 + 7
	// n:=len(staple)
	m := len(drinks)
	j := m - 1
	for _, x := range staple {
		for j >= 0 {
			if x+drinks[j] < cost {
				ans = (ans + j + 1) % MOD
				break
			} else {
				j--
			}
		}
	}
	return ans
}

// 1855
func maxDistanceD(nums1 []int, nums2 []int) (ans int) {
	// 这个再怎么剪枝都会超时
	n, m := len(nums1), len(nums2)
	for i := 0; i < n; i++ {
		if i > 0 && nums1[i-1] == nums1[i] {
			continue
		}
		for j := m - 1; j >= i; j-- {
			if nums1[i] <= nums2[j] {
				ans = max(ans, j-i)
				break
			}
		}
	}
	return
}
func maxDistanceDA(nums1 []int, nums2 []int) int {
	// 这个还是有个用例过不了 不清楚逻辑错误点在哪儿
	ans := math.MinInt
	n, m := len(nums1), len(nums2)
	i, j := 0, m-1
	for i < n-1 && nums1[i] > nums2[j] {
		i++
	}
	fmt.Println(i, j)
	if nums1[i] <= nums2[j] {
		ans = max(ans, j-i)
	}
	i, j = 0, m-1
	for j > 0 && nums1[i] > nums2[j] {
		j--
	}
	if nums1[i] <= nums2[j] {
		ans = max(ans, j-i)
	}
	if ans == math.MinInt {
		return 0
	}
	return ans
}
func maxDistance(nums1 []int, nums2 []int) (ans int) {
	n, m := len(nums1), len(nums2)
	i, j := 0, 0
	for i < n && j < m {
		// 放心大胆的往右移
		for j+1 < m && nums2[j+1] >= nums1[i] {
			j++
			// 这个时候j指向的那个元素是最靠右的并且还大于等于nums[i]
		}
		ans = max(ans, j-i)
		i++
	}
	return
}

// 1385
func findTheDistanceValueD(arr1 []int, arr2 []int, d int) (ans int) {
	// 这个终于过了  但也写的稀巴烂呀
	slices.Sort(arr1)
	slices.Sort(arr2)
	// fmt.Println(arr1)
	// fmt.Println(arr2)

	for i, v := range arr1 {
		// right := sort.SearchInts(arr2, v)
		right := sort.Search(len(arr2), func(i int) bool {
			return arr2[i] >= v
		})
		left := right - 1
		fmt.Println(i, v, left, right)
		if right == len(arr2) {
			if arr1[i]-arr2[left] > d {
				ans++
			}
		} else if left == -1 {
			if arr2[right]-arr1[i] > d {
				ans++
			}
		} else if arr1[i]-arr2[left] > d && arr2[right]-arr1[i] > d {
			ans++
		}
	}
	return
}
func findTheDistanceValue(arr1 []int, arr2 []int, d int) (ans int) {
	slices.Sort(arr1)
	slices.Sort(arr2)
	j := 0
	for _, v := range arr1 {
		for j < len(arr2) && arr2[j] < v-d {
			j++
		}
		if j >= len(arr2) || arr2[j] > v+d {
			ans++
		}
	}
	return
}

// 925
func isLongPressedName(name string, typed string) bool {
	i, j := 0, 0
	n, m := len(name), len(typed)
	for i < n {
		if name[i] == typed[j] {
			i++
			j++
		} else if j < m && typed[j] == typed[j-1] {
			j++
		} else {
			return false
		}
	}
	return true
}
func check_809D(s string, word string) bool {
	n := len(s)
	i, j := 0, 0
	for i < n {
		if j < len(word) && s[i] == word[j] {
			i++
			j++
		} else if i > 0 && i < n-1 && s[i-1] == s[i] && s[i+1] == s[i] {
			for i < n && s[i-1] == s[i] {
				i++
			}
		} else {
			return false
		}
	}
	return i == n
}

// 809
func expressiveWordsD(s string, words []string) (ans int) {
	// 我这个确实也通不过  哎
	for _, v := range words {
		if len(s) < len(v) {
			continue
		}
		if check_809(s, v) {
			fmt.Println(s, v)
			ans++
		}
	}
	return ans
}
func check_809(s string, word string) bool {
	n, m := len(s), len(word)
	i, j := 0, 0
	for i < n && j < m {
		if s[i] != word[j] {
			return false
		}
		// 相等的情况下统计各出现了多少个
		chI := 0
		ch := s[i]
		for i < n && s[i] == ch {
			chI++
			i++
		}
		chJ := 0
		for j < m && word[j] == ch {
			chJ++
			j++
		}
		if chI < chJ || chI > chJ && chI < 3 {
			return false
		}
	}
	return i == n && j == m
}
func expressiveWords(s string, words []string) (ans int) {
	for _, v := range words {
		if check_809(s, v) {
			ans++
		}
	}
	return
}

// 2337
func canChange(start string, target string) bool {
	if strings.ReplaceAll(start, "_", "") != strings.ReplaceAll(target, "_", "") {
		return false
	}
	j := 0
	for i, c := range start {
		if c == '_' {
			continue
		}
		// 这个时候c是非_的字符
		for target[j] == '_' {
			j++
		}
		if c == 'L' {
			if i < j {
				return false
			}
		} else if i > j {
			return false
		}
		// i和j是在同步向前走的
		j++
	}
	return true
}

// 777
func canTransform(start string, result string) bool {
	if strings.ReplaceAll(start, "X", "") != strings.ReplaceAll(result, "X", "") {
		return false
	}
	j := 0
	for i, c := range start {
		if c == 'X' {
			continue
		}
		// 这个时候c是非_的字符
		for result[j] == 'X' {
			j++
		}
		if c == 'L' {
			if i < j {
				return false
			}
		} else if i > j {
			return false
		}
		// i和j是在同步向前走的
		j++
	}
	return true
}
func handle_844(s string) string {
	res := []byte{}
	for _, c := range s {
		if c == '#' {
			if len(res) > 0 {
				res = res[:len(res)-1]
			}
		} else {
			res = append(res, byte(c))
		}
	}
	return string(res)
}

// 844
func backspaceCompare1(s string, t string) bool {
	// 这种写法是O(n)空间复杂度
	return handle_844(s) == handle_844(t)
}

func handle_844_1(s string) string {
	str := []rune(s)
	i, j := 0, 0
	for j < len(str) {
		if str[j] == '#' {
			if i > 0 {
				i--
			}
		} else {
			str[i] = str[j]
			i++
			j++
		}
	}
	return string(str[0:i])
}

// 844
func backspaceCompare(s string, t string) bool {
	// 这种写法是O(n)空间复杂度
	return handle_844_1(s) == handle_844_1(t)
}

// 986
func intervalIntersection_old(firstList [][]int, secondList [][]int) [][]int {
	// 这个能过
	ans := [][]int{}
	n, m := len(firstList), len(secondList)
	i, j := 0, 0
	for i < n && j < m {
		// 判断两个区间是否有交集
		if secondList[j][0] <= firstList[i][1] && firstList[i][0] <= secondList[j][1] {
			a := max(firstList[i][0], secondList[j][0])
			b := min(firstList[i][1], secondList[j][1])
			// 有交集，将交集区间添加到结果中
			ans = append(ans, []int{a, b})
		}
		// 移动指针
		if firstList[i][1] < secondList[j][1] {
			i++
		} else {
			j++
		}
	}
	return ans
}
func intervalIntersection(firstList [][]int, secondList [][]int) [][]int {
	ans := [][]int{}
	n, m := len(firstList), len(secondList)
	i, j := 0, 0
	for i < n && j < m {
		// 这个是看了官解里面怎么判断交集的
		// 判断两个区间是否有交集
		a := max(firstList[i][0], secondList[j][0])
		b := min(firstList[i][1], secondList[j][1])
		if a <= b {
			// 有交集，将交集区间添加到结果中
			ans = append(ans, []int{a, b})
		}
		// 移动指针
		if firstList[i][1] < secondList[j][1] {
			i++
		} else {
			j++
		}
	}
	return ans
}

// 16.06
func smallestDifference(a []int, b []int) (ans int) {
	slices.Sort(a)
	slices.Sort(b)
	m := len(b)
	j := 0
	ans = math.MaxInt
	for _, v := range a {
		// 移动 j 指针，找到第一个不小于 v 的元素
		for j < m && b[j] < v {
			j++
		}
		// 考虑 j 指针在有效范围内的情况
		if j < m {
			ans = min(ans, b[j]-v)
		}
		// 考虑 j 指针前一个元素的情况
		if j > 0 {
			ans = min(ans, v-b[j-1])
		}
	}
	return ans
}

// 392
func isSubsequence(s string, t string) bool {
	n, m := len(s), len(t)
	i, j := 0, 0
	for i < n && j < m {
		if s[i] == t[j] {
			i++
			j++
		} else {
			j++
		}
	}
	return i == n
}

// 524
func findLongestWord(s string, dictionary []string) (ans string) {
	for _, t := range dictionary {
		if isSubsequence(s, t) {
			if len(t) > len(ans) || (len(t) == len(ans) && t < ans) {
				ans = t
			}
		}
	}
	return ans
}

// 2486
func appendCharacters(s string, t string) int {
	n, m := len(s), len(t)
	i, j := 0, 0
	for i < n && j < m {
		if s[i] == t[j] {
			i++
			j++
		} else {
			i++
		}
	}
	return m - j
}

// 2825
func canMakeSubsequence(str1 string, str2 string) bool {
	n, m := len(str1), len(str2)
	if n < m {
		return false
	}

	j := 0
	for _, c := range str1 {
		c2 := c + 1
		if c == 'z' {
			c2 = 'a'
		}
		if c == rune(str2[j]) || c2 == rune(str2[j]) {
			j++
			if j == m {
				return true
			}

		}
	}
	return false
}
func check_1023(str string, patten string) bool {
	n, m := len(str), len(patten)
	i, j := 0, 0
	for i < n && j < m {
		if str[i] == patten[j] {
			i++
			j++
		} else if str[i] > 'A' && str[i] < 'Z' {
			return false
		} else {
			i++
		}
	}
	if j < m {
		return false
	} else {
		if i < n {
			for i < n {
				if str[i] > 'A' && str[i] < 'Z' {
					return false
				}
				i++
			}
			return true
		}
	}
	return true
}

// 1023
func camelMatch1(queries []string, pattern string) []bool {
	ans := []bool{}
	for _, str := range queries {
		flag := check_1023(str, pattern)
		ans = append(ans, flag)
	}
	return ans
}
func camelMatch(queries []string, pattern string) []bool {
	ans := make([]bool, len(queries))
	for i, str := range queries {
		ans[i] = true
		p := 0
		for _, c := range str {
			if p < len(pattern) && c == rune(pattern[p]) {
				p++
			} else if unicode.IsUpper(c) {
				ans[i] = false
				break
			}
		}
		if p < len(pattern) {
			ans[i] = false
		}
	}
	return ans
}

// 3132
func minimumAddedInteger(nums1 []int, nums2 []int) int {
	slices.Sort(nums1)
	slices.Sort(nums2)
	for i := 2; i >= 0; i-- {
		diff := nums2[0] - nums1[2]
		// 然后就是使用392 判断子序列
		j := 0
		for _, v := range nums1[i:] {
			if v == nums2[j] {
				j++
				if j == len(nums2) {
					return diff
				}
			}
		}
	}
	return nums2[0] - nums1[0]
}
func isSubseq(s, t string) bool {
	// t是长的 s是短的
	j := 0
	for _, c := range t {
		if j < len(s) && s[j] == (byte(c)) {
			j++
			if j == len(s) {
				return true
			}
		}
	}
	return false
}

// 522
func findLUSlength(strs []string) int {
	ans := -1
next:
	for i, s := range strs {
		if len(s) < ans {
			continue
		}
		for j, t := range strs {
			if j != i && isSubseq(s, t) {
				// 是子序列的不是答案
				continue next
			}
		}
		ans = len(strs[i])
	}
	return ans
}

// 1446
func maxPower(s string) (ans int) {
	cnt := 0
	for i, c := range s {
		cnt++
		if i > 0 && s[i-1] != byte(c) {
			cnt = 1
		}
		ans = max(ans, cnt)
	}
	return ans
}

// 1869
func checkZeroOnes(s string) bool {
	cnt0, cnt1 := 0, 0
	cnt := 0
	for i, c := range s {
		if i > 0 && s[i-1] != byte(c) {
			cnt = 0
		}
		cnt++
		if c == '0' {
			cnt0 = max(cnt0, cnt)
		} else {
			cnt1 = max(cnt1, cnt)
		}
	}
	// fmt.Println(cnt0,cnt1)
	return cnt1 > cnt0
}

// 2414
func longestContinuousSubstring1(s string) (ans int) {
	cnt := 0
	for i, c := range s {
		if i > 0 && byte(c)-1 != s[i-1] {
			cnt = 0
		}
		cnt++
		ans = max(ans, cnt)
	}
	return
}
func longestContinuousSubstring(s string) (ans int) {
	cnt := 1
	ans = 1
	for i := 1; i < len(s); i++ {
		if s[i] != s[i-1]+1 {
			cnt = 1
		} else {
			cnt++
			ans = max(ans, cnt)
		}
	}
	return
}

// 1957
func makeFancyString(s string) string {
	ans := []byte{}
	n := len(s)
	for i, c := range s {
		if i+2 < n && s[i+1] == s[i] && s[i+2] == s[i] {
			continue
		}
		ans = append(ans, byte(c))
	}
	return string(ans)
}

// 674
func findLengthOfLCIS(nums []int) (ans int) {
	cnt := 0
	for i, v := range nums {
		cnt++
		if i > 0 && v <= nums[i-1] {
			cnt = 1
		}
		ans = max(ans, cnt)
	}
	return
}

// 978
func maxTurbulenceSize(arr []int) (ans int) {
	ans = 1
	n := len(arr)
	up := make([]int, n+1)
	down := make([]int, n+1)
	up[0] = 1
	down[0] = 1
	for i := 1; i < n; i++ {
		if arr[i] > arr[i-1] {
			up[i] = down[i-1] + 1
			down[i] = 1
		} else if arr[i] < arr[i-1] {
			down[i] = up[i-1] + 1
			up[i] = 1
		} else {
			down[i] = 1
			up[i] = 1
		}
		ans = max(ans, down[i], up[i])
	}
	return
}

// 2110
func getDescentPeriods(prices []int) (ans int64) {
	cnt := 0
	for i, v := range prices {
		if i > 0 && prices[i-1] != v+1 {
			cnt = 0
		}
		cnt++
		ans += int64(cnt)
	}
	return
}

// 228
func summaryRanges(nums []int) []string {
	cnt := 0
	ans := []string{}
	n := len(nums)
	for i, v := range nums {
		cnt++
		if i == n-1 || (v != nums[i+1]-1) {
			if cnt == 1 {
				ans = append(ans, strconv.Itoa(nums[i]))
			} else {
				ans = append(ans, strconv.Itoa(nums[i-cnt+1])+"->"+strconv.Itoa(nums[i]))
			}
			cnt = 0
		}

	}
	return ans
}

// LCP 68
func beautifulBouquet(flowers []int, cnt int) (ans int) {
	const MOD = 1e9 + 7
	mp := map[int]int{}
	n := len(flowers)
	for left, right := 0, 0; right < n; right++ {
		mp[flowers[right]]++
		for mp[flowers[right]] > cnt {
			mp[flowers[left]]--
			left++
		}
		ans = (ans + right - left + 1) % MOD
	}
	return
}

// 2760
func longestAlternatingSubarray(nums []int, threshold int) (ans int) {
	n := len(nums)
	// 子数组满足偶数值开始
	// 子数组中的每一个值都<=threshold 并且是奇偶 偶奇切换
	i := 0
	for i < n {
		if nums[i]%2 != 0 || nums[i] > threshold {
			// 找合法的起点
			i++
			continue
		}
		start := i
		i++
		for i < n && nums[i-1]%2 != nums[i]%2 && nums[i] <= threshold {
			i++
		}
		ans = max(ans, i-start)
	}
	return
}

// 1887
func reductionOperations(nums []int) (ans int) {
	// 相当于求每个数在数组中的第几小的，排序后遍历一遍即可
	slices.Sort(nums)
	k := 0
	i := 0
	n := len(nums)
	for i < n {
		start := i
		i++
		for i < n && nums[i-1] == nums[i] {
			i++
		}
		ans += (i - start) * k
		k++
	}
	return
}

// 845
func longestMountain(arr []int) (ans int) {
	n := len(arr)
	i := 0
	for i < n-2 {
		for i+1 < n && arr[i+1] <= arr[i] {
			i++
			continue
		}
		start := i
		// 这个是上升段
		for i+1 < n && arr[i+1] > arr[i] {
			i++
		}
		// 这个是顶峰
		peek := i
		for i+1 < n && arr[i+1] < arr[i] {
			i++
		}
		if i > peek {
			ans = max(ans, i-start+1)
		}
	}
	return ans
}

// 2038
func winnerOfGame(colors string) bool {
	n := len(colors)
	cnt := 0
	ans := 0
	for i := 1; i < n-1; i++ {
		if colors[i] == colors[i-1] && colors[i] == colors[i+1] {
			cnt++
			if colors[i] == 'A' {
				ans += cnt
			} else {
				ans -= cnt
			}
		} else {
			cnt = 0
		}
	}
	return ans > 0
}

// 1759
func calcSize(n int) int {
	const MOD = 1e9 + 7
	return (1 + n) * n / 2 % (MOD)
}
func countHomogenous(s string) (ans int) {
	n := len(s)
	const MOD = 1e9 + 7
	i := 0
	for i < n {
		start := i
		for i+1 < n && s[i+1] == s[i] {
			i++
		}
		groupSize := i - start
		ans += calcSize(groupSize)

	}
	return ans % MOD
}

// 3011
func canSortArray(nums []int) bool {
	n := len(nums)
	for i := 0; i < n; {
		start := i
		i++
		for i < n && bits.OnesCount(uint(nums[i-1])) == bits.OnesCount(uint(nums[i])) {
			i++
		}
		slices.Sort(nums[start:i])
	}
	return slices.IsSorted(nums)
}

// 1578
func minCost(colors string, neededTime []int) (ans int) {
	n := len(colors)
	i := 0
	for i < n {
		sum := 0
		maxVal := 0
		ch := colors[i]
		for i < n && colors[i] == ch {
			sum += neededTime[i]
			maxVal = max(neededTime[i], maxVal)
			i++
		}
		// [start,i) 这一段需要移除只剩下一个
		ans += sum - maxVal
	}
	return ans
}

// 1839 要温习  挺有难度的  现在还是很理解  这个是灵神的题解
func longestBeautifulSubstring(s string) (ans int) {
	const vowel = "aeiou"
	cur, sum := 0, 0
	for i, n := 0, len(s); i < n; {
		start := i
		ch := s[start]
		for i < n && s[i] == ch {
			i++
		}

		if ch != vowel[cur] {
			cur, sum = 0, 0
			if ch != vowel[0] {
				continue
			}
		}

		sum += i - start
		cur++
		if cur == 5 {
			if sum > ans {
				ans = sum
			}
			cur, sum = 0, 0
		}
	}
	return
}

// 2765  自己想不到这么优雅的写法
func alternatingSubarray(nums []int) (ans int) {
	ans = -1
	n := len(nums)
	i := 0
	for i < n-1 {
		if nums[i+1] != nums[i]+1 {
			i++
			continue
		}
		start := i
		i += 2
		for i < n && nums[i] == nums[i-2] {
			i++
		}
		ans = max(ans, i-start)
		i--
	}
	return ans
}

// 3255
func resultsArray(nums []int, k int) []int {
	n := len(nums)
	ans := make([]int, n-k+1)
	for i := range ans {
		ans[i] = -1
	}
	cnt := 0
	for i, v := range nums {
		if i == 0 || nums[i-1]+1 == v {
			cnt++
		} else {
			cnt = 1
		}
		if cnt >= k {
			ans[i-k+1] = v
		}
	}
	return ans
}

// 3350
func maxIncreasingSubarrays(nums []int) (ans int) {
	preCnt, cnt := 0, 0
	for i, v := range nums {
		cnt++
		if i == len(nums)-1 || v >= nums[i+1] {
			// i是严格递增段的末尾
			ans = max(ans, cnt/2, min(preCnt, cnt))
			preCnt = cnt
			cnt = 0
		}
	}
	return ans
}

// 3349
func hasIncreasingSubarrays(nums []int, k int) bool {
	preCnt, cnt := 0, 0
	for i, v := range nums {
		cnt++
		if i == len(nums)-1 || v >= nums[i+1] {
			// i是严格递增段的末尾
			if max(cnt/2, min(preCnt, cnt)) >= k {
				return true
			}
			preCnt = cnt
			cnt = 0
		}
	}
	return false
}

// 3105
func longestMonotonicSubarray(nums []int) (ans int) {
	n := len(nums)
	ans = 1
	i := 0
	for i+1 < n {
		// 相等的情况排除
		if nums[i+1] == nums[i] {
			i++
			continue
		}
		start := i
		// 定下基调是单调递增还是单调递减
		inc := nums[i+1] > nums[i]
		i += 2
		for i < n && nums[i] != nums[i-1] && nums[i] > nums[i-1] == inc {
			i++
		}
		ans = max(ans, i-start)
		i--
	}
	return ans
}

// 2948
func lexicographicallySmallestArray(nums []int, limit int) []int {
	n := len(nums)
	ids := make([]int, n)
	for i := range ids {
		ids[i] = i
	}
	// ids的序号按照 nums中的数字从小到大排序
	slices.SortFunc(ids, func(i, j int) int {
		return nums[i] - nums[j]
	})
	i := 0
	ans := make([]int, n)
	for i < n {
		start := i
		i++
		for i < n && nums[ids[i]]-nums[ids[i-1]] < limit {
			i++
		}
		subIds := slices.Clone(ids[start:i])
		slices.Sort(subIds)
		for j, idx := range subIds {
			ans[idx] = nums[ids[start+j]]
		}
	}
	return ans
}

// 2222
func numberOfWays(s string) (ans int64) {
	totalCnt0 := strings.Count(s, "0")
	// 左边0的个数
	cnt0 := 0
	for i, c := range s {
		if c == '1' {
			// 找的是010
			ans += int64(cnt0) * (int64(totalCnt0 - cnt0))
		} else {
			// 找的是101
			cnt1 := i - cnt0 // 一共左边有i+1个元素  当前这个元素除去之外
			ans += int64(cnt1) * int64((len(s) - totalCnt0 - cnt1))
			cnt0++
		}
	}
	return ans
}

// 2012
func sumOfBeauties(nums []int) (ans int) {
	n := len(nums)
	minSuffix := make([]int, n)
	minSuffix[n-1] = nums[n-1]
	for i := n - 2; i >= 0; i-- {
		minSuffix[i] = min(nums[i], minSuffix[i+1])
	}
	preMax := nums[0]
	for i := 1; i < n-1; i++ {
		x := nums[i]
		if x > preMax && x < minSuffix[i+1] {
			ans += 2
		} else if x > nums[i-1] && x < nums[i+1] {
			ans++
		}
		preMax = max(preMax, x)
	}
	return
}

// 2998
func minimumOperationsToMakeEqual(x int, y int) int {
	memo := map[int]int{}
	var dfs func(int) int
	dfs = func(x int) int {
		if x <= y {
			return y - x
		}
		if v, ok := memo[x]; ok {
			return v
		}
		res := min(
			x-y,
			dfs(x/11)+x%11+1,
			dfs(x/11+1)+11-x%11+1,
			dfs(x/5)+x%5+1,
			dfs(x/5+1)+5-x%5+1,
		)
		memo[x] = res
		return res
	}
	return dfs(x)
}

// 2106
func maxTotalFruits(fruits [][]int, startPos int, k int) int {
	n := len(fruits)
	cnt := 0
	ans := 0
	// 双指针，left 为窗口左端点，right 为窗口右端点
	left := 0
	for right := 0; right < n; right++ {
		posRight := fruits[right][0]
		// 如果右端点距离 startPos 超过 k，停止遍历
		if posRight-startPos > k {
			break
		}
		// 累加当前右端点的水果数量
		cnt += fruits[right][1]
		// 不断右移窗口左端点，直至窗口合法
		for left <= right && (posRight-fruits[left][0])+min(abs(posRight-startPos), abs(fruits[left][0]-startPos)) > k {
			if fruits[left][0] < startPos {
				cnt -= fruits[left][1]
			}
			left++
		}
		// 记录本次局部最优解
		ans = max(ans, cnt)
	}
	return ans
}

// 3446
func sortMatrix(grid [][]int) [][]int {
	n := len(grid)
	m := len(grid[0])
	// k=i-j+n (0-2+3=1)
	for k := 1; k < m+n; k++ {
		minJ := max(0, n-k)
		maxJ := min(n-1, m-1+n-k)
		a := []int{}
		for j := minJ; j <= maxJ; j++ {
			a = append(a, grid[k+j-n][j])
		}
		fmt.Println(minJ)
		if minJ > 0 {
			// 右上角三角形
			slices.Sort(a)
		} else {
			// 从大到小
			slices.SortFunc(a, func(a, b int) int { return b - a })
		}
		for j := minJ; j <= maxJ; j++ {
			grid[k+j-n][j] = a[j-minJ]
		}
	}
	return grid
}

// 1329
func diagonalSort(grid [][]int) [][]int {
	m, n := len(grid), len(grid[0])
	// 第一排在右上，最后一排在左下
	// 每排从左上到右下
	// 令 k=i-j+n，那么右上角 k=1，左下角 k=m+n-1
	for k := 1; k < m+n; k++ {
		// 核心：计算 j 的最小值和最大值
		minJ := max(n-k, 0)       // i=0 的时候，j=n-k，但不能是负数
		maxJ := min(m+n-1-k, n-1) // i=m-1 的时候，j=m+n-1-k，但不能超过 n-1
		a := []int{}
		for j := minJ; j <= maxJ; j++ {
			a = append(a, grid[k+j-n][j]) // 根据 k 的定义得 i=k+j-n
		}
		// if minJ > 0 { // 右上角三角形
		slices.Sort(a)
		// } else { // 左下角三角形（包括中间对角线）
		// 	slices.SortFunc(a, func(a, b int) int { return b - a })
		// }
		for j := minJ; j <= maxJ; j++ {
			grid[k+j-n][j] = a[j-minJ]
		}
	}
	return grid
}
