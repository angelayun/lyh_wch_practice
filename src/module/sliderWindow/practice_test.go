package sliderwindow

import (
	"fmt"
	"testing"
)

func Test_maxVowels(t *testing.T) {
	/* res := maxVowels("abciiidef", 3)
	println(res) */
	/* res := findMaxAverage([]int{1, 12, -5, -6, 50, 3}, 4)
	println((res)) */
	// res := numOfSubarrays([]int{2, 2, 2, 2, 5, 5, 5, 8}, 3, 4)
	// res := getAverages([]int{7, 4, 3, 9, 1, 8, 5, 2, 6}, 3)
	// res := minimumRecolors("WBBWWBBWBW", 7)
	// res := minimumRecolors("WBWBBBW", 2)
	// res := maxSum([]int{2, 6, 7, 3, 1, 7}, 3, 4)
	// res := maxScore([]int{1, 2, 3, 4, 5, 6, 1}, 3)
	// res := decrypt([]int{5, 7, 1, 4}, 3)
	// res := decrypt([]int{2, 4, 9, 3}, -2)
	res := maximumLengthSubstring1("bcbbbcba")
	fmt.Println((res))
}
