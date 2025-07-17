package a0713

import (
	"testing"
)

/*
func Test_matchPlayersAndTrainers(t *testing.T) {
	type args struct {
		players  []int
		trainers []int
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{players: []int{4, 2}, trainers: []int{4, 4, 3}},
			want: 2,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := matchPlayersAndTrainers(tt.args.players, tt.args.trainers); got != tt.want {
				t.Errorf("matchPlayersAndTrainers() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_processStr(t *testing.T) {
	type args struct {
		s string
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		// TODO: Add test cases.
		{
			name: "11",
			args: args{s: "a#b%*"},
			want: "ba",
		},
		{
			name: "22",
			args: args{s: "z*#"},
			want: "",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := processStr(tt.args.s); got != tt.want {
				t.Errorf("processStr() = %v, want %v", got, tt.want)
			}
		})
	}
} */

func Test_minCost(t *testing.T) {
	type args struct {
		n     int
		edges [][]int
		k     int
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
				n: 5,
				edges: [][]int{
					{0, 1, 4},
					{1, 2, 3},
					{1, 3, 2},
					{3, 4, 6},
				},
				k: 2,
			},
			want: 4,
		},
		{
			name: "222",
			args: args{
				n: 4,
				edges: [][]int{
					{0, 1, 5},
					{1, 2, 5},
					{2, 3, 5},
				},
				k: 1,
			},
			want: 5,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := minCost(tt.args.n, tt.args.edges, tt.args.k); got != tt.want {
				t.Errorf("minCost() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_maxLen(t *testing.T) {
	type args struct {
		n     int
		edges [][]int
		label string
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
				n:     3,
				edges: [][]int{{0, 1}, {1, 2}},
				label: "aba",
			},
			want: 3,
		},
		{
			name: "222",
			args: args{
				n:     3,
				edges: [][]int{{0, 1}, {0, 2}},
				label: "abc",
			},
			want: 1,
		},
		{
			name: "333",
			args: args{
				n:     4,
				edges: [][]int{{0, 2}, {0, 3}, {3, 1}},
				label: "bbac",
			},
			want: 3,
		},
		{
			name: "333",
			args: args{
				n:     3,
				edges: [][]int{{2, 1}, {0, 1}, {2, 0}},
				label: "fjj",
			},
			want: 3,
		},
		{
			name: "444",
			args: args{
				n:     3,
				edges: [][]int{{0, 2}, {2, 1}},
				label: "mll",
			},
			want: 2,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := maxLen(tt.args.n, tt.args.edges, tt.args.label); got != tt.want {
				t.Errorf("maxLen() = %v, want %v", got, tt.want)
			}
		})
	}
}
