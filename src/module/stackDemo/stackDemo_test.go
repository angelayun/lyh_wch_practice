package stackdemo

import (
	"fmt"
	"testing"
)

func Test_buildArray(t *testing.T) {
	// res := calculateScore("aczzx")
	// res := simplifyPath("/home/")
	// res := simplifyPath("/home//foo/")
	// res := simplifyPath("/home/user/Documents/../Pictures")
	// res := buildArray([]int{1, 3}, 3)
	// res := validateStackSequences([]int{1, 2, 3, 4, 5}, []int{4, 5, 3, 2, 1})
	// res := validateStackSequences([]int{2, 1, 0}, []int{1, 2, 0})
	res := clearStars("d*o*")
	fmt.Println(res)
	/* type args struct {
		target []int
		n      int
	}
	tests := []struct {
		name    string
		args    args
		wantAns []string
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := buildArray(tt.args.target, tt.args.n); !reflect.DeepEqual(gotAns, tt.wantAns) {
				t.Errorf("buildArray() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	} */
}
