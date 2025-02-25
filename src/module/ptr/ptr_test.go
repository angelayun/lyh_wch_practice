package ptr

import (
	"fmt"
	"testing"
)

func Test_isPalindrome(t *testing.T) {
	// res := findLengthOfLCIS([]int{1, 3, 5, 4, 7})
	res := longestAlternatingSubarray([]int{3, 2, 5, 4}, 5)
	// res := longestAlternatingSubarray([]int{2, 3, 4, 5}, 4)
	// res := summaryRanges([]int{0, 1, 2, 4, 5, 7})
	// res := camelMatch([]string{"FooBaB"}, "FB")
	// res := isPalindrome("A man, a plan, a canal: Panama")
	fmt.Println(res)
	/* type args struct {
		s string
	}
	tests := []struct {
		name string
		args args
		want bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := isPalindrome(tt.args.s); got != tt.want {
				t.Errorf("isPalindrome() = %v, want %v", got, tt.want)
			}
		})
	} */
}
