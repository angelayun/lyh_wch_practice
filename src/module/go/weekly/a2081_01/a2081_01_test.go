package a208101

import (
	"testing"
)

func Test_kMirror(t *testing.T) {
	type args struct {
		k int
		n int
	}
	tests := []struct {
		name string
		args args
		want int64
	}{
		// TODO: Add test cases.
		{name: "a",
			args: args{k: 2, n: 5}, want: 25},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := kMirror(tt.args.k, tt.args.n); got != tt.want {
				t.Errorf("kMirror() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_maxSum(t *testing.T) {
	type args struct {
		nums []int
	}
	tests := []struct {
		name    string
		args    args
		wantAns int
	}{
		// TODO: Add test cases.
		{name: "aa",
			args: args{nums: []int{1, 2, 3, 4, 5}}, wantAns: 15},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := maxSum(tt.args.nums); gotAns != tt.wantAns {
				t.Errorf("maxSum() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_findKthSmallest(t *testing.T) {
	type args struct {
		coins []int
		k     int
	}
	tests := []struct {
		name string
		args args
		want int64
	}{
		// TODO: Add test cases.
		{name: "示例1",
			args: args{coins: []int{3, 6, 9}, k: 3}, want: 9},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := findKthSmallest(tt.args.coins, tt.args.k); got != tt.want {
				t.Errorf("findKthSmallest() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_conveyorBelt(t *testing.T) {
	type args struct {
		matrix []string
		start  []int
		end    []int
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		// TODO: Add test cases.
		{name: "示例1",
			args: args{matrix: []string{">>v", "v^<", "<><"}, start: []int{0, 1}, end: []int{2, 0}},
			want: 1,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := conveyorBelt(tt.args.matrix, tt.args.start, tt.args.end); got != tt.want {
				t.Errorf("conveyorBelt() = %v, want %v", got, tt.want)
			}
		})
	}
}
