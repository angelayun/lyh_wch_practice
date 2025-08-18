package newtree

import (
	"testing"
)

func Test_canPartitionGrid(t *testing.T) {
	type args struct {
		grid [][]int
	}
	tests := []struct {
		name string
		args args
		want bool
	}{
		// TODO: Add test cases.
		/* {
			name: "111",
			args: args{
				grid: [][]int{{54756, 54756}},
			},
			want: true,
		}, */
		{
			name: "222",
			args: args{
				grid: [][]int{{1, 1, 1}},
			},
			want: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := canPartitionGrid(tt.args.grid); got != tt.want {
				t.Errorf("canPartitionGrid() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_maxScore(t *testing.T) {
	type args struct {
		n     int
		edges [][]int
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
				n:     4,
				edges: [][]int{{0, 1}, {1, 2}, {2, 3}},
			},
			want: 23,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := maxScore(tt.args.n, tt.args.edges); got != tt.want {
				t.Errorf("maxScore() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_minimumPossibleSum(t *testing.T) {
	type args struct {
		n      int
		target int
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				n:      2,
				target: 3,
			},
			want: 4,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := minimumPossibleSum(tt.args.n, tt.args.target); got != tt.want {
				t.Errorf("minimumPossibleSum() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_canMakeSubsequence(t *testing.T) {
	type args struct {
		str1 string
		str2 string
	}
	tests := []struct {
		name string
		args args
		want bool
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				str1: "dm",
				str2: "e",
			},
			want: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := canMakeSubsequence(tt.args.str1, tt.args.str2); got != tt.want {
				t.Errorf("canMakeSubsequence() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_partitionArray(t *testing.T) {
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
		{
			name: "111",
			args: args{
				nums: []int{3, 6, 1, 2, 5},
				k:    2,
			},
			wantAns: 2,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := partitionArray(tt.args.nums, tt.args.k); gotAns != tt.wantAns {
				t.Errorf("partitionArray() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}
