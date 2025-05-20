package a20250510

import (
	"fmt"
	"testing"
)

func Test_maxNumberOfAlloys(t *testing.T) {
	res := findMedianSortedArrays([]int{1, 5, 7, 8, 9}, []int{2, 3, 4, 6, 10})
	// res := splitArray([]int{7, 2, 5, 10, 8}, 2)
	// res := maxNumberOfAlloys(3, 2, 15, [][]int{{1, 1, 1}, {1, 1, 10}}, []int{0, 0, 100}, []int{1, 2, 3})
	fmt.Println(res)
	/* type args struct {
		n           int
		k           int
		budget      int
		composition [][]int
		stock       []int
		cost        []int
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := maxNumberOfAlloys(tt.args.n, tt.args.k, tt.args.budget, tt.args.composition, tt.args.stock, tt.args.cost); got != tt.want {
				t.Errorf("maxNumberOfAlloys() = %v, want %v", got, tt.want)
			}
		})
	} */
}
