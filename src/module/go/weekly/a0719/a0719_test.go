package a0719

import (
	"testing"
)

func Test_splitArray(t *testing.T) {
	type args struct {
		nums []int
	}
	tests := []struct {
		name string
		args args
		want int64
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{nums: []int{2, 3, 4}},
			want: 1,
		},
		/* {
			name: "222",
			args: args{nums: []int{-1, 5, 7, 0}},
			want: 3,
		}, */
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := splitArray(tt.args.nums); got != tt.want {
				t.Errorf("splitArray() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_countIslands(t *testing.T) {
	type args struct {
		grid [][]int
		k    int
	}
	tests := []struct {
		name    string
		args    args
		wantAns int
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{grid: [][]int{
				{0, 2, 1, 0, 0},
				{0, 5, 0, 0, 5},
				{0, 0, 1, 0, 0},
				{0, 1, 4, 7, 0},
				{0, 2, 0, 0, 8},
			}, k: 5},
			wantAns: 2,
		},
		{
			name: "222",
			args: args{grid: [][]int{
				{3, 0, 3, 0},
				{0, 3, 0, 3},
				{3, 0, 3, 0},
			}, k: 3},
			wantAns: 6,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := countIslands(tt.args.grid, tt.args.k); gotAns != tt.wantAns {
				t.Errorf("countIslands() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_popcountDepth(t *testing.T) {
	type args struct {
		n int64
		k int
	}
	tests := []struct {
		name string
		args args
		want int64
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				n: 4,
				k: 1,
			},
			want: 2,
		},
		{
			name: "222",
			args: args{
				n: 7,
				k: 2,
			},
			want: 3,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := popcountDepth(tt.args.n, tt.args.k); got != tt.want {
				t.Errorf("popcountDepth() = %v, want %v", got, tt.want)
			}
		})
	}
}
