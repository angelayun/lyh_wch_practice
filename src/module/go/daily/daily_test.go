package daily

import (
	"fmt"
	"testing"
)

func Test_breakPalindrome(t *testing.T) {
	// res := breakPalindrome("aba")
	// res := findKthNumber(13, 5)
	// res := minIncrementForUnique([]int{1, 2, 2})
	// res := maximumScore([]int{1, 3, 4, 5}, 4)
	// res := maximumScore([]int{9, 5, 9, 1, 6, 10, 3, 4, 5, 1}, 2)
	res := letterCombinations("")
	// res := minSwaps([][]int{{1, 0, 0}, {1, 1, 0}, {1, 1, 1}})
	// res := differenceOfDistinctValues1([][]int{{1, 2, 3}, {3, 1, 5}, {3, 2, 1}})
	fmt.Println(res)
	/* type args struct {
		palindrome string
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := breakPalindrome(tt.args.palindrome); got != tt.want {
				t.Errorf("breakPalindrome() = %v, want %v", got, tt.want)
			}
		})
	} */
}
