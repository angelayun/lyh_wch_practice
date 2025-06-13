package a3362

import (
	"fmt"
	"testing"
)

func Test_maxRemoval(t *testing.T) {
	res := maxRemoval([]int{2, 0, 2}, [][]int{{0, 2}, {0, 2}, {1, 1}})
	fmt.Println(res)
	/* type args struct {
		nums    []int
		queries [][]int
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
			if got := maxRemoval(tt.args.nums, tt.args.queries); got != tt.want {
				t.Errorf("maxRemoval() = %v, want %v", got, tt.want)
			}
		})
	} */
}
