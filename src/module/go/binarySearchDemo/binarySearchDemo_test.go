package binarysearchdemo

import (
	"fmt"
	"testing"
)

func Test_maximumCandies(t *testing.T) {
	// res := maximumCandies([]int{4, 7, 5}, 4)
	// res := maximumCandies([]int{1}, 1)
	// res := minimizedMaximum(6, []int{11, 6})
	// res := minEatingSpeed([]int{3, 6, 7, 11}, 8)
	// res := findRadius([]int{1, 2, 3, 4}, []int{1, 4})
	// res := minDays([]int{7, 7, 7, 7, 12, 7, 7}, 2, 3)
	// res := minSpeedOnTime([]int{1, 3, 2}, 2.7)
	res := maxValue(4, 2, 6)
	// res := maximumRemovals("qlevcvgzfpryiqlwy", "qlecfqlw", []int{12, 5})
	// res := shipWithinDays([]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, 5)
	fmt.Println(res)
	/* type args struct {
		candies []int
		k       int64
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
			if got := maximumCandies(tt.args.candies, tt.args.k); got != tt.want {
				t.Errorf("maximumCandies() = %v, want %v", got, tt.want)
			}
		})
	} */
}
