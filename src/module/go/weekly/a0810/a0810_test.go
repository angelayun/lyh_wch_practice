package a0810

import (
	"reflect"
	"testing"
)

func Test_reverseSubmatrix(t *testing.T) {
	type args struct {
		grid [][]int
		x    int
		y    int
		k    int
	}
	tests := []struct {
		name string
		args args
		want [][]int
	}{
		// TODO: Add test cases.
		/* {
			name: "111",
			args: args{
				grid: [][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}},
				x:    1,
				y:    0,
				k:    3,
			},
			want: [][]int{{1, 2, 3, 4}, {13, 14, 15, 8}, {9, 10, 11, 12}, {5, 6, 7, 16}},
		},
		{
			name: "222",
			args: args{
				grid: [][]int{{3, 4, 2, 3}, {2, 3, 4, 2}},
				x:    0,
				y:    2,
				k:    2,
			},
			want: [][]int{{3, 4, 4, 2}, {2, 3, 2, 3}},
		},
		{
			name: "333",
			args: args{
				grid: [][]int{{6, 16, 14}, {1, 2, 19}, {14, 17, 15}, {18, 7, 6}, {14, 12, 5}},
				x:    2,
				y:    1,
				k:    2,
			},
			want: [][]int{{6, 16, 14}, {1, 2, 19}, {14, 7, 6}, {18, 17, 15}, {14, 12, 5}},
		}, */
		{
			name: "444",
			args: args{
				grid: [][]int{{14, 3, 18, 16}, {2, 14, 11, 20}, {19, 19, 4, 15}, {11, 15, 18, 6}},
				x:    0,
				y:    0,
				k:    4,
			},
			want: [][]int{{6, 16, 14}, {1, 2, 19}, {14, 7, 6}, {18, 17, 15}, {14, 12, 5}},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := reverseSubmatrix(tt.args.grid, tt.args.x, tt.args.y, tt.args.k); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("reverseSubmatrix() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_maxTotal(t *testing.T) {
	type args struct {
		value []int
		limit []int
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
				value: []int{4, 1, 5, 2},
				limit: []int{3, 3, 2, 3},
			},
			want: 12,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := maxTotal(tt.args.value, tt.args.limit); got != tt.want {
				t.Errorf("maxTotal() = %v, want %v", got, tt.want)
			}
		})
	}
}
