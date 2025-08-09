package a0804

import (
	"reflect"
	"testing"
)

func Test_sortedSquares(t *testing.T) {
	type args struct {
		nums []int
	}
	tests := []struct {
		name string
		args args
		want []int
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				nums: []int{-4, -5},
			},
			want: []int{16, 25},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := sortedSquares(tt.args.nums); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("sortedSquares() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_getStrongest(t *testing.T) {
	type args struct {
		arr []int
		k   int
	}
	tests := []struct {
		name string
		args args
		want []int
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				arr: []int{1, 2, 3, 4, 5},
				k:   2,
			},
			want: []int{5, 1},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := getStrongest(tt.args.arr, tt.args.k); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("getStrongest() = %v, want %v", got, tt.want)
			}
		})
	}
}
