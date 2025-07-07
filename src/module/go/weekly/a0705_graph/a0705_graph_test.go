package a0705graph

import (
	"reflect"
	"testing"
)

func Test_countVowels(t *testing.T) {
	type args struct {
		word string
	}
	tests := []struct {
		name    string
		args    args
		wantAns int64
	}{
		// TODO: Add test cases.
		{
			name:    "111",
			args:    args{word: "aba"},
			wantAns: 6,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := countVowels(tt.args.word); gotAns != tt.wantAns {
				t.Errorf("countVowels() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_averageWaitingTime(t *testing.T) {
	type args struct {
		customers [][]int
	}
	tests := []struct {
		name string
		args args
		want float64
	}{
		// TODO: Add test cases.
		{
			name: "示例1",
			args: args{customers: [][]int{{1, 2}, {2, 5}, {4, 3}}},
			want: 5,
		},
		{
			name: "示例2",
			args: args{customers: [][]int{{5, 2}, {5, 4}, {10, 3}, {20, 1}}},
			want: 3.25,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := averageWaitingTime(tt.args.customers); got != tt.want {
				t.Errorf("averageWaitingTime() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_concatHex36(t *testing.T) {
	type args struct {
		n int
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		// TODO: Add test cases.
		{name: "111",
			args: args{n: 13},
			want: "A91P1",
		},
		{name: "222",
			args: args{n: 36},
			want: "5101000",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := concatHex36(tt.args.n); got != tt.want {
				t.Errorf("concatHex36() = %v, want %v", got, tt.want)
			}
		})
	}
}

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
		// TODO: Add test cases.
		/* {
			name: "111",
			args: args{
				m:        1,
				n:        2,
				waitCost: [][]int{{1, 2}},
			},
			want: 3,
		}, */
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

func Test_validateCoupons(t *testing.T) {
	type args struct {
		code         []string
		businessLine []string
		isActive     []bool
	}
	tests := []struct {
		name    string
		args    args
		wantAns []string
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				code:         []string{"SAVE20", "", "PHARMA5", "SAVE@20"},
				businessLine: []string{"restaurant", "grocery", "pharmacy", "restaurant"},
				isActive:     []bool{true, true, true, true},
			},
			wantAns: []string{"PHARMA5", "SAVE20"},
		},
		{
			name: "222",
			args: args{
				code:         []string{"GROCERY15", "ELECTRONICS_50", "DISCOUNT10"},
				businessLine: []string{"grocery", "electronics", "invalid"},
				isActive:     []bool{false, true, true},
			},
			wantAns: []string{"ELECTRONICS_50"},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := validateCoupons(tt.args.code, tt.args.businessLine, tt.args.isActive); !reflect.DeepEqual(gotAns, tt.wantAns) {
				t.Errorf("validateCoupons() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_processQueries(t *testing.T) {
	type args struct {
		c           int
		connections [][]int
		queries     [][]int
	}
	tests := []struct {
		name    string
		args    args
		wantAns []int
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				c:           5,
				connections: [][]int{{1, 2}, {2, 3}, {3, 4}, {4, 5}},
				queries:     [][]int{{1, 3}, {2, 1}, {1, 1}, {2, 2}, {1, 2}},
			},
			wantAns: []int{3, 2, 3},
		},
		{
			name: "222",
			args: args{
				c:           3,
				connections: [][]int{},
				queries:     [][]int{{1, 1}, {2, 1}, {1, 1}},
			},
			wantAns: []int{1, -1},
		},
		{
			name: "333",
			args: args{
				c: 4,
				connections: [][]int{
					{2, 3},
					{1, 3},
					{4, 1},
					{3, 4},
				},
				queries: [][]int{
					{1, 2}, {2, 4}, {2, 1}, {1, 4}, {2, 1},
					{1, 1}, {2, 2}, {1, 4}, {2, 1}, {2, 2},
					{2, 3}, {2, 4}, {2, 1}, {1, 1}, {2, 3},
					{2, 2}, {2, 3}, {1, 4}, {2, 4},
				},
			},
			wantAns: []int{2, 2, 2, 3, -1, -1},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := processQueries(tt.args.c, tt.args.connections, tt.args.queries); !reflect.DeepEqual(gotAns, tt.wantAns) {
				t.Errorf("processQueries() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_minTime(t *testing.T) {
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
		/* {
			name: "111",
			args: args{
				n:     2,
				edges: [][]int{{0, 1, 3}},
				k:     2,
			},
			want: 3,
		},
		{
			name: "222",
			args: args{
				n:     3,
				edges: [][]int{{0, 1, 2}, {1, 2, 4}},
				k:     3,
			},
			want: 4,
		},
		{
			name: "333",
			args: args{
				n:     3,
				edges: [][]int{{0, 2, 5}},
				k:     2,
			},
			want: 0,
		}, */
		{
			name: "44",
			args: args{
				n:     1,
				edges: [][]int{},
				k:     1,
			},
			want: 0,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := minTime(tt.args.n, tt.args.edges, tt.args.k); got != tt.want {
				t.Errorf("minTime() = %v, want %v", got, tt.want)
			}
		})
	}
}
