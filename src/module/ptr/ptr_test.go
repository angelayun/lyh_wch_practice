package ptr

import (
	"fmt"
	"testing"
)

func Test_isPalindrome(t *testing.T) {
	res := isPalindrome("A man, a plan, a canal: Panama")
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
