package monotonicstack

import (
	"fmt"
	"testing"
)

func Test_finalPrices(t *testing.T) {
	// res := finalPrices([]int{8, 4, 6, 2, 3})
	// res := nextGreaterElement([]int{2, 4}, []int{1, 2, 3, 4})
	// res := nextGreaterElements([]int{1, 2, 1})
	// res := mostCompetitive([]int{2, 4, 3, 3, 5, 4, 9, 6}, 4)
	res := mostCompetitive([]int{71, 18, 52, 29, 55, 73, 24, 42, 66, 8, 80, 2}, 3)
	fmt.Println(res)
	/* type args struct {
		prices []int
	}
	tests := []struct {
		name string
		args args
		want []int
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := finalPrices(tt.args.prices); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("finalPrices() = %v, want %v", got, tt.want)
			}
		})
	} */
}
