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
	// res := maximumLengthSubstring1("bcbbbcba")
	// res := minSwaps([]int{0, 1, 0, 1, 1, 0, 0})
	// res := minimumDifference([]int{90}, 1)
	// res := getSubarrayBeauty([]int{1, -1, -3, -2, 3}, 3, 2)
	// res:=longestSubarray([]int{1,1,0,1})
	// res := longestSubarray([]int{0, 1, 1, 1, 0, 1, 1, 0, 1})
	// res := equalSubstring("abcd", "bcdf", 3)
	// res := longestSemiRepetitiveSubstring("52233")
	res := maximumUniqueSubarray([]int{4, 2, 4, 5, 6})
	fmt.Println((res))
}
