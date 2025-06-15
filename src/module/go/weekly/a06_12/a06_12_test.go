package a0612

import (
	"fmt"
	"testing"
)

func Test_minPathSum(t *testing.T) {
	// res := generateTag("Leetcode daily streak achieved")
	// res := generateTag("can I Go There")
	// res := generateTag(" fPysaRtLQLiMKVvRhMkkDLNedQKffPnCjbITBTOVhoVjiKbfSawvpisDaNzXJctQkn")
	// res := generateTag("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
	// res := specialTriplets([]int{6, 3, 6})
	// res := specialTriplets([]int{0, 1, 0, 0})
	// res := specialTriplets([]int{8, 4, 2, 8, 4})
	// res := specialTriplets([]int{84, 2, 93, 1, 2, 2, 26})
	// res := specialTriplets([]int{28, 52, 14, 28, 34, 26, 14, 52})
	res := maximumProduct([]int{1, 3, -5, 5, 6, -4}, 3)
	fmt.Println(res)
	/* type args struct {
		grid [][]int
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
			if got := minPathSum(tt.args.grid); got != tt.want {
				t.Errorf("minPathSum() = %v, want %v", got, tt.want)
			}
		})
	} */
}
