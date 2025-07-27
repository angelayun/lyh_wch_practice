package a07111

import (
	"testing"
)

func Test_popcountDepth(t *testing.T) {
	type args struct {
		n int64
		k int
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
				n: 4,
				k: 1,
			},
			want: 2,
		},
		{
			name: "222",
			args: args{
				n: 7,
				k: 2,
			},
			want: 3,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := popcountDepth(tt.args.n, tt.args.k); got != tt.want {
				t.Errorf("popcountDepth() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_findMaxPathScore(t *testing.T) {
	type args struct {
		edges  [][]int
		online []bool
		k      int64
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
				edges: [][]int{
					{0, 1, 5},
					{1, 3, 10},
					{0, 2, 3},
					{2, 3, 4},
				},
				online: []bool{true, true, true, true},
				k:      10,
			},
			wantAns: 3,
		},
		/* {
			name: "222",
			args: args{
				edges: [][]int{
					{0, 1, 7},
					{1, 4, 5},
					{0, 2, 6},
					{2, 3, 6},
					{3, 4, 2},
					{2, 4, 6},
				},
				online: []bool{true, true, true, false, true},
				k:      12,
			},
			wantAns: 6,
		}, */
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := findMaxPathScore(tt.args.edges, tt.args.online, tt.args.k); gotAns != tt.wantAns {
				t.Errorf("findMaxPathScore() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_solve(t *testing.T) {
	type args struct {
		board [][]byte
	}
	tests := []struct {
		name string
		args args
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				board: [][]byte{
					{'O', 'O', 'O'},
					{'O', 'O', 'O'},
					{'O', 'O', 'O'},
				},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			solve(tt.args.board)
		})
	}
}
