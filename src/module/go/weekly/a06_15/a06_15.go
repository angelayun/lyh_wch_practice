package a0615

import (
	"math"
	"strings"
)

func generateTag(caption string) string {
	ans := []byte{'#'}
	for i, s := range strings.Fields(caption) {
		s := strings.ToLower(s)
		if i > 0 {
			s = strings.Title(s)
		}
		ans = append(ans, s...)
		if len(ans) > 100 {
			ans = ans[:100]
			break
		}
	}
	return string(ans)
}

func specialTriplets(nums []int) (ans int) {
	const mod = 1_000_000_007
	suffix := map[int]int{}
	for _, x := range nums {
		suffix[x]++
	}
	prefix := map[int]int{}
	for _, x := range nums {
		suffix[x]--
		if prefix[2*x] > 0 && suffix[2*x] > 0 {
			ans = (ans + (prefix[2*x]*suffix[2*x])%mod) % mod
		}
		prefix[x]++
	}
	return
}
func maximumProduct(nums []int, m int) int64 {
	ans := math.MinInt
	n := len(nums)
	mn, mx := math.MaxInt, math.MinInt
	for i := m - 1; i < n; i++ {
		y := nums[i-m+1]
		mx = max(mx, y)
		mn = min(mn, y)
		
		x := nums[i]
		ans = max(ans, x*mn, x*mx)
	}
	return int64(ans)
}
