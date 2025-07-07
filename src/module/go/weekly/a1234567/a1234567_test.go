package a1234567

import "testing"

func Test_minCost(t *testing.T) {
	type args struct {
		m        int
		n        int
		waitCost [][]int
	}
	tests := []struct {
		name string
		args args
		want int64
	}{
		{
			name: "111",
			args: args{
				m:        1,
				n:        2,
				waitCost: [][]int{{1, 2}},
			},
			want: 3,
		},
		{
			name: "222",
			args: args{
				m:        2,
				n:        2,
				waitCost: [][]int{{3, 5}, {2, 4}},
			},
			want: 9,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := minCost(tt.args.m, tt.args.n, tt.args.waitCost); got != tt.want {
				t.Errorf("minCost() = %v, want %v", got, tt.want)
			}
		})
	}
}
