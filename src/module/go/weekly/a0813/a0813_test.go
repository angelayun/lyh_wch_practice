package a0813

import (
	"reflect"
	"testing"
)

func Test_maxSubstrings(t *testing.T) {
	type args struct {
		word string
	}
	tests := []struct {
		name    string
		args    args
		wantAns int
	}{
		// TODO: Add test cases.
		/* {
			name: "111",
			args: args{
				word: "abcdeafdef",
			},
			wantAns: 2,
		}, */
		{
			name: "222",
			args: args{
				word: "abeaebddae",
			},
			wantAns: 2,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := maxSubstrings(tt.args.word); gotAns != tt.wantAns {
				t.Errorf("maxSubstrings() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_minMoves(t *testing.T) {
	type args struct {
		target     int
		maxDoubles int
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
				target:     1,
				maxDoubles: 1,
			},
			wantAns: 1,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := minMoves(tt.args.target, tt.args.maxDoubles); gotAns != tt.wantAns {
				t.Errorf("minMoves() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_longestAlternatingSubarray(t *testing.T) {
	type args struct {
		nums      []int
		threshold int
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
				nums:      []int{2, 3, 4, 5},
				threshold: 4,
			},
			wantAns: 3,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := longestAlternatingSubarray(tt.args.nums, tt.args.threshold); gotAns != tt.wantAns {
				t.Errorf("longestAlternatingSubarray() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_numMovesStones(t *testing.T) {
	type args struct {
		a int
		b int
		c int
	}
	tests := []struct {
		name string
		args args
		want []int
	}{
		// TODO: Add test cases.
		/* {
			name: "111",
			args: args{
				a: 1,
				b: 2,
				c: 5,
			},
			want: []int{1, 2},
		}, */
		{
			name: "222",
			args: args{
				a: 3,
				b: 5,
				c: 1,
			},
			want: []int{1, 2},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := numMovesStones(tt.args.a, tt.args.b, tt.args.c); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("numMovesStones() = %v, want %v", got, tt.want)
			}
		})
	}
}
