package a0621

import (
	"fmt"
	"math"
	"slices"
	"sort"
	"strings"
)

func maxArea(coords [][]int) int64 {
	n := len(coords)
	if n < 3 {
		return -1
	}
	fn := func(coords [][]int) int {
		// 先按照横坐标从小到大排序
		// 排序
		sort.Slice(coords, func(i, j int) bool {
			// 先按第一个维度升序排列
			if coords[i][0] != coords[j][0] {
				return coords[i][0] < coords[j][0]
			}
			// 第一个维度相等时，按第二个维度升序排列
			return coords[i][1] < coords[j][1]
		})
		maxX := coords[n-1][0]
		minX := coords[0][0]
		ans := 0
		prevIndex := 0
		diff := 0
		for i := 1; i < n; i++ {
			item := coords[i]
			x, y := item[0], item[1]
			if x == coords[prevIndex][0] {
				diff = y - coords[prevIndex][1]
				if maxX != x {
					ans = max(ans, diff*(maxX-x))
				}
				if minX != x {
					ans = max(ans, diff*(x-minX))
				}
			} else {
				prevIndex = i
			}
		}
		return ans
	}
	ans1 := fn(coords)
	for i, item := range coords {
		x, y := item[0], item[1]
		coords[i] = []int{y, x}
	}
	ans2 := fn(coords)
	if ans1 == 0 && ans2 == 0 {
		return -1
	}
	return int64(max(ans1, ans2))
}

const mx = 100_002

var isPrime [mx]bool

func init() {
	// 初始化所有数为质数（true）
	for i := 2; i < mx; i++ {
		isPrime[i] = true
	}

	// 筛法：标记合数为false
	for i := 2; i*i < mx; i++ {
		if isPrime[i] {
			for j := i * i; j < mx; j += i {
				isPrime[j] = false
			}
		}
	}
}
func primeSubarray(nums []int, k int) (ans int) {
	// 记录窗口中质数及其出现的次数
	cnt := map[int]int{}
	left := 0
	for right, x := range nums {
		if isPrime[x] {
			cnt[x]++
		}
		if len(cnt) >= 2 {
			mx, mn := math.MinInt, math.MaxInt
			for x := range cnt {
				mx = max(mx, x)
				mn = min(mn, x)
			}
			if mx-mn > k {
				y := nums[left]
				if isPrime[y] {
					// 移除左边元素
					cnt[y]--
					if cnt[y] == 0 {
						delete(cnt, y)
					}
				}
				left++
			}
			m := right - left + 1 - k
			ans += m * (m - 1) / 2
			fmt.Println(m)
			fmt.Println(m * (m - 1) / 2)

		}
	}
	return ans
}
func minSwaps(nums []int) (ans int) {
	n := len(nums)
	for i := 1; i < n; i++ {
		if nums[i]&1 == nums[i-1]&1 {
			ans++
			for j := i + 1; j < n; j++ {
				if nums[j]&1 != nums[i]&1 {
					for k := j; k > i; k-- {
						nums[k], nums[k-1] = nums[k-1], nums[k]
					}
					break
				}
			}
		}
	}
	return
}

/* func minSwaps(nums []int) int {

} */

func divideString(s string, k int, fill byte) []string {
	ans := []string{}
	for a := range slices.Chunk([]byte(s), k) {
		ans = append(ans, string(a))
	}
	if len(ans[len(ans)-1]) < k {
		tmp := []byte(ans[len(ans)-1])
		for i := len(tmp) - 1; i < k; i++ {
			tmp = append(tmp, fill)
		}
		ans[len(ans)-1] = string(tmp)
	}
	return ans
}
