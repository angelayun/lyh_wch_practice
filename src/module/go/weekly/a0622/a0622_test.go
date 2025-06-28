package a0622

import (
	"reflect"
	"testing"
)

func Test_findMaximumScore(t *testing.T) {
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
			name: "示例1",
			args: args{nums: []int{1, 3, 1, 5}},
			want: 7,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := findMaximumScore(tt.args.nums); got != tt.want {
				t.Errorf("findMaximumScore() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_checkPrimeFrequency(t *testing.T) {
	type args struct {
		nums []int
	}
	tests := []struct {
		name string
		args args
		want bool
	}{
		// TODO: Add test cases.
		{
			name: "示例1",
			args: args{nums: []int{1, 2, 3, 4, 5, 4}},
			want: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := checkPrimeFrequency(tt.args.nums); got != tt.want {
				t.Errorf("checkPrimeFrequency() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_minIncrease(t *testing.T) {
	type args struct {
		n     int
		edges [][]int
		cost  []int
	}
	tests := []struct {
		name    string
		args    args
		wantAns int
	}{
		// TODO: Add test cases.
		{
			name: "示例1",
			args: args{
				n:     3,
				edges: [][]int{{0, 1}, {0, 2}},
				cost:  []int{2, 1, 3},
			},
			wantAns: 1,
		},
		{
			name: "示例2",
			args: args{
				n:     3,
				edges: [][]int{{0, 1}, {1, 2}},
				cost:  []int{5, 1, 4},
			},
			wantAns: 0,
		},
		{
			name: "示例3",
			args: args{
				n:     5,
				edges: [][]int{{0, 4}, {0, 1}, {1, 2}, {1, 3}},
				cost:  []int{3, 4, 1, 1, 7},
			},
			wantAns: 1,
		},
		{
			name: "示例4",
			args: args{
				n:     4,
				edges: [][]int{{0, 1}, {0, 2}, {2, 3}},
				cost:  []int{13, 11, 4, 14},
			},
			wantAns: 1,
		},
		{
			name: "示例5",
			args: args{
				n:     3,
				edges: [][]int{{0, 1}, {0, 2}},
				cost:  []int{2, 2, 3},
			},
			wantAns: 1,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := minIncrease(tt.args.n, tt.args.edges, tt.args.cost); gotAns != tt.wantAns {
				t.Errorf("minIncrease() = %v, want %v", gotAns, tt.wantAns)
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
		{
			name: "示例1",
			args: args{
				nums: []int{1, 2, 3},
				k:    1,
			},
			wantAns: 2,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := primeSubarray(tt.args.nums, tt.args.k); gotAns != tt.wantAns {
				t.Errorf("primeSubarray() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_findCoins(t *testing.T) {
	type args struct {
		numWays []int
	}
	tests := []struct {
		name    string
		args    args
		wantAns []int
	}{
		// TODO: Add test cases.
		{
			name:    "示例3",
			args:    args{numWays: []int{1, 2, 3, 4, 15}},
			wantAns: []int{},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := findCoins(tt.args.numWays); !reflect.DeepEqual(gotAns, tt.wantAns) {
				t.Errorf("findCoins() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}
