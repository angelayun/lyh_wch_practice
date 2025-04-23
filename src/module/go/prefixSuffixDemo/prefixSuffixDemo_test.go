package prefixsuffixdemo

import (
	"fmt"
	"testing"
)

func Test_waysToSplitArray(t *testing.T) {
	// res := goodDaysToRobBank([]int{1, 1, 1, 1, 1}, 0)
	// res := maximumSum([]int{1, -2, 0, 3})
	res := maximumSum([]int{-1, -1, -1, -1})
	

	// res := countValidSelections([]int{1, 0, 2, 0, 3})
	// res := maxSumOfThreeSubarrays([]int{1, 2, 1, 2, 6, 7, 5, 1}, 2)
	// res := numSplits("aacaba")
	// res:=bestClosingTime("YYYY")
	// res := longestMountain([]int{2, 2, 2})
	// res := maxScore("011101")
	// res := waysToSplitArray([]int{10, 4, -8, 7})
	fmt.Println(res)
	/* type args struct {
		nums []int
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
			if gotAns := waysToSplitArray(tt.args.nums); gotAns != tt.wantAns {
				t.Errorf("waysToSplitArray() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	} */
}
