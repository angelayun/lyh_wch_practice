package practice

import (
	"fmt"
	"testing"
)

func Test_mctFromLeafValues(t *testing.T) {
	// res := mctFromLeafValues([]int{6, 2, 4})
	// res := sumSubarrayMins([]int{3, 1, 2, 4})
	res := numEquivDominoPairs([][]int{{1, 2}, {2, 1}, {3, 4}, {5, 6}})
	fmt.Println(res)
	/* type args struct {
		arr []int
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
			if gotAns := mctFromLeafValues(tt.args.arr); gotAns != tt.wantAns {
				t.Errorf("mctFromLeafValues() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	} */
}
