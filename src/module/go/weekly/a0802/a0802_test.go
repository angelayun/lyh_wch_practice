package a0802

import (
	"reflect"
	"testing"
)

func Test_earliestFinishTime(t *testing.T) {
	type args struct {
		landStartTime  []int
		landDuration   []int
		waterStartTime []int
		waterDuration  []int
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
				landStartTime:  []int{2, 8},
				landDuration:   []int{4, 1},
				waterStartTime: []int{6},
				waterDuration:  []int{3},
			},
			want: 9,
		},
		{
			name: "222",
			args: args{
				landStartTime:  []int{5},
				landDuration:   []int{3},
				waterStartTime: []int{1},
				waterDuration:  []int{10},
			},
			want: 14,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := earliestFinishTime(tt.args.landStartTime, tt.args.landDuration, tt.args.waterStartTime, tt.args.waterDuration); got != tt.want {
				t.Errorf("earliestFinishTime() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_minRemoval(t *testing.T) {
	type args struct {
		nums []int
		k    int
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
				nums: []int{2, 1, 5},
				k:    2,
			},
			want: 1,
		},
		{
			name: "222",
			args: args{
				nums: []int{1, 6, 2, 9},
				k:    3,
			},
			want: 2,
		},
		{
			name: "333",
			args: args{
				nums: []int{4, 6},
				k:    2,
			},
			want: 0,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := minRemoval(tt.args.nums, tt.args.k); got != tt.want {
				t.Errorf("minRemoval() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_subarrayMajority(t *testing.T) {
	type args struct {
		nums    []int
		queries [][]int
	}
	tests := []struct {
		name string
		args args
		want []int
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				nums:    []int{1, 1, 2, 2, 1, 1},
				queries: [][]int{{0, 5, 4}, {0, 3, 3}, {2, 3, 2}},
			},
			want: []int{1, -1, 2},
		},
		{
			name: "222",
			args: args{
				nums:    []int{3, 2, 3, 2, 3, 2, 3},
				queries: [][]int{{0, 6, 4}, {1, 5, 2}, {2, 4, 1}, {3, 3, 1}},
			},
			want: []int{3, 2, 3, 2},
		},
		{
			name: "333",
			args: args{
				nums: []int{4, 5},
				queries: [][]int{
					{1, 1, 1},
					{0, 0, 1},
					{1, 1, 1},
					{0, 0, 1},
					{0, 0, 1},
					{0, 1, 1},
					{0, 1, 1},
					{0, 1, 1},
					{1, 1, 1},
					{0, 1, 1},
					{0, 0, 1},
					{1, 1, 1},
					{1, 1, 1},
					{0, 0, 1},
					{1, 1, 1},
					{0, 1, 1},
				},
			},
			want: []int{5, 4, 5, 4, 4, 4, 4, 4, 5, 4, 4, 5, 5, 4, 5, 4},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := subarrayMajority(tt.args.nums, tt.args.queries); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("subarrayMajority() = %v, want %v", got, tt.want)
			}
		})
	}
}
