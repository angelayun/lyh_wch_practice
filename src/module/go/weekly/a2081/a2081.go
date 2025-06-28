package a2081

const maxN = 30

var ans [10][]int

func isPalindromeK(x int, k int) bool {
	if x%k == 0 {
		return false
	}
	rev := 0
	for rev < x/k {
		rev = rev*k + x%k
		x /= k
	}
	return rev == k || rev == x/k
}
func init() {
	for k := 2; k < 10; k++ {
		ans[k] = make([]int, 0, maxN)
	}
	for base := 1; ; base *= 10 {
		for i := base; i < base*10; i++ {
			x := i
			for t := i / 10; t > 0; t /= 10 {
				x = x*10 + t%10
			}
			
		}
	}
}
func kMirror(k int, n int) int64 {

}
