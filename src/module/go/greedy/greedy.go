package greedy

// 1963
func minSwaps(s string) int {

	cnt := 0
	for _, ch := range s {
		if ch == '[' || cnt == 0 {
			cnt++
		} else {
			cnt--
		}
	}
	return cnt / 2
}
