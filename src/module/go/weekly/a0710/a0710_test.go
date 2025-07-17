package a0710

import (
	"reflect"
	"testing"
)

func Test_findMaxLength(t *testing.T) {
	type args struct {
		nums []int
	}
	tests := []struct {
		name    string
		args    args
		wantAns int
	}{
		// TODO: Add test cases.
		{
			name:    "11",
			args:    args{nums: []int{0, 1}},
			wantAns: 2,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := findMaxLength(tt.args.nums); gotAns != tt.wantAns {
				t.Errorf("findMaxLength() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_findLongestSubarray(t *testing.T) {
	type args struct {
		array []string
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{array: []string{"A", "1"}},
			want: []string{"A", "1"},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := findLongestSubarray(tt.args.array); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("findLongestSubarray() = %v, want %v", got, tt.want)
			}
		})
	}
}
