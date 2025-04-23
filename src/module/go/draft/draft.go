package draft

const mx = 100001

var div [mx][]int

func init() {
	for i := 1; i < mx; i++ {
		for j := i; j < mx; j += i {
			div[j] = append(div[j], i)
		}
	}
}
func gcd(a, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}

/* func countPairs(nums []int, k int) (ans int64) {
	cnt := map[int]int{}
	for _, x := range nums {
		k2 := k / gcd(k, x)
		ans += int64(cnt[k2])
		for _, y := range div[x] {
			cnt[y]++
		}
	}
	return
} */

/*
	 func countPairs(nums []int, k int) (ans int) {
		type pair struct{ v, d int }
		cnt := map[pair]int{}
		for j, x := range nums {
			if j > 0 && nums[0] == x {
				ans++
			}
			k2 := k / gcd(k, j)
			ans += cnt[pair{x, k2}]
			for _, y := range div[j] {
				cnt[pair{x, y}]++
			}
		}
		return
	}
*/
func countPairs(nums []int, k int) (ans int64) {
	div := []int{}
	for d := 1; d*d <= k; d++ {
		if k%d == 0 {
			div = append(div, d)
			if d*d < k {
				div = append(div, k/d)
			}
		}
	}
	cnt := map[int]int{}
	for _, x := range nums {
		k2 := k / gcd(k, x)
		ans += int64(cnt[k2])
		for _, d := range div {
			if d%x == 0 {
				cnt[d]++
			}
		}

	}
	return
}
