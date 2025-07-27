package a0720

import (
	"testing"
)

func Test_checkDivisibility(t *testing.T) {
	type args struct {
		n int
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
				n: 99,
			},
			want: true,
		},
		{
			name: "222",
			args: args{
				n: 23,
			},
			want: false,
		}, */
		{
			name: "333",
			args: args{
				n: 8,
			},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := checkDivisibility(tt.args.n); got != tt.want {
				t.Errorf("checkDivisibility() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_countTrapezoids(t *testing.T) {
	type args struct {
		points [][]int
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{points: [][]int{
				{1, 0},
				{2, 0},
				{3, 0},
				{2, 2},
				{3, 2},
			}},
			want: 3,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := countTrapezoids(tt.args.points); got != tt.want {
				t.Errorf("countTrapezoids() = %v, want %v", got, tt.want)
			}
		})
	}
}
