package grouppoint

import (
	"fmt"
	"testing"
)

func Test_longestContinuousSubstring(t *testing.T) {
	// res := longestContinuousSubstring("abcde")
	res := maxTurbulenceSize([]int{9, 4, 2, 10, 7, 8, 8, 1, 9})
	fmt.Println(res)
	/* type args struct {
		s string
	}
	tests := []struct {
		name    string
		args    args
		wantAns int
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := longestContinuousSubstring(tt.args.s); gotAns != tt.wantAns {
				t.Errorf("longestContinuousSubstring() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	} */
}
