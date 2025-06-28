package a0621

import (
	"testing"
)

func Test_maxArea(t *testing.T) {
	type args struct {
		coords [][]int
	}
	tests := []struct {
		name string
		args args
		want int64
	}{
		// TODO: Add test cases.
		{name: "示例1",
			args: args{coords: [][]int{{1, 1}, {1, 2}, {3, 2}, {3, 3}}},
			want: 2,
		},
		{name: "示例2",
			args: args{coords: [][]int{{1, 1}, {2, 2}, {3, 3}}},
			want: -1,
		},
		{name: "示例3",
			args: args{coords: [][]int{{1, 1}, {6, 10}, {6, 5}}},
			want: 25,
		},
		{name: "示例4",
			args: args{coords: [][]int{{1, 3}, {10, 6}, {9, 9}, {9, 10}}},
			want: 8,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := maxArea(tt.args.coords); got != tt.want {
				t.Errorf("maxArea() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_primeSubarray(t *testing.T) {
	type args struct {
		nums []int
		k    int
	}
	tests := []struct {
		name    string
		args    args
		wantAns int
	}{
		// TODO: Add test cases.
		{name: "示例1", args: args{nums: []int{1, 2, 3}, k: 1}, wantAns: 2},
		{name: "示例2", args: args{nums: []int{2, 3, 5, 7}, k: 3}, wantAns: 4},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := primeSubarray(tt.args.nums, tt.args.k); gotAns != tt.wantAns {
				t.Errorf("primeSubarray() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}
