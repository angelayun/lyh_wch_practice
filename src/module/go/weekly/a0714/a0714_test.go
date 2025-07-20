package a0714

import (
	"reflect"
	"testing"
)

func Test_eraseOverlapIntervals(t *testing.T) {
	type args struct {
		intervals [][]int
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
			if got := eraseOverlapIntervals(tt.args.intervals); got != tt.want {
				t.Errorf("eraseOverlapIntervals() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_maxNumOfSubstrings(t *testing.T) {
	type args struct {
		s string
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				s: "adefaddaccc",
			},
			want: []string{"e", "f", "ccc"},
		},
		{
			name: "222",
			args: args{
				s: "abbaccd",
			},
			want: []string{"d", "bb", "cc"},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := maxNumOfSubstrings(tt.args.s); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("maxNumOfSubstrings() = %v, want %v", got, tt.want)
			}
		})
	}
}
