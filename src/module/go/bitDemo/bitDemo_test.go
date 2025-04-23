package bitdemo

import (
	"fmt"
	"testing"
)

func Test_binaryGap(t *testing.T) {
	/* res := insert([][]int{
		{1, 2},
		{3, 5},
		{6, 7},
		{8, 10},
		{12, 16},
	}, []int{4, 8}) */
	res := insert([][]int{{1, 5}}, []int{2, 7})
	// res := insert([][]int{{1, 3}, {6, 9}}, []int{2, 5})
	// res:=countLargestGroup(13)
	// res := carPooling([][]int{{2, 1, 5}, {3, 3, 7}}, 4)
	// res := binaryGap(22)
	// res := validStrings(3)
	// res := countPairs([]int{3, 1, 2, 2, 2, 1, 3}, 2)
	// res := makeTheIntegerZero(3, -2)
	// res := calculateScore([]string{"jump", "add", "add", "jump", "add", "jump"}, []int{2, 1, 3, 1, -2, -3})
	fmt.Println(res)
	/* type args struct {
		n int
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
			if gotAns := binaryGap(tt.args.n); gotAns != tt.wantAns {
				t.Errorf("binaryGap() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	} */
}
