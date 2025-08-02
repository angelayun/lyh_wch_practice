package a0727

import (
	"testing"
)

func Test_maximumMedianSum(t *testing.T) {
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
			args: args{nums: []int{2, 1, 3, 2, 1, 3}},
			want: 5,
		},
		{
			name: "222",
			args: args{nums: []int{1, 1, 10, 10, 10, 10}},
			want: 20,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := maximumMedianSum(tt.args.nums); got != tt.want {
				t.Errorf("maximumMedianSum() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_numOfSubsequences(t *testing.T) {
	type args struct {
		s string
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
				s: "LMCT",
			},
			want: 2,
		},
		{
			name: "222",
			args: args{
				s: "LCCT",
			},
			want: 4,
		},
		{
			name: "333",
			args: args{
				s: "L",
			},
			want: 0,
		},
		{
			name: "444",
			args: args{
				s: "LT",
			},
			want: 1,
		},
		{
			name: "555",
			args: args{
				s: "LCTKLCLT",
			},
			want: 7,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := numOfSubsequences(tt.args.s); got != tt.want {
				t.Errorf("numOfSubsequences() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_minJumps(t *testing.T) {
	type args struct {
		nums []int
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
				nums: []int{1,2,4,6},
			},
			want: 2,
		},
		{
			name: "222",
			args: args{
				nums: []int{2,3,4,7,9},
			},
			want: 2,
		},
		{
			name: "333",
			args: args{
				nums: []int{4,6,5,8},
			},
			want: 3,
		},
		{
			name: "444",
			args: args{
				nums: []int{5, 2, 20, 1, 15},
			},
			want: 1,
		},
		{
			name: "555",
			args: args{
				nums: []int{17,3,18,18,23},
			},
			want: 3,
		},
		{
			name: "666",
			args: args{
				nums: []int{13,238,169,205,241,183,226,233,231,7,213,78,103,219,154,20},
			},
			want: 5,
		},
		// []
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := minJumps(tt.args.nums); got != tt.want {
				t.Errorf("minJumps() = %v, want %v", got, tt.want)
			}
		})
	}
}
