package a0723

import (
	"testing"
)

func Test_maximumGain(t *testing.T) {
	type args struct {
		s string
		x int
		y int
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
				s: "cdbcbbaaabab",
				x: 4,
				y: 5,
			},
			wantAns: 19,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := maximumGain(tt.args.s, tt.args.x, tt.args.y); gotAns != tt.wantAns {
				t.Errorf("maximumGain() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_incremovableSubarrayCount(t *testing.T) {
	type args struct {
		a []int
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
				a: []int{6, 5, 7, 8},
			},
			want: 7,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := incremovableSubarrayCount(tt.args.a); got != tt.want {
				t.Errorf("incremovableSubarrayCount() = %v, want %v", got, tt.want)
			}
		})
	}
}
