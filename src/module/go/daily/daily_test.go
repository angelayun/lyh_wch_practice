package daily

import (
	"fmt"
	"testing"
)

func Test_breakPalindrome(t *testing.T) {
	// res := breakPalindrome("aba")
	res := differenceOfDistinctValues1([][]int{{1, 2, 3}, {3, 1, 5}, {3, 2, 1}})
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
