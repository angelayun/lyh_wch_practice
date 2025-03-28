package grouppoint

import (
	"fmt"
	"testing"
)

func Test_longestContinuousSubstring(t *testing.T) {
	res := maxIncreasingSubarrays([]int{1, 2, 3, 4, 4, 4, 4, 5, 6, 7})
	// res := longestMonotonicSubarray([]int{1, 9, 7, 1})
	// res := resultsArray([]int{1, 2, 3, 4, 3, 2, 5}, 3)
	// res := resultsArray([]int{3, 2, 3, 2, 3, 2}, 2)
	// res := longestMountain([]int{2, 1, 4, 7, 3, 2, 5})
	// res := minCost("abaac", []int{1, 2, 3, 4, 5})
	// res := longestMountain([]int{875, 884, 239, 731, 723, 685})
	// res := longestContinuousSubstring("abcde")
	// res := maxTurbulenceSize([]int{9, 4, 2, 10, 7, 8, 8, 1, 9})
	// res := longestAlternatingSubarray([]int{3, 2, 5, 4}, 5)
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
